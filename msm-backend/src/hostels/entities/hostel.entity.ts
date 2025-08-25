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
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("hostels")
export class Hostel {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.hostels, { onDelete: "CASCADE" })
    school: School;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: "int" })
    capacity: number;

    @Column({ type: "int" })
    fee: number;

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}