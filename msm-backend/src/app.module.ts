import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './schools/schools.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { ParentsModule } from './parents/parents.module';
import { TimetablesModule } from './timetables/timetables.module';
import { ExamsModule } from './exams/exams.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FeeModule } from './fee/fee.module';
import { LibraryModule } from './library/library.module';
import { TransportRouteModule } from './transport_route/transport_route.module';
import { HostelsModule } from './hostels/hostels.module';
import { NoticeModule } from './notice/notice.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}', // ✅ Must include all entities
      ],
      synchronize: true, // ❗ false in production
      autoLoadEntities: true,
    }),
    SchoolModule,
    ClassesModule,
    SubjectsModule,
    TeachersModule,
    StudentsModule,
    ParentsModule,
    TimetablesModule,
    ExamsModule,
    ExamResultModule,
    AttendanceModule,
    FeeModule,
    LibraryModule,
    TransportRouteModule,
    HostelsModule,
    NoticeModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
