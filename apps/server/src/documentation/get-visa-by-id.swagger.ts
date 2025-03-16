import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { VisaDto } from '../modules/visa/dto/visa.dto';

export const ApiGetVisaByIdDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a visa product by ID' }),
    ApiParam({
      name: 'id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'Returns a visa product',
      type: VisaDto,
      example: {
        visa: {
          id: 13,
          country: 'Spain',
          visaType: 'Schengen',
          priceUSD: 88,
          lengthOfStay: 90,
          numberOfEntries: 'Multiple',
          filingFeeUSD: 13,
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid ID',
      example: {
        error: true,
        statusCode: 400,
        errorDetails: {
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Visa product not found',
      example: {
        error: true,
        statusCode: 404,
        errorDetails: {
          message: 'Resource not found',
          error: 'Visa product with id: 1300 does not exist',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    })
  );
};
