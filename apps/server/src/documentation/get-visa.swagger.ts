import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VisaDto } from '../modules/visa/dto/visa.dto';
import { MOCK_VISAS } from '../modules/visa/mocks/visa-mocks';

export const ApiGetVisasDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all visa products' }),
    ApiQuery({
      name: 'country',
      type: String,
      required: false,
      example: 'USA',
    }),
    ApiQuery({
      name: 'visaType',
      enum: ['Tourist', 'Business', 'Student', 'Work'],
      required: false,
      example: 'Tourist',
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'Returns a list of visa products',
      type: VisaDto,
      isArray: true,
      examples: {
        'Returns a list of all visa products': {
          value: {
            page: 1,
            limit: 3,
            totalPages: 1,
            totalRecords: 3,
            visas: MOCK_VISAS,
          },
          summary: 'All visa products',
        },
        'Filtered by country': {
          value: MOCK_VISAS.filter((visa) => visa.country === 'USA'),
          summary: 'Filtered by country',
        },
        'Filtered by visa type': {
          value: MOCK_VISAS.filter((visa) => visa.visaType === 'Business'),
          summary: 'Filtered by visa type',
        },
        'Filtered by country and visa type': {
          value: MOCK_VISAS.filter(
            (visa) => visa.country === 'USA' && visa.visaType === 'Tourist'
          ),
          summary: 'Filtered by country and visa type',
        },
        Paginated: {
          value: {
            page: 3,
            limit: 4,
            totalPages: 14,
            totalRecords: 54,
            visas: [
              {
                id: 9,
                country: 'UK',
                visaType: 'Student',
                priceUSD: 450,
                lengthOfStay: 1095,
                numberOfEntries: 'Multiple',
                filingFeeUSD: 55,
              },
              {
                id: 10,
                country: 'France',
                visaType: 'Schengen',
                priceUSD: 80,
                lengthOfStay: 90,
                numberOfEntries: 'Single',
                filingFeeUSD: 10,
              },
              {
                id: 11,
                country: 'Germany',
                visaType: 'Schengen',
                priceUSD: 90,
                lengthOfStay: 90,
                numberOfEntries: 'Multiple',
                filingFeeUSD: 12,
              },
              {
                id: 12,
                country: 'Italy',
                visaType: 'Schengen',
                priceUSD: 85,
                lengthOfStay: 90,
                numberOfEntries: 'Single',
                filingFeeUSD: 11,
              },
            ],
          },
          summary: 'Paginated response',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      examples: {
        'Invalid visa type': {
          value: {
            error: true,
            statusCode: 400,
            errorDetails: {
              message: [
                'visaType must be one of the following values: Business, Tourist, Schengen, Student',
              ],
              error: 'Bad Request',
            },
          },
          summary: 'Invalid visa type',
        },
        'Invalid query parameters': {
          value: {
            error: true,
            statusCode: 400,
            errorDetails: {
              message: [
                'page must not be less than 1',
                'page must be an integer number',
              ],
              error: 'Bad Request',
            },
          },
          summary: 'Invalid page number',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    })
  );
};
