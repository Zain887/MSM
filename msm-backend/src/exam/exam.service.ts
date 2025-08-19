import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { School } from '../schools/entities/school.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(dto: CreateExamDto): Promise<Exam> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
    if (!classEntity) throw new NotFoundException('Class not found');

    let subject: Subject | undefined = undefined;
    if (dto.subjectId) {
      const foundSubject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });
      if (!foundSubject) throw new NotFoundException('Subject not found');
      subject = foundSubject;
    }

    const exam = this.examRepository.create({
      title: dto.title,
      description: dto.description,
      date: new Date(dto.date),
      totalMarks: dto.totalMarks,
      school,
      class: classEntity,
      subject,
    });

    return await this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find({
      relations: ['school', 'class', 'subject', 'results'],
    });
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { id },
      relations: ['school', 'class', 'subject', 'results'],
    });
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async update(id: string, dto: UpdateExamDto): Promise<Exam> {
    const exam = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      exam.school = school;
    }

    if (dto.classId) {
      const classEntity = await this.classRepository.findOne({ where: { id: dto.classId } });
      if (!classEntity) throw new NotFoundException('Class not found');
      exam.class = classEntity;
    }

    if (dto.subjectId !== undefined) {
      if (dto.subjectId === null) {
        exam.subject = undefined;
      } else {
        const foundSubject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });
        if (!foundSubject) throw new NotFoundException('Subject not found');
        exam.subject = foundSubject;
      }
    }

    // Assign other updated fields
    Object.assign(exam, {
      title: dto.title,
      description: dto.description,
      date: dto.date ? new Date(dto.date) : exam.date,
      totalMarks: dto.totalMarks,
    });

    return await this.examRepository.save(exam);
  }

  async remove(id: string): Promise<void> {
    const exam = await this.findOne(id);
    await this.examRepository.remove(exam);
  }
}
