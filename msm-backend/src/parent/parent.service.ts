import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './entities/parent.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { School } from 'src/schools/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { EntityGender } from '../types/type';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentRepository: Repository<Parent>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  private mapGender(gender?: string): EntityGender | null {
    if (!gender) return null;
    const g = gender.toLowerCase();
    if (g === 'male' || g === 'female' || g === 'other') return g as EntityGender;
    return null;
  }

  async create(dto: CreateParentDto): Promise<Parent> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const parent = this.parentRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      gender: this.mapGender(dto.gender) ?? undefined,
      email: dto.email ?? undefined,
      phone: dto.phone ?? undefined,
      address: dto.address ?? undefined,
      occupation: dto.occupation ?? undefined,
      relationshipToStudent: dto.relationshipToStudent ?? undefined,
      profileImageUrl: dto.profileImageUrl ?? undefined,
      school, // assign relation, not schoolId
    });


    if (dto.studentIds?.length) {
      const students = await this.studentRepository.findByIds((dto.studentIds));
      parent.students = students;
    }

    return this.parentRepository.save(parent);
  }

  findAll(): Promise<Parent[]> {
    return this.parentRepository.find({ relations: ['school', 'students'] });
  }

  async findOne(id: string): Promise<Parent> {
    const parent = await this.parentRepository.findOne({ where: { id }, relations: ['school', 'students'] });
    if (!parent) throw new NotFoundException('Parent not found');
    return parent;
  }

  async update(id: string, dto: UpdateParentDto): Promise<Parent> {
    const parent = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      parent.school = school;
    }

    if (dto.gender) parent.gender = this.mapGender(dto.gender);

    Object.assign(parent, {
      firstName: dto.firstName ?? parent.firstName,
      lastName: dto.lastName ?? parent.lastName,
      email: dto.email ?? parent.email,
      phone: dto.phone ?? parent.phone,
      address: dto.address ?? parent.address,
      occupation: dto.occupation ?? parent.occupation,
      relationshipToStudent: dto.relationshipToStudent ?? parent.relationshipToStudent,
      profileImageUrl: dto.profileImageUrl ?? parent.profileImageUrl,
    });

    if (dto.studentIds?.length) {
      const students = await this.studentRepository.findByIds(dto.studentIds);
      parent.students = students;
    }

    return this.parentRepository.save(parent);
  }

  async remove(id: string): Promise<void> {
    const parent = await this.findOne(id);
    await this.parentRepository.remove(parent);
  }
}
