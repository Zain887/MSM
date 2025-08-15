import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from './entities/superadmin.entity';
import { SuperAdminService } from './superadmin.service';
import { SuperAdminController } from './superadmin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SuperAdmin])],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
  exports: [SuperAdminService],
})
export class SuperAdminModule {}
