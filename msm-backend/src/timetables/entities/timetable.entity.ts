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
    OneToMany,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity("timetables")
export class Timetable {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
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
}