import { IAddReactionDto } from '../dto/add-reaction.dto';
import { IGetReactionDto } from '../dto/get-reaction.dto';
import { IActivityDto, IActivityResponse } from './repository.types';

export interface IReactionService {
  addOrDelete(dto: IAddReactionDto): Promise<TReactionAddResponse>;
  get(dto: IGetReactionDto): Promise<IGetResponse>;
  getLastActivity(dto: IActivityDto): Promise<IActivityResponse>;
}

export type TCategory = 'readingList' | 'like';

export type TReactionAddResponse = {
  category: TCategory;
  result: 'create' | 'destroy';
};

export interface IGetResponse {
  readingList: {
    count: number;
    thisUser: boolean;
  };
  like: {
    count: number;
    thisUser: boolean;
  };
}
