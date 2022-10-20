import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { PostStatus } from '@prisma/client';

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
  @IsEnum(PostStatus)
  status: PostStatus | undefined = undefined;
}
