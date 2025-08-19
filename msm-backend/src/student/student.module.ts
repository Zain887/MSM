import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { School } from 'src/schools/entities/school.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { ClassEntity } from 'src/class/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, School, Parent, ClassEntity])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
