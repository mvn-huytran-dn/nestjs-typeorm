import { Controller, Get, Ip } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckIpResponse } from './dto/response';
import { plainToInstance } from 'class-transformer';

@ApiTags('Health Check')
@Controller('health-check')
export class TestController {
  @Get('ip')
  @ApiResponse({
    type: HealthCheckIpResponse,
  })
  @ApiOperation({ summary: 'test' })
  test(@Ip() ip: string) {
    return plainToInstance(HealthCheckIpResponse, { ip });
  }
}
