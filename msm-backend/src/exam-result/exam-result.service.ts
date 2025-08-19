import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResult } from './entities/exam-result.entity';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { School } from '../schools/entities/school.entity';
import { Exam } from '../exam/entities/exam.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepo: Repository<ExamResult>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,

    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateExamResultDto): Promise<ExamResult> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const exam = await this.examRepo.findOne({ where: { id: dto.examId } });
    if (!exam) throw new NotFoundException('Exam not found');

    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const examResult = this.examResultRepo.create({
      school,
      exam,
      student,
      obtainedMarks: dto.obtainedMarks,
      totalMarks: dto.totalMarks,
      remarks: dto.remarks,
    });

    return this.examResultRepo.save(examResult);
  }

  async findAll(): Promise<ExamResult[]> {
    return this.examResultRepo.find({ relations: ['school', 'exam', 'student'] });
  }

  async findOne(id: string): Promise<ExamResult> {
    const examResult = await this.examResultRepo.findOne({
      where: { id },
      relations: ['school', 'exam', 'student'],
    });
    if (!examResult) throw new NotFoundException('Exam result not found');
    return examResult;
  }

  async update(id: string, dto: UpdateExamResultDto): Promise<ExamResult> {
    const examResult = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      examResult.school = school;
    }

    if (dto.examId) {
      const exam = await this.examRepo.findOne({ where: { id: dto.examId } });
      if (!exam) throw new NotFoundException('Exam not found');
      examResult.exam = exam;
    }

    if (dto.studentId) {
      const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
      if (!student) throw new NotFoundException('Student not found');
      examResult.student = student;
    }

    Object.assign(examResult, dto);
    return this.examResultRepo.save(examResult);
  }

  async remove(id: string): Promise<void> {
    const examResult = await this.findOne(id);
    await this.examResultRepo.remove(examResult);
  }
}
