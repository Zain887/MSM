import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { School } from "src/schools/entities/school.entity";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
  imports: [TypeOrmModule.forFeature([Student, School])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}