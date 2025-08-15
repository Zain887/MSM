import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SuperAdmin } from 'src/superadmin/entities/superadmin.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(SuperAdmin)

    private readonly superAdminRepository: Repository<SuperAdmin>,
  ) { }

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    let superAdmin: SuperAdmin | null = null;

    if (createSchoolDto.superAdminId) {
      // If frontend provides a superAdminId, fetch that
      superAdmin = await this.superAdminRepository.findOne({
        where: { id: createSchoolDto.superAdminId },
      });
      if (!superAdmin) {
        throw new NotFoundException(
          `Super admin with ID "${createSchoolDto.superAdminId}" not found.`
        );
      }
    } else {
      // fallback to default super admin
      const defaultEmail = process.env.DEFAULT_SUPERADMIN_EMAIL || 'admin@system.com';
      superAdmin = await this.superAdminRepository.findOne({
        where: { email: defaultEmail },
      });
      if (!superAdmin) {
        throw new NotFoundException(`Default super admin with email "${defaultEmail}" not found.`);
      }
    }

    const school = this.schoolRepository.create({
      ...createSchoolDto,
      superAdmin, // assign super admin relation
    });

    return this.schoolRepository.save(school);
  }

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find({
      relations: [
        'superAdmin',
        // 'students',
        // 'parents',
        // 'teachers',
        // 'subjects',
        // 'classes',
        // 'notices',
        // 'fees',
        // 'exams',
        // 'examResults',
        // 'events',
        // 'reports',
        // 'attendances',
        // 'settings',
      ],
    });
  }

  async findOne(id: string): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: [
        'superAdmin',
        // 'students',
        // 'parents',
        // 'teachers',
        // 'subjects',
        // 'classes',
        // 'notices',
        // 'fees',
        // 'exams',
        // 'examResults',
        // 'events',
        // 'reports',
        // 'attendances',
        // 'settings',
      ],
    });
    if (!school) throw new NotFoundException(`School with ID "${id}" not found`);
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);

    if (updateSchoolDto.superAdminId) {
      const superAdmin = await this.superAdminRepository.findOne({
        where: { id: updateSchoolDto.superAdminId },
      });
      if (!superAdmin) {
        throw new NotFoundException(
          `Super admin with ID "${updateSchoolDto.superAdminId}" not found.`
        );
      }
      school.superAdmin = superAdmin;
    }

    Object.assign(school, updateSchoolDto);
    return this.schoolRepository.save(school);
  }


  async remove(id: string): Promise<void> {
    const school = await this.findOne(id);
    await this.schoolRepository.remove(school);
  }
}
