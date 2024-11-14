import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthAdminController } from './auth.admin.controller';
import { AuthService } from './auth.service';
import { AuthAdminService } from './auth.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { AdminEntity } from '../database/entities/admin.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AdminEntity]), UserModule],
  controllers: [AuthController, AuthAdminController],
  providers: [AuthService, AuthAdminService],
  exports: [AuthService, AuthAdminService],
})
export class AuthModule {}
