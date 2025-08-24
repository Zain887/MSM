// =========================
// 📌 Attendance
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

@Entity("attendance")
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @ManyToOne(() => School)
  school: School;

  @Column()
  studentId: string;

  @Column()
  classId: string;

  @Column()
  date: string;

  @Column({ type: "enum", enum: ["present", "absent", "leave", "late"] })
  status: string;

  @Column({ nullable: true })
  remarks: string;
}