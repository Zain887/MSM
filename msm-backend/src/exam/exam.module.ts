import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam } from './entities/exam.entity';
import { School } from '../schools/entities/school.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { Subject } from '../subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, School, ClassEntity, Subject])],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
