import { IsUUID } from "class-validator";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Class } from "src/classes/entities/class.entity";
import { Event } from "src/events/entities/event.entity";
import { ExamResult } from "src/exam-result/entities/exam-result.entity";
import { Exam } from "src/exams/entities/exam.entity";
import { Fee } from "src/fee/entities/fee.entity";
import { Hostel } from "src/hostels/entities/hostel.entity";
import { LibraryBook } from "src/library/entities/library.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { Parent } from "src/parents/entities/parent.entity";
import { Student } from "src/students/entities/student.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Timetable } from "src/timetables/entities/timetable.entity";
import { TransportRoute } from "src/transport_route/entities/transport_route.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

// =========================
// 📌 School
// =========================

@Entity("schools")
@Unique(["registrationNumber"])
export class School {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @Column()
  name: string;

  @Column()
  registrationNumber: string;

  @Column({ type: "enum", enum: ["public", "private", "international"] })
  type: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: "int", nullable: true })
  establishedYear: number;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => `'{"gradingSystem":"A-F","currency":"PKR","language":"en"}'`
  })
  settings: Record<string, any>;

  @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
  status: string;

  // Relations

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teachers?: Teacher[];

  @OneToMany(() => Parent, (parent) => parent.school)
  parents?: Parent[];

  @OneToMany(() => Student, (student) => student.school)
  students?: Student[];

  @OneToMany(() => Notice, (notice) => notice.school)
  notices?: Notice[];

  @OneToMany(() => Class, (classEntity) => classEntity.school)
  classes?: Class[];

  @OneToMany(() => Attendance, (attendance) => attendance.school)
  attendance?: Attendance[];

  @OneToMany(() => Event, (event) => event.school)
  events?: Event[];

  @OneToMany(() => ExamResult, (examResult) => examResult.school)
  examResults?: ExamResult[];

  @OneToMany(() => Exam, (exam) => exam.school)
  exams?: Exam[];

  @OneToMany(() => Fee, (fee) => fee.school)
  fees?: Fee[];

  @OneToMany(() => Hostel, (hostel) => hostel.school)
  hostels?: Hostel[];

  @OneToMany(() => LibraryBook, (libraryBook) => libraryBook.school)
  libraryBooks?: LibraryBook[];

  @OneToMany(() => Subject, (subject) => subject.school)
  subjects?: Subject[];

  @OneToMany(() => Timetable, (timetable) => timetable.school)
  timetables?: Timetable[];

  @OneToMany(() => TransportRoute, (transportRoute) => transportRoute.school)
  transportRoutes?: TransportRoute[];

  // Timestamps 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
