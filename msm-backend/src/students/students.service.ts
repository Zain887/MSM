import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "src/schools/entities/school.entity";
import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,

    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) { }


  async create(createStudentDto: CreateStudentDto) {
    const school = await this.schoolRepo.findOne({
      where: { id: createStudentDto.schoolId },
    });
    if (!school) {
      throw new Error("School not found");
    }
    const student = this.studentRepo.create({
      schoolId: createStudentDto.schoolId,
      admissionNumber: createStudentDto.admissionNumber,
      rollNo: createStudentDto.rollNo,
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      gender: createStudentDto.gender,
      dob: createStudentDto.dob,
      bloodGroup: createStudentDto.bloodGroup,
      nationalId: createStudentDto.nationalId,
      photoUrl: createStudentDto.photoUrl,
      email: createStudentDto.email,
      phone: createStudentDto.phone,
      address: createStudentDto.address,
      enrollmentDate: createStudentDto.enrollmentDate,
      section: createStudentDto.section,
      // Add other fields as necessary
    });
    return this.studentRepo.save(student);

    // return "This action adds a new student";
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}