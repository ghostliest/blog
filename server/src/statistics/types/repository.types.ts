import { IGetAuthorStatisticsQueryDto } from '../dto/getAuthorStatisticsQuery.dto';
import { IGetStatisticsQueryDto } from '../dto/getStatisticsQuery.dto';

export interface IStatisticsRepository {
  authorsTop(dto: IGetStatisticsQueryDto): Promise<IAuthorsTopResponse[]>;
  author(dto: IGetAuthorStatisticsQueryDto): Promise<IAuthorResponse>;
}

export interface IAuthorsTopResponse {
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  views: number;
  posts: number;
  likes: number;
  favorites: number;
  followers: number;
}

export interface IAuthorResponse {
  posts: number;
  views: number;
  favorites: number;
  likes: number;
}
