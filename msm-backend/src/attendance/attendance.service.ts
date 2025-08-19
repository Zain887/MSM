import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { School } from '../schools/entities/school.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const attendance = this.attendanceRepo.create({
      school,
      student,
      date: new Date(dto.date),
      status: dto.status,
    });

    return this.attendanceRepo.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepo.find({ relations: ['school', 'student'] });
  }

  async findOne(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepo.findOne({
      where: { id },
      relations: ['school', 'student'],
    });
    if (!attendance) throw new NotFoundException('Attendance not found');
    return attendance;
  }

  async update(id: number, dto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      attendance.school = school;
    }

    if (dto.studentId) {
      const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
      if (!student) throw new NotFoundException('Student not found');
      attendance.student = student;
    }

    if (dto.date) attendance.date = new Date(dto.date);
    if (dto.status) attendance.status = dto.status;

    return this.attendanceRepo.save(attendance);
  }

  async remove(id: number): Promise<void> {
    const attendance = await this.findOne(id);
    await this.attendanceRepo.remove(attendance);
  }
}
