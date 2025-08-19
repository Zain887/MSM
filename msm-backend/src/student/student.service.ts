import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { School } from 'src/schools/entities/school.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { ClassEntity } from 'src/class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(School)
    private schoolRepo: Repository<School>,
    @InjectRepository(Parent)
    private parentRepo: Repository<Parent>,
    @InjectRepository(ClassEntity)
    private classRepo: Repository<ClassEntity>,
  ) { }

  async create(dto: CreateStudentDto): Promise<Student> {
    // Validate and fetch the related School entity
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) {
      throw new NotFoundException('School not found');
    }

    // Validate and fetch the single related Parent entity
    const parent = await this.parentRepo.findOne({
      where: { id: dto.parentIds }, // Use dto.parentIds from the DTO
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }

    // Validate and fetch the related Class entity
    const classEntity = await this.classRepo.findOne({ where: { id: dto.classId } });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    // Create a new student instance and assign the fetched entities
    const student = this.studentRepo.create({
      ...dto,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      school,
      parent, // Assign the single parent entity
      classEntity,
    });

    // Save the student instance to the database
    return await this.studentRepo.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepo.find({
      relations: ['school', 'classEntity', 'parent'], // Corrected to 'parent'
    });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['school', 'classEntity', 'parent'], // Corrected to 'parent'
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    // Update school relation if provided
    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) {
        throw new NotFoundException('School not found');
      }
      student.school = school;
    }

    // Update parent relation if provided
    if (dto.parentIds) {
      const parent = await this.parentRepo.findOne({
        where: { id: dto.parentIds },
      });
      if (!parent) {
        throw new NotFoundException('Parent not found');
      }
      student.parent = parent;
    }

    // Update class relation if provided
    if (dto.classId) {
      const classEntity = await this.classRepo.findOne({ where: { id: dto.classId } });
      if (!classEntity) {
        throw new NotFoundException('Class not found');
      }
      student.classEntity = classEntity;
    }

    // Assign other DTO properties to the student object
    Object.assign(student, dto);
    if (dto.dateOfBirth) {
      student.dateOfBirth = new Date(dto.dateOfBirth);
    }

    return await this.studentRepo.save(student);
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
  }
}
