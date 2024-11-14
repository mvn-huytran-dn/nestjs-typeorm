import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DatabaseConfig {
  @IsString()
  @IsDefined()
  @Expose()
  host: string;

  @IsNumber()
  @IsDefined()
  @Expose()
  port: number;

  @IsString()
  @IsDefined()
  @Expose()
  database: string;

  @IsString()
  @IsDefined()
  @Expose()
  type: string;

  @IsString()
  @IsDefined()
  @Expose()
  username: string;

  @IsString()
  @IsDefined()
  @Expose()
  password: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DatabaseConfig>({}).build();
