import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { School } from 'src/schools/entities/school.entity';
import { Parent } from 'src/parents/entities/parent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hostel } from 'src/hostels/entities/hostel.entity';
import { TransportRoute } from 'src/transport_route/entities/transport_route.entity';
import { Class } from 'src/classes/entities/class.entity';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School,Student, Parent, Hostel, TransportRoute, Class])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }
