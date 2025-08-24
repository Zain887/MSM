// =========================
// 📌 Exam Result
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

@Entity("exam_results")
export class ExamResult {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    examId: string;

    @Column()
    studentId: string;

    @Column({ type: "int" })
    marksObtained: number;

    @Column()
    grade: string;

    @Column()
    remarks: string;
}
