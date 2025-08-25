import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/schools/entities/school.entity';
import { Class } from './entities/class.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Class, Teacher])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule { }
