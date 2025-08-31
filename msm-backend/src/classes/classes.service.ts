import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Class } from "./entities/class.entity";
import { School } from "src/schools/entities/school.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>
  ) {}

  async create(dto: CreateClassDto): Promise<Class> {
    const school = await this.schoolRepo.findOneBy({ id: dto.schoolId });
    if (!school) throw new NotFoundException("School not found");

    const teachers = dto.teacherIds?.length
      ? await this.teacherRepo.findBy({ id: In(dto.teacherIds) })
      : [];

    const newClass = this.classRepo.create({
      school,
      teachers,
      name: dto.name,
      section: dto.section,
      classTeacherId: dto.classTeacherId,
      teacherIds: dto.teacherIds,
      subjectIds: dto.subjectIds,
      capacity: dto.capacity,
      academicYear: dto.academicYear,
    });

    return await this.classRepo.save(newClass);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepo.find({
      relations: ["school", "teachers", "students"], // include relations if needed
    });
  }

  async findOne(id: string): Promise<Class> {
    const cls = await this.classRepo.findOne({
      where: { id },
      relations: ["school", "teachers", "students"],
    });
    if (!cls) throw new NotFoundException("Class not found");
    return cls;
  }

  async update(id: string, dto: UpdateClassDto): Promise<Class> {
    const cls = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOneBy({ id: dto.schoolId });
      if (!school) throw new NotFoundException("School not found");
      cls.school = school;
    }

    if (dto.teacherIds) {
      cls.teachers = await this.teacherRepo.findBy({ id: In(dto.teacherIds) });
      cls.teacherIds = dto.teacherIds;
    }

    if (dto.name) cls.name = dto.name;
    if (dto.section) cls.section = dto.section;
    if (dto.classTeacherId) cls.classTeacherId = dto.classTeacherId;
    if (dto.subjectIds) cls.subjectIds = dto.subjectIds;
    if (dto.capacity) cls.capacity = dto.capacity;
    if (dto.academicYear) cls.academicYear = dto.academicYear;

    return await this.classRepo.save(cls);
  }

  async remove(id: string): Promise<void> {
    const cls = await this.findOne(id);
    await this.classRepo.remove(cls);
  }
}
