// =========================
// 📌 Class
// =========================

import { IsUUID } from "class-validator";
import { School } from "src/schools/entities/school.entity";
import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

@Entity("classes")
export class Class {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @ManyToOne(() => School, (school) => school.classes, { onDelete: "CASCADE" })
    school: School;

    @ManyToMany(() => Teacher, (teacher) => teacher.classes, { nullable: true })
    @JoinTable()
    teachers: Teacher[];

    @OneToMany(() => Student, (student) => student.class)
    students: Student[];

    @Column()
    name: string;

    @Column()
    section: string;

    @Column({ nullable: true })
    classTeacherId: string;

    @Column({ type: "text", array: true, nullable: true })
    teacherIds: string[];

    @Column({ type: "text", array: true, nullable: true })
    subjectIds: string[];

    @Column({ type: "int", nullable: true })
    capacity: number;

    @Column()
    academicYear: string;

    // Timestamps 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}