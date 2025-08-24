
// =========================
// 📌 Event
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

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: "date" })
    date: Date;

    @Column()
    location: string;

    @Column({ nullable: true })
    photoUrl: string;
}