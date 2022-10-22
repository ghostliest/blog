import { Follower } from '@prisma/client';
import { ICreateFollowDto } from '../dto/createFollow.dto';
import { ICheckFollowQueryDto } from '../dto/checkFollowQuery.dto';

export interface IFollowRepository {
  create(dto: ICreateFollowDto): Promise<boolean>;
  get(dto: ICheckFollowQueryDto): Promise<TGetResponse>;
  delete(id: number): Promise<boolean>;
  followers(userId: number): Promise<number>;
  followed(userId: number): Promise<number>;
  getLastActivity(dto: IActivityDto): Promise<IActivityFollowResponse[]>;
}

export type TGetResponse = Follower;

export interface IActivityFollowResponse {
  createAt: Date;
  follower: {
    id: number;
    firstname: string;
    lastname: string;
  };
  followed: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export type TActivityFollow = Omit<IActivityFollowResponse, 'createAt'>;

export interface IActivityDto {
  page: number;
  limit: number;
}
