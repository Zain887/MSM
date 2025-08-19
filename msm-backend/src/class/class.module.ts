// class.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { School } from '../schools/entities/school.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity, School, Teacher])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
