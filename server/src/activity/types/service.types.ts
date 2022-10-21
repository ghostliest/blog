import { IGetLastActivityReactionDto } from '../dto/GetLastActivityReactionQuery.dto';
import { TActivityReaction } from 'src/reaction/types/activity.interface';
import { TActivityFollow as IActivityFollow } from 'src/follow/types/repository.types';

export interface IActivityService {
  get(dto: IGetLastActivityReactionDto): Promise<IActivityResponse[]>;
}

export interface IActivityResponse {
  type: 'like' | 'favorite' | 'follow';
  createAt: Date;
  data: TActivityReaction | IActivityFollow;
}
