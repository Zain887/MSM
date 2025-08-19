import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { ClassEntity } from '../../class/entities/class.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  code?: string;

  @ManyToOne(() => School, (school) => school.subjects, { onDelete: 'CASCADE' })
  school: School;

  @ManyToMany(() => ClassEntity, (classEntity) => classEntity.subjects)
  @JoinTable({
    name: 'class_subjects', // Naming the join table
    joinColumn: { name: 'subjectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'classId', referencedColumnName: 'id' },
  })
  classes: ClassEntity[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  @JoinTable()
  teachers: Teacher[];

  @OneToMany(() => Exam, (exam) => exam.subject)
  exams: Exam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null;
}