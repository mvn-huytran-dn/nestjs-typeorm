import { Exclude, Expose, Type } from 'class-transformer';
import { readAndValidateEnv } from '@app/core/config/config.loader';
import { LoggerServiceOption } from '@app/core/logger/logger.config';
import { ValidateNested, IsDefined, IsInt, IsString } from 'class-validator';
import { DatabaseConfig } from '../database/database.module-definition';

export class JwtConfig {
  @IsString()
  @IsDefined()
  @Expose()
  userSecretKey: string;

  @IsString()
  @IsDefined()
  @Expose()
  userExpiresIn: string;

  @IsString()
  @IsDefined()
  @Expose()
  adminSecretKey: string;

  @IsString()
  @IsDefined()
  @Expose()
  adminExpiresIn: string;
}

export class ServerOption {
  @IsInt()
  @IsDefined()
  @Expose()
  httpPort: number;

  @IsString()
  @IsDefined()
  @Expose()
  swaggerPath: string;
}

@Exclude()
export class AppConfig {
  @Expose()
  @ValidateNested()
  @Type(() => ServerOption)
  @IsDefined()
  server: ServerOption;

  @Expose()
  @ValidateNested()
  @Type(() => LoggerServiceOption)
  @IsDefined()
  log: LoggerServiceOption;

  @Expose()
  @ValidateNested()
  @Type(() => DatabaseConfig)
  @IsDefined()
  database: DatabaseConfig;

  @Expose()
  @ValidateNested()
  @Type(() => JwtConfig)
  @IsDefined()
  jwt: JwtConfig;

  private static storedConfig: AppConfig;

  static load(): AppConfig {
    if (AppConfig.storedConfig) return AppConfig.storedConfig;
    let configFile = ['config.yaml'];
    if (process.env.CONFIG_FILE) {
      configFile = [process.env.CONFIG_FILE];
    }

    AppConfig.storedConfig = readAndValidateEnv(AppConfig, ...configFile);
    return AppConfig.storedConfig;
  }
}
