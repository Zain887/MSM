import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { School } from 'src/schools/entities/school.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateReportDto): Promise<Report> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const report = this.reportRepo.create({
      title: dto.title,
      description: dto.description,
      school,
    });

    return this.reportRepo.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepo.find({ relations: ['school'] });
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepo.findOne({ where: { id }, relations: ['school'] });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async update(id: number, dto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      report.school = school;
    }

    Object.assign(report, dto);
    return this.reportRepo.save(report);
  }

  async remove(id: number): Promise<void> {
    const report = await this.findOne(id);
    await this.reportRepo.remove(report);
  }
}
