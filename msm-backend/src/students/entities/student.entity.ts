// src/students/entities/student.entity.ts
import { IsUUID } from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { School } from "src/schools/entities/school.entity";
import { Class } from "src/classes/entities/class.entity";
import { Parent } from "src/parents/entities/parent.entity";
import { Hostel } from "src/hostels/entities/hostel.entity";
import { TransportRoute } from "src/transport_route/entities/transport_route.entity";

@Entity("students")
export class Student {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    // =====================
    // COLUMNS
    // =====================

    @Column()
    admissionNumber: string;

    @Column()
    rollNo: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "enum", enum: ["male", "female", "other"] })
    gender: string;

    @Column({ type: "date" })
    dob: Date;

    @Column({ nullable: true })
    bloodGroup?: string;

    @Column({ nullable: true })
    nationalId?: string;

    @Column({ nullable: true })
    photoUrl?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column()
    address: string;

    @Column({ type: "date" })
    enrollmentDate: string;

    @Column()
    section: string;

    @Column({
        type: "enum",
        enum: ["active", "inactive", "graduated", "left"],
        default: "active",
    })
    status: string;

    // =====================
    // RELATIONS
    // =====================

    @ManyToOne(() => School, (school) => school.students, { onDelete: "CASCADE" })
    @JoinColumn({ name: "schoolId" })
    school: School;

    @Column()
    @IsUUID()
    schoolId: string;

    @ManyToOne(() => Class, (cls) => cls.students, { nullable: false, onDelete: "SET NULL" })
    @JoinColumn({ name: "classId" })
    class?: Class;

    @Column()
    classId?: string;

    @ManyToMany(() => Parent)
    @JoinTable({
        name: "student_parents",
        joinColumn: { name: "studentId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "parentId", referencedColumnName: "id" },
    })
    parents?: Parent[];

    @ManyToOne(() => Hostel, (hostel) => hostel.students, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "hostelId" })
    hostel?: Hostel;

    @Column({ nullable: true })
    hostelId?: string;

    @ManyToOne(() => TransportRoute, (route) => route.students, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "transportRouteId" })
    transportRoute?: TransportRoute;

    @Column({ nullable: true })
    transportRouteId?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
