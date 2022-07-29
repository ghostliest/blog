import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

type Sort = 'date' | 'popular' | 'views';
type OrderBy = 'asc' | 'desc';

const sortArr: Sort[] = ['date', 'popular', 'views'];
const orderByArr: OrderBy[] = ['asc', 'desc'];

export interface IGetAllPostQueryDto {
  page: number;
  limit: number;
  categoryId?: number;
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
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value) || null)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  tags?: number[];

  @IsEnum(sortArr)
  sort: Sort;

  @IsEnum(orderByArr)
  orderBy: OrderBy;
}
