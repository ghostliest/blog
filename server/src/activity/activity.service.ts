import { getTime } from 'src/common/utils/getTime';
import { IFollowService } from 'src/follow/types/service.types';
import { IReactionService } from 'src/reaction/reaction.service';
import { IGetLastActivityReactionDto } from './dto/GetLastActivityReactionQuery.dto';
import { IActivityService, IActivityResponse } from './types/service.types';

export class ActivityService implements IActivityService {
  constructor(
    private readonly _reactionService: IReactionService,
    private readonly _followService: IFollowService,
  ) {}

  async get(dto: IGetLastActivityReactionDto): Promise<IActivityResponse[]> {
    const { favorites, liked } = await this._reactionService.getLastActivity(dto);
    const follows = await this._followService.getLastActivity(dto);

    const activity = [
      ...liked.map((el) => ({ ...el, type: 'like' })),
      ...favorites.map((el) => ({ ...el, type: 'favorite' })),
      ...follows.map((el) => ({ ...el, type: 'follow' })),
    ] as unknown as IActivityResponse[];

    for (const obj of activity) {
      obj['data'] = {} as never;
      let key: keyof IActivityResponse;
      for (key in obj) {
        if (key === 'data' || key === 'createAt' || key === 'type') {
          continue;
        } else {
          obj['data'][key] = obj[key];
          delete obj[key];
        }
      }
    }

    return activity.sort((a, b) => getTime(b.createAt) - getTime(a.createAt));
  }
}
