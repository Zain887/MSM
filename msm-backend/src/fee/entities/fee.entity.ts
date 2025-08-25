// =========================
// 📌 Fee
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

@Entity("fees")
export class Fee {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.fees, { onDelete: "CASCADE" })
    school: School;

    @Column()
    studentId: string;

    @Column()
    classId: string;

    @Column({ type: "int" })
    amount: number;

    @Column()
    dueDate: string;

    @Column({ type: "int" })
    paidAmount: number;

    @Column({ type: "date", nullable: true })
    paidDate: Date;

    @Column({ type: "enum", enum: ["unpaid", "partial", "paid"], default: "unpaid" })
    status: string;

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}