import { ICheckFollowQueryDto } from './dto/checkFollowQuery.dto';
import { ICountFollowQueryDto } from './dto/countFollowQuery.dto';
import { ICreateFollowDto } from './dto/createFollow.dto';
import { IActivityDto, IFollowRepository, IActivityFollowResponse } from './types/repository.types';
import {
  ICheckResponse,
  ICountResponse,
  ICreateOrDeleteResponse,
  IFollowService,
} from './types/service.types';

export class FollowService implements IFollowService {
  constructor(private readonly _repo: IFollowRepository) {}

  async createOrDelete(dto: ICreateFollowDto): Promise<ICreateOrDeleteResponse> {
    const follow = await this._repo.get(dto);

    if (follow?.id) {
      const isDeleted = await this._repo.delete(follow.id);
      if (isDeleted) return { result: 'destroy' };
    } else {
      const isCreated = await this._repo.create(dto);
      if (isCreated) return { result: 'create' };
    }
  }

  async check(dto: ICheckFollowQueryDto): Promise<ICheckResponse> {
    const follow = await this._repo.get(dto);
    return { follow: !!follow?.id };
  }

  async count(dto: ICountFollowQueryDto): Promise<ICountResponse> {
    const followers = await this._repo.followers(dto.authorId);
    const followed = await this._repo.followed(dto.authorId);
    return { followers, followed };
  }

  async getLastActivity(dto: IActivityDto): Promise<IActivityFollowResponse[]> {
    return await this._repo.getLastActivity(dto);
  }
}
