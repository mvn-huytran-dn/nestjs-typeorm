import { IsDefined, Min } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @IsDefined()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @ApiProperty({
    example: 1,
    required: false,
    name: 'page',
    type: Number,
  })
  @Min(1)
  page = 1;

  @IsDefined()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @ApiProperty({
    example: 10,
    required: false,
    name: 'pageSize',
    type: Number,
  })
  @Min(1)
  pageSize = 10;
}
