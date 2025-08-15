import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SuperAdmin } from '../../superadmin/entities/superadmin.entity';
// import { Student } from 'src/student/entities/student.entity';
// import { Parent } from 'src/parent/entities/parent.entity';
// import { Teacher } from 'src/teacher/entities/teacher.entity';
// import { Subject } from 'src/subject/entities/subject.entity';
// import { ClassEntity } from 'src/class/entities/class.entity';
// import { Notice } from 'src/notice/entities/notice.entity';
// import { Fee } from 'src/fee/entities/fee.entity';
// import { Exam } from 'src/exam/entities/exam.entity';
// import { ExamResult } from 'src/exam-result/entities/exam-result.entity';
// import { Event } from 'src/event/entities/event.entity';
// import { Report } from 'src/report/entities/report.entity';
// import { Attendance } from 'src/attendance/entities/attendance.entity';
// import { SchoolSetting } from 'src/school-settings/entities/school-setting.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  contactEmail?: string;

  @Column({ nullable: true })
  contactPhone?: string;

  @ManyToOne(() => SuperAdmin, (superAdmin) => superAdmin.schools, { nullable: false })
  superAdmin: SuperAdmin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  // @OneToMany(() => Student, (student) => student.school)
  // students: Student[];

  // @OneToMany(() => Parent, (parent) => parent.school)
  // parents: Parent[];

  // @OneToMany(() => Teacher, (teacher) => teacher.school)
  // teachers: Teacher[];

  // @OneToMany(() => Subject, (subject) => subject.school)
  // subjects: Subject[];

  // @OneToMany(() => ClassEntity, (classEntity) => classEntity.school)
  // classes: ClassEntity[];

  // @OneToMany(() => Notice, (notice) => notice.school)
  // notices: Notice[];

  // @OneToMany(() => Fee, (fee) => fee.school)
  // fees: Fee[];

  // @OneToMany(() => Exam, (exam) => exam.school)
  // exams: Exam[];

  // @OneToMany(() => ExamResult, (result) => result.school)
  // examResults: ExamResult[];

  // @OneToMany(() => Event, (event) => event.school)
  // events: Event[];

  // @OneToMany(() => Report, (report) => report.school)
  // reports: Report[];

  // @OneToMany(() => Attendance, (attendance) => attendance.school)
  // attendances: Attendance[];

  // @OneToOne(() => SchoolSetting, (settings) => settings.school, { cascade: true })
  // settings: SchoolSetting;
}
