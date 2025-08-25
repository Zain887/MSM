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
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("library_books")
export class LibraryBook {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.id, { onDelete: "CASCADE" })
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

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}