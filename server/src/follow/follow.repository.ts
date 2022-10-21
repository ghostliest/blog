import { PrismaService } from 'src/database/prisma.service';
import { ICheckFollowQueryDto } from './dto/checkFollowQuery.dto';
import { ICreateFollowDto } from './dto/createFollow.dto';
import {
  IActivityDto,
  IFollowRepository,
  TActivityResponse,
  TGetResponse,
} from './types/repository.types';

export class FollowRepository implements IFollowRepository {
  constructor(private _db: PrismaService) {}

  async create({ userId, followedId }: ICreateFollowDto): Promise<boolean> {
    const follow = await this._db.follower.create({
      data: {
        follower: { connect: { id: userId } },
        followed: { connect: { id: followedId } },
      },
    });
    return !!follow?.id;
  }

  async get({ userId, followedId }: ICheckFollowQueryDto): Promise<TGetResponse> {
    return await this._db.follower.findFirst({
      where: { followedId, followerId: userId },
    });
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this._db.follower.delete({
      where: { id },
    });
    return !!deleted?.id;
  }

  async followers(userId: number): Promise<number> {
    const follower = await this._db.follower.count({
      where: { followedId: userId },
      select: { followedId: true },
    });
    return follower.followedId;
  }

  async followed(userId: number): Promise<number> {
    const follower = await this._db.follower.count({
      where: { followerId: userId },
      select: { followerId: true },
    });
    return follower.followerId;
  }

  async getLastActivity({ page, limit }: IActivityDto): Promise<TActivityResponse> {
    return await this._db.follower.findMany({
      skip: page * limit - limit,
      take: limit,
      select: {
        createAt: true,
        follower: { select: { id: true, firstname: true, lastname: true } },
        followed: { select: { id: true, firstname: true, lastname: true } },
      },
      orderBy: { createAt: 'desc' },
    });
  }
}
