import { IsUUID } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// =========================
// 📌 School
// =========================

@Entity("schools")
export class School {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @Column()
  name: string;

  @Column()
  registrationNumber: string;

  @Column({ type: "enum", enum: ["public", "private", "international"] })
  type: string;

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

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: "int", nullable: true })
  establishedYear: number;

  @Column({ type: "jsonb", nullable: true })
  settings: Record<string, any>;

  @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
