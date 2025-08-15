import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { SchoolService } from './schools.service';
import { SchoolController } from './schools.controller';
import { SuperAdmin } from 'src/superadmin/entities/superadmin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, SuperAdmin])],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
