import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { School } from 'src/schools/entities/school.entity';

@Entity()
export class SchoolSetting {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-one relation with School, cascade delete so settings auto-delete if school is removed
  @OneToOne(() => School, (school) => school.settings, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: School;

  // Store flexible settings as JSONB, default to empty object
  @Column('jsonb', { default: () => "'{}'" })
  settings: {
    currency?: string;
    dateFormat?: string;
    gradingSystem?: string;
    enableSMSNotifications?: boolean;
    enableEmailNotifications?: boolean;
    schoolLogoUrl?: string;
    // Add more dynamic settings here without schema changes
  };
}
