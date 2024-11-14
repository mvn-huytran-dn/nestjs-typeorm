import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { PublicUserDto } from 'src/modules/user/dto/response';

@Exclude()
export class UserRegisterResponse {
  @Expose()
  @ApiProperty()
  @Type(() => PublicUserDto)
  user: PublicUserDto;

  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;

  constructor(partial: Partial<UserRegisterResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UserLoginResponse extends UserRegisterResponse {
  constructor(partial: Partial<UserLoginResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}

@Exclude()
export class UserAuthorizeResponse {
  @Expose()
  @ApiProperty()
  @Type(() => PublicUserDto)
  user: PublicUserDto;

  constructor(partial: Partial<UserAuthorizeResponse>) {
    Object.assign(this, partial);
  }
}
