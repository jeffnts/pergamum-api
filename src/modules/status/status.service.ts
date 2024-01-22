import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma';
import { ACTIVE, INACTIVE, BLOCKED } from 'constants/status';

@Injectable()
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  async populateStatus(): Promise<void> {
    const statusData = [
      {
        id: ACTIVE,
        name: 'ACTIVE',
        description: 'Ativo',
      },
      {
        id: INACTIVE,
        name: 'INACTIVE',
        description: 'Inativo',
      },
      {
        id: BLOCKED,
        name: 'BLOCKED',
        description: 'Bloqueado',
      },
    ];
    const status = await this.prisma.status.findMany();
    if (status.length !== statusData.length) {
      await this.prisma.status.createMany({
        data: statusData,
      });
    }
  }

  async findAll() {
    return this.prisma.status.findMany();
  }
}
