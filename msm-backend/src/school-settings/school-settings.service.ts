// src/school-settings/school-settings.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSetting } from './entities/school-setting.entity';
import { CreateSchoolSettingDto } from './dto/create-school-setting.dto';
import { UpdateSchoolSettingDto } from './dto/update-school-setting.dto';
import { School } from 'src/schools/entities/school.entity';

@Injectable()
export class SchoolSettingsService {
  constructor(
    @InjectRepository(SchoolSetting)
    private readonly schoolSettingRepo: Repository<SchoolSetting>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  // Create new school settings; error if school not found or settings already exist
  async create(dto: CreateSchoolSettingDto): Promise<SchoolSetting> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const existingSetting = await this.schoolSettingRepo.findOne({
      where: { school: { id: dto.schoolId } },
    });
    if (existingSetting) {
      throw new ConflictException('Settings for this school already exist');
    }

    const setting = this.schoolSettingRepo.create({
      school,
      settings: dto.settings || {},
    });
    return this.schoolSettingRepo.save(setting);
  }

  // Find settings by school ID, throw if not found
  async findBySchoolId(schoolId: string): Promise<SchoolSetting> {
    const setting = await this.schoolSettingRepo.findOne({
      where: { school: { id: schoolId } },
      relations: ['school'],
    });
    if (!setting) throw new NotFoundException('School settings not found');
    return setting;
  }

  // Update existing settings by merging new settings with old
  async update(schoolId: string, dto: UpdateSchoolSettingDto): Promise<SchoolSetting> {
    const setting = await this.findBySchoolId(schoolId);
    if (dto.settings) {
      setting.settings = { ...setting.settings, ...dto.settings };
    }
    return this.schoolSettingRepo.save(setting);
  }

  // Remove settings by school ID
  async remove(schoolId: string): Promise<void> {
    const setting = await this.findBySchoolId(schoolId);
    await this.schoolSettingRepo.remove(setting);
  }
}
