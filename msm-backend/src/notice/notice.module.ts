import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { School } from 'src/schools/entities/school.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, School, Teacher])],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
