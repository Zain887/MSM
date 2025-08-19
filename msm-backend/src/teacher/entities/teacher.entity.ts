// src/teacher/entities/teacher.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { ClassEntity } from '../../class/entities/class.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { EntityGender } from '../../types/type';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender?: EntityGender | null;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string | null;

  @Column()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string | null;

  @Column({ type: 'varchar', nullable: true })
  address?: string | null;

  @Column({ type: 'varchar', nullable: true })
  qualification?: string | null;

  @Column({ type: 'varchar', nullable: true })
  profileImageUrl?: string | null;

  @Column({ type: 'int', nullable: true })
  experienceYears?: number | null;

  @ManyToOne(() => School, (school) => school.teachers, { onDelete: 'CASCADE' })
  school: School;

  // ❌ CHANGE THIS LINE
  // It was @OneToMany, but the relationship is ManyToMany
  @ManyToMany(() => ClassEntity, (classEntity) => classEntity.teachers)
  classes: ClassEntity[];

  @ManyToMany(() => Subject, (subject) => subject.teachers, { cascade: true })
  @JoinTable()
  subjects: Subject[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date | null;
}