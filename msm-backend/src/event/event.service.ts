// event.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { School } from '../schools/entities/school.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
    if (!school) throw new NotFoundException('School not found');

    const event = this.eventRepo.create({
      ...dto,
      school,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      isPublic: dto.isPublic ?? false,
    });

    return await this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepo.find({ relations: ['school'] });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepo.findOne({ where: { id }, relations: ['school'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    if (dto.schoolId) {
      const school = await this.schoolRepo.findOne({ where: { id: dto.schoolId } });
      if (!school) throw new NotFoundException('School not found');
      event.school = school;
    }

    if (dto.title !== undefined) event.title = dto.title;
    if (dto.description !== undefined) event.description = dto.description;
    if (dto.startDate !== undefined) event.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) event.endDate = dto.endDate ? new Date(dto.endDate) : undefined;
    if (dto.location !== undefined) event.location = dto.location;
    if (dto.isPublic !== undefined) event.isPublic = dto.isPublic;

    return this.eventRepo.save(event);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepo.remove(event);
  }
}
