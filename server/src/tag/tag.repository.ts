import { Tag } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ICreateTagDto } from './dto/create-tag.dto';

export interface ITagRepository {
  create(dto: ICreateTagDto): Promise<Tag>;
  check(value: string): Promise<Tag | null>;
  getAll(): Promise<{ id: number; value: string }[]>;
  update(): Promise<any>;
  delete(): Promise<any>;
}

export class TagRepository implements ITagRepository {
  constructor(private _db: PrismaService) {}

  async create(dto: ICreateTagDto): Promise<Tag> {
    return await this._db.tag.create({
      data: { ...dto },
    });
  }

  async check(value: string): Promise<Tag | null> {
    return await this._db.tag.findUnique({
      where: { value },
    });
  }

  async getAll(): Promise<{ id: number; value: string }[]> {
    return await this._db.tag.findMany({ select: { id: true, value: true } });
  }

  async update(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async delete(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
