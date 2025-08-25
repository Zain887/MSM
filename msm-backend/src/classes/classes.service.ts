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
  ) { }

  async create(dto: CreateClassDto): Promise<Class> {
    const school = await this.schoolRepo.findOneBy({ id: dto.schoolId });
    if (!school) throw new NotFoundException("School not found");

    const teachers = dto.teacherIds?.length
      ? await this.teacherRepo.findBy({ id: In(dto.teacherIds) })
      : [];

    const newClass = this.classRepo.create({
      name: dto.name,
      school,
      teachers,
    });

    return await this.classRepo.save(newClass);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepo.find();
  }

  async findOne(id: string): Promise<Class> {
    const cls = await this.classRepo.findOne({ where: { id } });
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
    }

    if (dto.name) cls.name = dto.name;

    return await this.classRepo.save(cls);
  }

  async remove(id: string): Promise<void> {
    const cls = await this.findOne(id);
    await this.classRepo.remove(cls);
  }
}
