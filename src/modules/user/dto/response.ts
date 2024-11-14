import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PublicUserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  fullname: string;

  @Expose()
  @ApiProperty({
    required: false,
  })
  birthday: Date;
}

@Exclude()
export class GenerateAccessTokenResponse {
  @ApiProperty()
  @Expose()
  accessToken: string;

  constructor(partial: Partial<GenerateAccessTokenResponse>) {
    Object.assign(this, partial);
  }
}
