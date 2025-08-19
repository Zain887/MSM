// src/school-settings/school-settings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolSetting } from './entities/school-setting.entity';
import { SchoolSettingsService } from './school-settings.service';
import { SchoolSettingsController } from './school-settings.controller';
import { School } from 'src/schools/entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolSetting, School])],
  providers: [SchoolSettingsService],
  controllers: [SchoolSettingsController],
  exports: [SchoolSettingsService],
})
export class SchoolSettingsModule {}
