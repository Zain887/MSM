// =========================
// 📌 Exam
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


@Entity("exams")
export class Exam {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    classId: string;

    @Column()
    subjectId: string;

    @Column({ type: "date" })
    examDate: Date;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column({ type: "int" })
    maxMarks: number;

    @Column({ type: "int" })
    passingMarks: number;
}