import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultService } from './exam-result.service';
import { ExamResultController } from './exam-result.controller';
import { ExamResult } from './entities/exam-result.entity';
import { School } from '../schools/entities/school.entity';
import { Exam } from '../exam/entities/exam.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult, School, Exam, Student])],
  providers: [ExamResultService],
  controllers: [ExamResultController],
})
export class ExamResultModule {}
