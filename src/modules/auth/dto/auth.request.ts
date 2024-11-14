import { TransformPhoneNumber } from '@app/gateway/transformers';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsDefined,
  IsDate,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class UserLoginRequest {
  @IsString()
  @IsDefined()
  @Expose()
  @TransformPhoneNumber()
  @ApiProperty({
    type: String,
    example: '0812345678',
  })
  phone: string;

  @IsString()
  @IsDefined()
  @Expose()
  @ApiProperty({
    type: String,
    example: 'password',
  })
  password: string;
}

export class UserRegisterRequest extends UserLoginRequest {
  @IsString()
  @IsDefined()
  @Expose()
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'email@gmail.com',
  })
  email: string;

  @IsString()
  @IsDefined()
  @Expose()
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  fullname: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '1999-01-01',
  })
  @Expose()
  birthday: Date;
}
