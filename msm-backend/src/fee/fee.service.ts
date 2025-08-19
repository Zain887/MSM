import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee, FeeStatus } from './entities/fee.entity';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { School } from '../schools/entities/school.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,

    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(dto: CreateFeeDto): Promise<Fee> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const student = await this.studentRepository.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const fee = this.feeRepository.create({
      amount: dto.amount,
      dueDate: new Date(dto.dueDate),
      status: dto.status ?? FeeStatus.PENDING,
      paymentMethod: dto.paymentMethod,
      transactionId: dto.transactionId,
      school,
      student,
    });

    return await this.feeRepository.save(fee);
  }

  async findAll(): Promise<Fee[]> {
    return this.feeRepository.find({ relations: ['school', 'student'] });
  }

  async findOne(id: string): Promise<Fee> {
    const fee = await this.feeRepository.findOne({
      where: { id },
      relations: ['school', 'student'],
    });
    if (!fee) throw new NotFoundException('Fee not found');
    return fee;
  }

  async update(id: string, dto: UpdateFeeDto): Promise<Fee> {
    const fee = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      fee.school = school;
    }

    if (dto.studentId) {
      const student = await this.studentRepository.findOne({ where: { id: dto.studentId } });
      if (!student) throw new NotFoundException('Student not found');
      fee.student = student;
    }

    if (dto.dueDate) {
      fee.dueDate = new Date(dto.dueDate);
    }

    Object.assign(fee, dto);
    return await this.feeRepository.save(fee);
  }

  async remove(id: string): Promise<void> {
    const fee = await this.findOne(id);
    await this.feeRepository.remove(fee);
  }
}
