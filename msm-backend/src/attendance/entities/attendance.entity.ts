import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => School, (school) => school.attendances, { onDelete: 'CASCADE' })
  school: School;

  @ManyToOne(() => Student, (student) => student.attendances, { onDelete: 'CASCADE' })
  student: Student;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: ['Present', 'Absent', 'Late'], default: 'Present' })
  status: 'Present' | 'Absent' | 'Late';
}
