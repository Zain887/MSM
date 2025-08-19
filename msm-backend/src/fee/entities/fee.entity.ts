import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Student } from '../../student/entities/student.entity';

export enum FeeStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

@Entity()
export class Fee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => School, (school) => school.fees, { onDelete: 'CASCADE' })
  school: School;

  @ManyToOne(() => Student, (student) => student.fees, { onDelete: 'CASCADE' })
  student: Student;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // e.g., 1500.00

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: FeeStatus,
    default: FeeStatus.PENDING,
  })
  status: FeeStatus;

  @Column({ nullable: true })
  paymentMethod?: string; // e.g., "Cash", "Bank Transfer", "JazzCash"

  @Column({ nullable: true })
  transactionId?: string; // Optional transaction reference

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
