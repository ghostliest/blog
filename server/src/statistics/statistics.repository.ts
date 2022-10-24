import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { IGetAuthorStatisticsQueryDto } from './dto/getAuthorStatisticsQuery.dto';
import { IGetStatisticsQueryDto } from './dto/getStatisticsQuery.dto';
import { authorQuery } from './queries/author.sql';
import { authorsTopQuery } from './queries/authorsTop.sql';
import {
  IAuthorResponse,
  IAuthorsTopResponse,
  IStatisticsRepository,
} from './types/repository.types';

export class StatisticsRepository implements IStatisticsRepository {
  constructor(private _db: PrismaService) {}

  async authorsTop({ sort }: IGetStatisticsQueryDto): Promise<IAuthorsTopResponse[]> {
    const query = authorsTopQuery(sort);
    return await this._db.$queryRaw<IAuthorsTopResponse[]>(Prisma.sql([query]));
  }

  async author({ authorId }: IGetAuthorStatisticsQueryDto): Promise<IAuthorResponse> {
    const query = authorQuery(authorId);
    const res = await this._db.$queryRaw<IAuthorResponse[]>(Prisma.sql([query]));
    return res[0];
  }
}
