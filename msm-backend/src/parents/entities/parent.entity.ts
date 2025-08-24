// =========================
// 📌 Parent
// =========================

import { IsUUID } from "class-validator";
import { School } from "src/schools/entities/school.entity";
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

@Entity("parents")
export class Parent {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @ManyToOne(() => School)
  school: School;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: ["father", "mother", "guardian"] })
  relation: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  nationalId: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ type: "text", array: true, nullable: true })
  studentIds: string[];
}