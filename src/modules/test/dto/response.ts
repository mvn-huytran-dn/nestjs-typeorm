import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class HealthCheckIpResponse {
  @Expose()
  @ApiProperty()
  ip: string;

  constructor(partial: Partial<HealthCheckIpResponse>) {
    Object.assign(this, partial);
  }
}
