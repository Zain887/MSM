import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { School } from 'src/schools/entities/school.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Report, School])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
