// =========================
// 📌 Hostel
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

@Entity("hostels")
export class Hostel {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: "int" })
    capacity: number;

    @Column({ type: "int" })
    fee: number;
}