import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { School } from 'src/schools/entities/school.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const { schoolId, name, code, type, credits, teacherIds, classIds } = createSubjectDto;

    const school = await this.schoolRepo.findOneBy({ id: schoolId });
    if (!school) throw new NotFoundException('School not found');

    const newSubject = this.subjectRepo.create({
      name,
      code,
      type,
      credits,
      teacherIds: teacherIds ?? [],
      classIds: classIds ?? [],
      school,
    });

    return await this.subjectRepo.save(newSubject);
  }

  async findAll() {
    return await this.subjectRepo.find({ relations: ['school'] });
  }

  async findOne(id: string) {
    const subject = await this.subjectRepo.findOne({ where: { id }, relations: ['school'] });
    if (!subject) throw new NotFoundException(`Subject with id ${id} not found`);
    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    Object.assign(subject, updateSubjectDto);

    return await this.subjectRepo.save(subject);
  }

  async remove(id: string) {
    const subject = await this.findOne(id);
    return await this.subjectRepo.remove(subject);
  }
}
