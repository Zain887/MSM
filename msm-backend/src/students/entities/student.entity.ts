// =========================
// 📌 Student
// =========================

import { IsUUID } from "class-validator";
import { School } from "src/schools/entities/school.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("students")
export class Student {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.students, { onDelete: "CASCADE" })
    school: School;

    @Column()
    admissionNumber: string;

    @Column()
    rollNo: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender: string;

    @Column({ type: "date" })
    dob: Date;

    @Column({ nullable: true })
    bloodGroup: string;

    @Column({ nullable: true })
    nationalId: string;

    @Column({ nullable: true })
    photoUrl: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    address: string;

    @Column({ type: "date" })
    enrollmentDate: Date;

    @Column()
    classId: string;

    @Column()
    section: string;

    @Column({ type: "text", array: true, nullable: true })
    parentIds: string[];

    @Column({ nullable: true })
    hostelId: string;

    @Column({ nullable: true })
    transportRouteId: string;

    @Column({
        type: "enum",
        enum: ["active", "inactive", "graduated", "left"],
        default: "active",
    })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}