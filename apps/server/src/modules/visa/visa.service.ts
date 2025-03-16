import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  GetVisaByIdResponse,
  GetVisasResponse,
  VisaOperationResponse,
} from './types/visa-response';
import { UpdateVisaDto } from './dto/update-visa.dto';
import { Visa } from './types/visa';
import { VisaFilters } from './types/visa-filters';

@Injectable()
export class VisaService {
  constructor(private readonly prismaClient: PrismaService) {}

  async getVisas(visaFilters: VisaFilters): Promise<GetVisasResponse> {
    const { country, visaType, page, limit } = visaFilters;

    const offset = (page - 1) * limit;

    const filters: Prisma.VisaProductsWhereInput = {
      ...(country && { country }),
      ...(visaType && { visaType }),
    };

    const [data, totalRecords] = [
      await this.prismaClient.visaProducts.findMany({
        where: filters,
        skip: offset,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      await this.prismaClient.visaProducts.count({ where: filters }),
    ];

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      page,
      limit,
      totalPages,
      totalRecords,
      visas: data as Visa[],
    };
  }

  async getVisaById(id: number): Promise<GetVisaByIdResponse> {
    const uniqueVisa = await this.prismaClient.visaProducts.findUnique({
      where: { id },
    });

    if (!uniqueVisa) {
      throw new NotFoundException(`Visa product with id: ${id} does not exist`);
    }

    return {
      visa: uniqueVisa as Visa,
    };
  }

  async createVisa(visa: Visa): Promise<VisaOperationResponse> {
    const createdVisa = await this.prismaClient.visaProducts.create({
      data: visa,
    });

    return {
      message: 'New visa product created successfully.',
      visa: createdVisa as Visa,
    };
  }

  async updateVisaById(
    id: number,
    visa: UpdateVisaDto
  ): Promise<VisaOperationResponse> {
    const updatedVisa = await this.prismaClient.visaProducts.update({
      where: { id },
      data: visa,
    });

    return {
      message: `Visa product with id: ${id} updated successfully.`,
      visa: updatedVisa as Visa,
    };
  }
}
