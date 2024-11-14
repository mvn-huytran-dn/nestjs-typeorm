import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ResultResponse {
  @ApiProperty({})
  @Expose()
  result: boolean;

  constructor(partial: Partial<ResultResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EmptyResponse {
  constructor(partial: Partial<ResultResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class PaginationMetadataDto {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageSize: number;

  @Expose()
  @ApiProperty()
  total: number;

  constructor(partial: Partial<PaginationMetadataDto>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class PaginationResponse {
  @ApiProperty()
  @Expose()
  @Type(() => PaginationMetadataDto)
  metadata: PaginationMetadataDto;

  constructor(partial: Partial<PaginationResponse>) {
    Object.assign(this, partial);
  }
}
