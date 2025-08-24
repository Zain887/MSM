// =========================
// 📌 Library
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

@Entity("library_books")
export class LibraryBook {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School)
    school: School;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    isbn: string;

    @Column()
    category: string;

    @Column({ type: "int" })
    copies: number;

    @Column({ type: "int", default: 0 })
    available: number;
}