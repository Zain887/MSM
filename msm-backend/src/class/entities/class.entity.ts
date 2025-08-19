import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn, // Changed from JoinTable to JoinColumn for ManyToOne
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Student } from '../../student/entities/student.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { Exam } from 'src/exam/entities/exam.entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  section?: string;

  // Many classes belong to one school
  @ManyToOne(() => School, (school) => school.classes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schoolId' }) // ❌ Changed from @JoinTable to @JoinColumn
  school: School;

  // Many-to-many: a class can have multiple teachers
  @ManyToMany(() => Teacher, (teacher) => teacher.classes, {
    cascade: true,
  })
  @JoinTable({ name: 'class_teachers' })
  teachers: Teacher[];

  // A class has many students
  @OneToMany(() => Student, (student) => student.classEntity, {
    cascade: true,
  })
  students: Student[];

  // A class has many subjects
  @ManyToMany(() => Subject, (subject) => subject.classes) // ❌ Changed to ManyToMany
  subjects: Subject[];

  // A class has many exams
  @OneToMany(() => Exam, (exam) => exam.class)
  exams: Exam[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date; // ❌ Changed ISODateString to Date

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date | null; // ❌ Changed ISODateString to Date
}