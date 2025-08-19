import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { Fee } from './entities/fee.entity';
import { School } from '../schools/entities/school.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, School, Student])],
  providers: [FeeService],
  controllers: [FeeController],
})
export class FeeModule {}
