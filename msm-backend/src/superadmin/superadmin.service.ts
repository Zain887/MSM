import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperAdmin } from './entities/superadmin.entity';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { UpdateSuperAdminDto } from './dto/update-superadmin.dto';

@Injectable()
export class SuperAdminService implements OnModuleInit {
  constructor(
    @InjectRepository(SuperAdmin)
    private superAdminRepo: Repository<SuperAdmin>,
  ) {}

  // ✅ Runs when module is loaded
  async onModuleInit() {
    await this.ensureDefaultSuperAdmin();
  }

  private async ensureDefaultSuperAdmin() {
    const defaultEmail = process.env.DEFAULT_SUPERADMIN_EMAIL || 'admin@system.com';

    const existing = await this.superAdminRepo.findOne({ where: { email: defaultEmail } });

    if (!existing) {
      const admin = this.superAdminRepo.create({
        fullName: 'Super Admin',
        email: defaultEmail,
        phone: '0000000000',
      });
      await this.superAdminRepo.save(admin);
      console.log(`✅ Default super admin created: ${defaultEmail}`);
    } else {
      console.log(`ℹ️ Super admin already exists: ${defaultEmail}`);
    }
  }

  async create(dto: CreateSuperAdminDto): Promise<SuperAdmin> {
    const superAdmin = this.superAdminRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
    });
    return this.superAdminRepo.save(superAdmin);
  }

  findAll(): Promise<SuperAdmin[]> {
    return this.superAdminRepo.find({ relations: ['schools'] });
  }

  async findOne(id: string): Promise<SuperAdmin> {
    const superAdmin = await this.superAdminRepo.findOne({
      where: { id },
      relations: ['schools'],
    });
    if (!superAdmin) throw new NotFoundException('Super admin not found');
    return superAdmin;
  }

  async update(id: string, dto: UpdateSuperAdminDto): Promise<SuperAdmin> {
    const superAdmin = await this.findOne(id);
    Object.assign(superAdmin, dto);
    return this.superAdminRepo.save(superAdmin);
  }

  async remove(id: string): Promise<void> {
    const result = await this.superAdminRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Super admin not found');
    }
  }
}
