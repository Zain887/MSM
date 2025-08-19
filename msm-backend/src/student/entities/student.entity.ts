import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { ClassEntity } from 'src/class/entities/class.entity';
import { Fee } from 'src/fee/entities/fee.entity';
import { ExamResult } from 'src/exam-result/entities/exam-result.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ nullable: true })
  rollNumber?: string;

  @Column({ nullable: true })
  admissionNumber?: string;

  @Column({ nullable: true, type: 'date' })
  admissionDate?: Date;

  @Column({ nullable: true })
  section?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  remarks?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  /** RELATIONS **/

  @ManyToOne(() => School, (school) => school.students, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'schoolId' })
  school: School;

  @Column()
  schoolId: string;

  @ManyToOne(() => Parent, (parent) => parent.students, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Parent;

  @Column()
  parentId: string;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.students, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'classId' })
  classEntity: ClassEntity;

  @Column()
  classId: string;

  @OneToMany(() => Fee, (fee) => fee.student)
  fees: Fee[];

  @OneToMany(() => ExamResult, (result) => result.student)
  examResults: ExamResult[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  /** OPTIONAL: subjects a student is enrolled in (raw IDs) */
  @Column('simple-array', { nullable: true })
  subjectIds?: string[];
}
