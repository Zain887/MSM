// =========================
// 📌 Transport
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

@Entity("transport_routes")
export class TransportRoute {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    routeName: string;

    @Column()
    vehicleNumber: string;

    @Column()
    driverName: string;

    @Column()
    driverPhone: string;

    @Column({ type: "int" })
    capacity: number;

    @Column({ type: "int" })
    fee: number;
}