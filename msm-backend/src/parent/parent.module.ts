import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './entities/parent.entity';
import { School } from 'src/schools/entities/school.entity';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, School, Student])],
  providers: [ParentService],
  controllers: [ParentController],
})
export class ParentModule {}
