
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
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.events, { onDelete: "CASCADE" })
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

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}