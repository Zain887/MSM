// src/students/students.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { School } from 'src/schools/entities/school.entity';
import { Class } from 'src/classes/entities/class.entity';
import { Parent } from 'src/parents/entities/parent.entity';
import { Hostel } from 'src/hostels/entities/hostel.entity';
import { TransportRoute } from 'src/transport_route/entities/transport_route.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,

    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,

    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,

    @InjectRepository(Parent)
    private readonly parentRepo: Repository<Parent>,

    @InjectRepository(Hostel)
    private readonly hostelRepo: Repository<Hostel>,

    @InjectRepository(TransportRoute)
    private readonly routeRepo: Repository<TransportRoute>,
  ) { }

  // =====================
  // CREATE STUDENT
  // =====================
  async create(dto: CreateStudentDto): Promise<Student> {
    const { schoolId, classId, parentIds, hostelId, transportRouteId, ...rest } = dto;

    // Validate school
    const school = await this.schoolRepo.findOne({ where: { id: schoolId } });
    if (!school) throw new BadRequestException('Invalid schoolId');

    // Validate class
    const cls = await this.classRepo.findOne({ where: { id: classId } });
    if (!cls) throw new BadRequestException('Invalid classId');

    // Validate parents
    let parents: Parent[] = [];
    if (parentIds?.length) {
      parents = await this.parentRepo.find({ where: { id: In(parentIds) } });
      if (parents.length !== parentIds.length) {
        throw new BadRequestException('One or more parentIds are invalid');
      }
    }

    // Validate hostel (optional)
    let hostel: Hostel | null = null;
    if (hostelId) {
      hostel = await this.hostelRepo.findOne({ where: { id: hostelId } });
      if (!hostel) throw new BadRequestException('Invalid hostelId');
    }

    // Validate transport route (optional)
    let transportRoute: TransportRoute | null = null;
    if (transportRouteId) {
      transportRoute = await this.routeRepo.findOne({ where: { id: transportRouteId } });
      if (!transportRoute) throw new BadRequestException('Invalid transportRouteId');
    }

    // Prepare student data
    const studentData: Partial<Student> = {
      ...rest,
      school,
      class: cls,
      parents,
    };
    if (hostel) studentData.hostel = hostel;
    if (transportRoute) studentData.transportRoute = transportRoute;

    // Create and save student
    const student = this.studentRepo.create(studentData);
    const savedStudent = await this.studentRepo.save(student);

    return this.findOne(savedStudent.id);
  }

  // =====================
  // FIND ALL STUDENTS
  // =====================
  async findAll(): Promise<Student[]> {
    return this.studentRepo.find({
      relations: ['school', 'class', 'parents', 'hostel', 'transportRoute'],
    });
  }

  // =====================
  // FIND ONE STUDENT
  // =====================
  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['school', 'class', 'parents', 'hostel', 'transportRoute'],
    });
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return student;
  }

  // =====================
  // UPDATE STUDENT
  // =====================
  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    const { schoolId, classId, parentIds, hostelId, transportRouteId, ...rest } = dto;

    // Update relations if provided
    if (schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: schoolId } });
      if (!school) throw new BadRequestException('Invalid schoolId');
      student.school = school;
    }

    if (classId) {
      const cls = await this.classRepo.findOne({ where: { id: classId } });
      if (!cls) throw new BadRequestException('Invalid classId');
      student.class = cls;
    }

    if (hostelId) {
      const hostel = await this.hostelRepo.findOne({ where: { id: hostelId } });
      if (!hostel) throw new BadRequestException('Invalid hostelId');
      student.hostel = hostel;
    }

    if (transportRouteId) {
      const route = await this.routeRepo.findOne({ where: { id: transportRouteId } });
      if (!route) throw new BadRequestException('Invalid transportRouteId');
      student.transportRoute = route;
    }

    Object.assign(student, rest);

    const updatedStudent = await this.studentRepo.save(student);

    // Update parents relation if provided
    if (parentIds) {
      const parents = await this.parentRepo.find({ where: { id: In(parentIds) } });
      await this.studentRepo
        .createQueryBuilder()
        .relation(Student, 'parents')
        .of(updatedStudent.id)
        .addAndRemove(
          parents.map(p => p.id),       // new parents to add
          updatedStudent.parents?.map(p => p.id) || [] // existing parents to remove
        );

    }

    return this.findOne(updatedStudent.id);
  }

  // =====================
  // REMOVE STUDENT
  // =====================
  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
  }
}
