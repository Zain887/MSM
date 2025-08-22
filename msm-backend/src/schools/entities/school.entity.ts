import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  registrationNumber: string;

  @Column({ type: 'enum', enum: ['public', 'private', 'international'] })
  type: 'public' | 'private' | 'international';

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: 'int', nullable: true })
  establishedYear: number;

  @Column({ type: 'json', nullable: true })
  settings: Record<string, any>;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';
}
