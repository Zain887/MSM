import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { School } from '../schools/entities/school.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, School, ClassEntity, Teacher])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
