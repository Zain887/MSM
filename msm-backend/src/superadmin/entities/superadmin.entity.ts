import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

@Entity()
export class SuperAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string; // matches DTO

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => School, (school) => school.superAdmin)
  schools: School[];
}
