import { IGetAuthorStatisticsQueryDto } from '../dto/getAuthorStatisticsQuery.dto';
import { IGetStatisticsQueryDto } from '../dto/getStatisticsQuery.dto';
import { IAuthorResponse, IAuthorsTopResponse } from './repository.types';

export interface IStatisticsService {
  authorsTop(dto: IGetStatisticsQueryDto): Promise<IAuthorsTopResponse[]>;
  author(dto: IGetAuthorStatisticsQueryDto): Promise<IAuthorResponse>;
}
