import { ITagRepository } from './tag.repository';
import { ICreateTagDto } from './dto/create-tag.dto';
import { ServiceException } from '../exceptions/service.exception';
import { ISearchTagQueryDto } from './dto/search-tag-query.dto';

interface ITagService {
  create(dto: ICreateTagDto): Promise<any>;
  getAll(): Promise<{ id: number; value: string }[]>;
  search(dto: ISearchTagQueryDto): Promise<{ id: number; value: string }[] | []>;
}

export class TagService implements ITagService {
  constructor(private readonly _repo: ITagRepository) {}

  async create(dto: ICreateTagDto) {
    const tag = await this._repo.check(dto.value);
    if (tag?.value) {
      throw new ServiceException('This tag already exists');
    } else {
      return await this._repo.create(dto);
    }
  }

  async getAll(): Promise<{ id: number; value: string }[]> {
    return await this._repo.getAll();
  }

  async search(dto: ISearchTagQueryDto): Promise<{ id: number; value: string }[] | []> {
    return await this._repo.search(dto);
  }
}
