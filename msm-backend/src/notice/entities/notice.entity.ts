// =========================
// 📌 Notice
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

@Entity("notices")
export class Notice {
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

    @Column({ type: "enum", enum: ["general", "exam", "event", "holiday"] })
    category: string;

    @Column({ nullable: true })
    attachmentUrl: string;
}