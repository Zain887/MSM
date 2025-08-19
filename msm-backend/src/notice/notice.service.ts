import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { School } from 'src/schools/entities/school.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,

    @InjectRepository(School)
    private schoolRepository: Repository<School>,

    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) { }

  async create(dto: CreateNoticeDto): Promise<Notice> {
    const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    let postedBy: Teacher | undefined = undefined;
    if (dto.postedById) {
      const foundTeacher = await this.teacherRepository.findOne({ where: { id: dto.postedById } });
      if (!foundTeacher) throw new NotFoundException('Teacher (postedBy) not found');
      postedBy = foundTeacher;
    }

    const notice = this.noticeRepository.create({
      title: dto.title,
      content: dto.content,
      category: dto.category,
      school,
      postedBy,
      isActive: dto.isActive ?? true,
    });

    return this.noticeRepository.save(notice);
  }


  findAll(): Promise<Notice[]> {
    return this.noticeRepository.find({ relations: ['school', 'postedBy'] });
  }

  async findOne(id: string): Promise<Notice> {
    const notice = await this.noticeRepository.findOne({
      where: { id },
      relations: ['school', 'postedBy'],
    });
    if (!notice) throw new NotFoundException('Notice not found');
    return notice;
  }

  async update(id: string, dto: UpdateNoticeDto): Promise<Notice> {
    const notice = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      notice.school = school;
    }

    if (dto.postedById !== undefined) {
      if (dto.postedById === null) {
        notice.postedBy = undefined;
      } else {
        const postedBy = await this.teacherRepository.findOne({ where: { id: dto.postedById } });
        if (!postedBy) throw new NotFoundException('Teacher (postedBy) not found');
        notice.postedBy = postedBy;
      }
    }

    Object.assign(notice, dto);
    return this.noticeRepository.save(notice);
  }

  async remove(id: string): Promise<void> {
    const notice = await this.findOne(id);
    await this.noticeRepository.remove(notice);
  }
}
