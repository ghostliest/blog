import { ICategoryRepository } from './category.repository';
import { ICreateCategoryDto } from './dto/create-category.dto';
import { ServiceException } from '../exceptions/service.exception';

interface ICategoryService {
  create(dto: ICreateCategoryDto): Promise<any>;
  getAll(): Promise<{ id: number; value: string }[]>;
}

export class CategoryService implements ICategoryService {
  constructor(private readonly _repo: ICategoryRepository) {}

  async create(dto: ICreateCategoryDto) {
    const category = await this._repo.check(dto.value);
    if (category?.value) {
      throw new ServiceException('This category already exists');
    } else {
      return await this._repo.create(dto);
    }
  }

  async getAll(): Promise<{ id: number; value: string }[]> {
    return await this._repo.getAll();
  }
}
