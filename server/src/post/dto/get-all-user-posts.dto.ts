import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

type PostStatus = 'DRAFT' | 'ACTIVE' | 'BLOCKED';
const statusArr: PostStatus[] = ['DRAFT', 'ACTIVE', 'BLOCKED'];

export interface IGetAllUserPostsDto extends IGetAllUserPostsQueryDto {
  userId: number;
}

export interface IGetAllUserPostsQueryDto {
  page: number;
  limit: number;
  status: PostStatus;
}

export class GetAllUserPostsQueryDto implements IGetAllUserPostsQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsEnum(statusArr)
  status: PostStatus | undefined = undefined;
}
