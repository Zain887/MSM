import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { School } from '../schools/entities/school.entity';
import { ClassEntity } from '../class/entities/class.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  async create(dto: CreateSubjectDto): Promise<Subject> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    // Fetch classes
    let classes: ClassEntity[] = [];
    if (dto.classIds?.length) {
      const classes = await this.classRepository.findBy({ id: In(dto.classIds) });
    }

    // Fetch teachers (optional)
    let teachers: Teacher[] = [];
    if (dto.teacherIds?.length) {
      const teachers = await this.teacherRepository.findBy({ id: In(dto.teacherIds) });
    }

    const subject = this.subjectRepository.create({
      name: dto.name,
      code: dto.code,
      school,
      classes,
      teachers,
    });

    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({
      relations: ['school', 'classes', 'teachers', 'exams'],
    });
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['school', 'classes', 'teachers', 'exams'],
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async update(id: string, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);

    if (dto.name !== undefined) subject.name = dto.name;
    if (dto.code !== undefined) subject.code = dto.code;

    // Update classes
    if (dto.classIds !== undefined) {
      const classes = await this.classRepository.findBy({ id: In(dto.classIds) });
      subject.classes = classes;
    }

    // Update teachers
    if (dto.teacherIds !== undefined) {
      if (dto.teacherIds.length === 0) {
        // clear teachers
        subject.teachers = [];
      } else {
        const teachers = await this.teacherRepository.findBy({ id: In(dto.teacherIds) });
        subject.teachers = teachers;
      }
    }

    return this.subjectRepository.save(subject);
  }

  async remove(id: string): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }
}
