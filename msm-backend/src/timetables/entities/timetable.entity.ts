// =========================
// 📌 Timetable
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


@Entity("timetables")
export class Timetable {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.timetables, { onDelete: "CASCADE" })
    school: School;

    @Column()
    classId: string;

    @Column()
    day: string;

    @Column()
    period: string;

    @Column()
    subjectId: string;

    @Column()
    teacherId: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}