import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Exam } from '../../exam/entities/exam.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class ExamResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School, (school) => school.examResults, {
    onDelete: 'CASCADE',
  })
  school: School;

  @ManyToOne(() => Exam, (exam) => exam.results, {
    onDelete: 'CASCADE',
  })
  exam: Exam;

  @ManyToOne(() => Student, (student) => student.examResults, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @Column('int')
  obtainedMarks: number;

  @Column('int', { nullable: true })
  totalMarks?: number; // optional, can come from Exam too

  @Column({ nullable: true })
  remarks?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
