import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Notice title (e.g., "Sports Day Announcement")

  @Column('text')
  content: string; // Full notice content

  @Column({ nullable: true })
  category?: string; // e.g., "Event", "Holiday", "Exam"

  @ManyToOne(() => School, (school) => school.notices, {
    onDelete: 'CASCADE',
  })
  school: School;

  @ManyToOne(() => Teacher, { nullable: true, onDelete: 'SET NULL' })
  postedBy?: Teacher; // Optional — who posted the notice

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean; // For enabling/disabling a notice
}
