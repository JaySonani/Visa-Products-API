import { Test, TestingModule } from '@nestjs/testing';
import { VisaController } from '../visa.controller';
import { VisaService } from '../visa.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { EntryType, VisaType } from '../types/enums';
import { VisaDto } from '../dto/visa.dto';
import { VisaFiltersDto } from '../dto/filter-visas.dto';
import { UpdateVisaDto } from '../dto/update-visa.dto';

describe('Visa Input Validation', () => {
  let controller: VisaController;

  const mockVisaService = {
    getVisas: jest.fn(),
    getVisaById: jest.fn(),
    createVisa: jest.fn(),
    updateVisaById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaController],
      providers: [
        {
          provide: VisaService,
          useValue: mockVisaService,
        },
      ],
    }).compile();

    controller = module.get<VisaController>(VisaController);
  });

  describe('GET /visa - Filter Validation', () => {
    const validationPipe = new ValidationPipe();
    it('should reject invalid visa type in filters', async () => {
      const invalidFilters = {
        visaType: 'INVALID_TYPE',
        page: 1,
        limit: 10,
      };

      await expect(
        validationPipe.transform(invalidFilters, {
          metatype: VisaFiltersDto,
          type: 'query',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject negative page number', async () => {
      const invalidFilters = {
        page: -1,
        limit: 10,
      };

      await expect(
        validationPipe.transform(invalidFilters, {
          metatype: VisaFiltersDto,
          type: 'query',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject negative limit', async () => {
      const invalidFilters = {
        page: 1,
        limit: -10,
      };

      await expect(
        validationPipe.transform(invalidFilters, {
          metatype: VisaFiltersDto,
          type: 'query',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('POST /visa - Create Visa Validation', () => {
    const validationPipe = new ValidationPipe();

    it('should reject missing required fields', async () => {
      const incompleteVisa = {
        country: 'USA',
      };

      await expect(
        validationPipe.transform(incompleteVisa, {
          metatype: VisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid visa type', async () => {
      const invalidVisa = {
        country: 'USA',
        visaType: 'INVALID_TYPE' as VisaType,
        priceUSD: 1000,
        lengthOfStay: 30,
        numberOfEntries: EntryType.SINGLE,
        filingFeeUSD: 100,
      };

      await expect(
        validationPipe.transform(invalidVisa, {
          metatype: VisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid entry type', async () => {
      const invalidVisa = {
        country: 'USA',
        visaType: VisaType.TOURIST,
        priceUSD: 1000,
        lengthOfStay: 30,
        numberOfEntries: 'INVALID_ENTRY' as EntryType,
        filingFeeUSD: 100,
      };

      await expect(
        validationPipe.transform(invalidVisa, {
          metatype: VisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject negative numbers', async () => {
      const invalidVisa = {
        country: 'USA',
        visaType: VisaType.TOURIST,
        priceUSD: -1000,
        lengthOfStay: -30,
        numberOfEntries: EntryType.SINGLE,
        filingFeeUSD: -100,
      };

      await expect(
        validationPipe.transform(invalidVisa, {
          metatype: VisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('PUT /visa/:id - Update Visa Validation', () => {
    const validationPipe = new ValidationPipe();

    it('should reject invalid visa type in update', async () => {
      const invalidUpdate = {
        visaType: 'INVALID_TYPE' as VisaType,
      };

      await expect(
        validationPipe.transform(invalidUpdate, {
          metatype: UpdateVisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid entry type in update', async () => {
      const invalidUpdate = {
        numberOfEntries: 'INVALID_ENTRY' as EntryType,
      };

      await expect(
        validationPipe.transform(invalidUpdate, {
          metatype: UpdateVisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject negative numbers in update', async () => {
      const invalidUpdate = {
        priceUSD: -1000,
        lengthOfStay: -30,
        filingFeeUSD: -100,
      };

      await expect(
        validationPipe.transform(invalidUpdate, {
          metatype: UpdateVisaDto,
          type: 'body',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });
});
