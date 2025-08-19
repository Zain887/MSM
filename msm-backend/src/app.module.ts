import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperAdminModule } from './superadmin/superadmin.module';
import { SchoolModule } from './schools/schools.module';
import { StudentModule } from './student/student.module';
import { ParentModule } from './parent/parent.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';

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
    SuperAdminModule,
    SchoolModule,
    StudentModule,
    ParentModule,
    ClassModule,
    TeacherModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
