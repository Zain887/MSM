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
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("transport_routes")
export class TransportRoute {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.transportRoutes, { onDelete: "CASCADE" })
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

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}