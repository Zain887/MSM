import { School } from "src/schools/entities/school.entity";
import { ClassEntity } from "./entities/class.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Repository } from "typeorm";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepo: Repository<ClassEntity>,
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateClassDto): Promise<ClassEntity> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    let teachers: Teacher[] = [];
    if (dto.teacherIds?.length) {
      teachers = await this.teacherRepo.findByIds(dto.teacherIds);
      if (teachers.length !== dto.teacherIds.length)
        throw new NotFoundException('One or more teachers not found');
    }

    const newClass = this.classRepo.create({
      name: dto.name,
      section: dto.section,
      school,
      teachers,
    });

    return await this.classRepo.save(newClass);
  }

  async findAll(): Promise<ClassEntity[]> {
    return this.classRepo.find({
      relations: ['school', 'teachers', 'students', 'subjects', 'exams'],
    });
  }

  async findOne(id: string): Promise<ClassEntity> {
    const cls = await this.classRepo.findOne({
      where: { id },
      relations: ['school', 'teachers', 'students', 'subjects', 'exams'],
    });
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  async update(id: string, dto: UpdateClassDto): Promise<ClassEntity> {
    const cls = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      cls.school = school;
    }

    if (dto.teacherIds !== undefined) {
      if (dto.teacherIds.length === 0) {
        cls.teachers = [];
      } else {
        const teachers = await this.teacherRepo.findByIds(dto.teacherIds);
        if (teachers.length !== dto.teacherIds.length)
          throw new NotFoundException('One or more teachers not found');
        cls.teachers = teachers;
      }
    }

    if (dto.name !== undefined) cls.name = dto.name;
    if (dto.section !== undefined) cls.section = dto.section;

    return this.classRepo.save(cls);
  }

  async remove(id: string): Promise<void> {
    const cls = await this.findOne(id);
    await this.classRepo.remove(cls);
  }
}
