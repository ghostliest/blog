import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';

type Sort = 'date' | 'popular' | 'views';
type OrderBy = 'asc' | 'desc';

const sortArr: Sort[] = ['date', 'popular', 'views'];
const orderByArr: OrderBy[] = ['asc', 'desc'];

export interface IGetAllPostQueryDto {
  page: number;
  limit: number;
  categoryId?: number | undefined;
  authorId?: number | undefined;
  tags?: number[];
  sort: Sort;
  orderBy: OrderBy;
}

export class GetAllPostQueryDto implements IGetAllPostQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @Transform(({ value }) => +value || undefined)
  categoryId?: number | undefined;

  @IsOptional()
  @Transform(({ value }) => +value || undefined)
  authorId?: number | undefined;

  @IsOptional()
  @Transform(({ value }) => value.split(',').map(Number))
  tags?: number[];

  @IsEnum(sortArr)
  sort: Sort;

  @IsEnum(orderByArr)
  orderBy: OrderBy;
}
