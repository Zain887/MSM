import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepo.create(dto);
    return this.schoolRepo.save(school);
  }

  async findAll(): Promise<School[]> {
    return this.schoolRepo.find();
  }

  async findOne(id: string): Promise<School> {
    const school = await this.schoolRepo.findOne({ where: { id } });
    if (!school) throw new NotFoundException(`School with ID ${id} not found`);
    return school;
  }

  async update(id: string, dto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);
    Object.assign(school, dto);
    return this.schoolRepo.save(school);
  }

  async remove(id: string): Promise<void> {
    const school = await this.findOne(id);
    await this.schoolRepo.remove(school);
  }
}
