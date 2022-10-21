import { ICheckFollowQueryDto } from '../dto/checkFollowQuery.dto';
import { ICountFollowQueryDto } from '../dto/countFollowQuery.dto';
import { ICreateFollowDto } from '../dto/createFollow.dto';
import { IActivityDto, TActivityResponse } from './repository.types';

export interface IFollowService {
  createOrDelete(dto: ICreateFollowDto): Promise<ICreateOrDeleteResponse>;
  check(dto: ICheckFollowQueryDto): Promise<ICheckResponse>;
  count(dto: ICountFollowQueryDto): Promise<ICountResponse>;
  getLastActivity(dto: IActivityDto): Promise<TActivityResponse>;
}

export interface ICreateOrDeleteResponse {
  result: 'create' | 'destroy';
}

export interface ICheckResponse {
  follow: boolean;
}

export interface ICountResponse {
  followers: number;
  followed: number;
}
