import { Test, TestingModule } from '@nestjs/testing';
import { VisaService } from '../visa.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { EntryType, VisaType } from '../types/enums';
import { Visa } from '../types/visa';
import { UpdateVisaDto } from '../dto/update-visa.dto';
import { MOCK_VISAS } from '../mocks/visa-mocks';
import { VisaFiltersDto } from '../dto/filter-visas.dto';

describe('VisaService', () => {
  let service: VisaService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    visaProducts: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisaService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VisaService>(VisaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getVisaById', () => {
    it('should return a visa when valid id is provided', async () => {
      const mockVisa = { id: 1, country: 'USA', visaType: VisaType.TOURIST };
      mockPrismaService.visaProducts.findUnique.mockResolvedValue(mockVisa);

      const result = await service.getVisaById(1);

      expect(result).toEqual({ visa: mockVisa });
      expect(prismaService.visaProducts.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when visa is not found', async () => {
      mockPrismaService.visaProducts.findUnique.mockResolvedValue(null);

      await expect(service.getVisaById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getVisas', () => {
    it('should return paginated visas with filters', async () => {
      const filters: VisaFiltersDto = {
        country: 'USA',
        visaType: VisaType.TOURIST,
        page: 1,
        limit: 10,
      };

      mockPrismaService.visaProducts.findMany.mockResolvedValue(MOCK_VISAS);
      mockPrismaService.visaProducts.count.mockResolvedValue(2);

      const result = await service.getVisas(filters);

      expect(result).toEqual({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalRecords: 2,
        visas: MOCK_VISAS,
      });
    });
  });

  describe('createVisa', () => {
    it('should create a new visa', async () => {
      mockPrismaService.visaProducts.create.mockResolvedValue({
        id: 1,
        ...MOCK_VISAS[0],
      });

      const result = await service.createVisa(MOCK_VISAS[0]);

      expect(result).toEqual({
        message: 'New visa product created successfully.',
        visa: { id: 1, ...MOCK_VISAS[0] },
      });
      expect(prismaService.visaProducts.create).toHaveBeenCalledWith({
        data: MOCK_VISAS[0],
      });
    });
  });

  describe('updateVisaById', () => {
    it('should update an existing visa', async () => {
      const mockVisa: UpdateVisaDto = {
        country: 'USA',
        visaType: VisaType.BUSINESS,
      };
      mockPrismaService.visaProducts.update.mockResolvedValue({
        id: 1,
        ...mockVisa,
      });

      const result = await service.updateVisaById(1, mockVisa);

      expect(result).toEqual({
        message: 'Visa product with id: 1 updated successfully.',
        visa: { id: 1, ...mockVisa },
      });
      expect(prismaService.visaProducts.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockVisa,
      });
    });
  });
});
