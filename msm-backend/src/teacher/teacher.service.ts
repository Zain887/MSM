import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { School } from '../schools/entities/school.entity';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) { }

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    let subjects: Subject[] = [];
    if (dto.subjectIds?.length) {
      subjects = await this.subjectRepository.findByIds(dto.subjectIds);
    }

    const teacher = this.teacherRepository.create({
      ...dto,
      school,
      subjects,
    });

    return this.teacherRepository.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      relations: ['school', 'classes', 'subjects'],
    });
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['school', 'classes', 'subjects'],
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async update(id: string, dto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      teacher.school = school;
    }

    if (dto.subjectIds) {
      const subjects = await this.subjectRepository.findByIds(dto.subjectIds);
      teacher.subjects = subjects;
    }

    Object.assign(teacher, dto);
    return this.teacherRepository.save(teacher);
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
  }
}
