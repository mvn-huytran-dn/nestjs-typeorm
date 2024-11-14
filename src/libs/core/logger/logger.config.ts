import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

export class LoggerServiceOption {
  @IsString()
  @IsDefined()
  @Expose()
  consoleLevel: string;

  @IsBoolean()
  @IsDefined()
  @Expose()
  @Transform(({ value }: TransformFnParams) => value != 'false')
  consoleJSONFormat: boolean;
}
