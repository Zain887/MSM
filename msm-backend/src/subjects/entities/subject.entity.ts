// =========================
// 📌 Subject
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

@Entity("subjects")
export class Subject {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.subjects, { onDelete: "CASCADE" })
    school: School;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({ type: "enum", enum: ["core", "elective"] })
    type: string;

    @Column({ type: "int", nullable: true })
    credits: number;

    @Column({ type: "text", array: true, nullable: true })
    teacherIds: string[];

    @Column({ type: "text", array: true, nullable: true })
    classIds: string[];

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}