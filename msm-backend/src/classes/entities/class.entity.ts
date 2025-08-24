// =========================
// 📌 Class
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

@Entity("classes")
export class Class {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    name: string;

    @Column()
    section: string;

    @Column({ nullable: true })
    classTeacherId: string;

    @Column({ type: "text", array: true, nullable: true })
    teacherIds: string[];

    @Column({ type: "text", array: true, nullable: true })
    subjectIds: string[];

    @Column({ type: "int", nullable: true })
    capacity: number;

    @Column()
    academicYear: string;
}