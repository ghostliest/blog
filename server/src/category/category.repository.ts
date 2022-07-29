import { Category } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ICreateCategoryDto } from './dto/create-category.dto';

export interface ICategoryRepository {
  create(dto: ICreateCategoryDto): Promise<Category>;
  check(value: string): Promise<Category | null>;
  getAll(): Promise<{ id: number; value: string }[]>;
  update(): Promise<any>;
  delete(): Promise<any>;
}

export class CategoryRepository implements ICategoryRepository {
  constructor(private _db: PrismaService) {}

  async create(dto: ICreateCategoryDto): Promise<Category> {
    return await this._db.category.create({
      data: { ...dto },
    });
  }

  async check(value: string): Promise<Category | null> {
    return await this._db.category.findUnique({
      where: { value },
    });
  }

  async getAll(): Promise<{ id: number; value: string }[]> {
    return await this._db.category.findMany({ select: { id: true, value: true } });
  }

  update(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  delete(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
