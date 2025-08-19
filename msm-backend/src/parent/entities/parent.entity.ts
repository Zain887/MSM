import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { Student } from '../../student/entities/student.entity';
import { ISODateString, EntityGender } from '../../types/type';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // Use enum type for PostgreSQL compatibility
  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    nullable: true,
  })
  gender?: EntityGender | null;

  @Column({ type: 'varchar', nullable: true })
  email?: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone?: string | null;

  @Column({ type: 'varchar', nullable: true })
  address?: string | null;

  @Column({ type: 'varchar', nullable: true })
  profileImageUrl?: string | null;

  @Column({ type: 'varchar', nullable: true })
  occupation?: string | null;

  @Column({ type: 'varchar', nullable: true })
  relationshipToStudent?: string | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: ISODateString | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt?: ISODateString | null;

  // Many parents belong to one school
  @ManyToOne(() => School, (school) => school.parents, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  school: School;

  // One parent can have many students
  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];
}
