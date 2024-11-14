import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './database.module-definition';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule extends ConfigurableModuleClass {}
