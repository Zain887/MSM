import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { School } from '../../schools/entities/school.entity';
import { ClassEntity } from '../../class/entities/class.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { ExamResult } from 'src/exam-result/entities/exam-result.entity';

@Entity()
export class Exam {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => School, (school) => school.exams, { onDelete: 'CASCADE' })
    school: School;

    @ManyToOne(() => ClassEntity, (cls) => cls.exams, { onDelete: 'CASCADE' })
    class: ClassEntity;

    @ManyToOne(() => Subject, (subject) => subject.exams, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    subject?: Subject;

    @Column()
    title: string; // e.g., "Midterm Mathematics Exam"

    @Column({ nullable: true })
    description?: string;

    @Column({ type: 'date' })
    date: Date;

    @Column('int')
    totalMarks: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ExamResult, (result) => result.exam)
    results: ExamResult[];
}
