// =========================
// 📌 Teacher
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

@Entity("teachers")
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    employeeCode: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender: string;

    @Column({ type: "date" })
    dob: Date;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    qualification: string;

    @Column({ type: "int" })
    experienceYears: number;

    @Column({ type: "date" })
    joiningDate: Date;

    @Column()
    designation: string;

    @Column()
    department: string;

    @Column({ type: "text", array: true, nullable: true })
    subjectIds: string[];

    @Column({ type: "text", array: true, nullable: true })
    classIds: string[];

    @Column({ type: "int", nullable: true })
    salary: number;

    @Column({ nullable: true })
    photoUrl: string;

    @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
    status: string;
}
