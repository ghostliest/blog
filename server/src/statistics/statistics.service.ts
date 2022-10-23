import { IGetStatisticsQueryDto } from './dto/getStatisticsQuery.dto';
import { IGetAuthorStatisticsQueryDto } from './dto/getAuthorStatisticsQuery.dto';
import { IStatisticsService } from './types/service.types';
import {
  IAuthorResponse,
  IAuthorsTopResponse,
  IStatisticsRepository,
} from './types/repository.types';

export class StatisticsService implements IStatisticsService {
  constructor(private readonly _repo: IStatisticsRepository) {}

  async authorsTop(dto: IGetStatisticsQueryDto): Promise<IAuthorsTopResponse[]> {
    return await this._repo.authorsTop(dto);
  }

  async author(dto: IGetAuthorStatisticsQueryDto): Promise<IAuthorResponse> {
    return await this._repo.author(dto);
  }
}
