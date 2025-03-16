import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { UpdateVisaDto } from '../modules/visa/dto/update-visa.dto';

export const ApiUpdateVisaByIdDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a visa product by ID' }),
    ApiParam({
      name: 'id',
      type: Number,
      required: true,
      example: 1,
    }),
    ApiBody({
      type: UpdateVisaDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Returns the updated visa product',
      example: {
        message: 'Visa product with id: 13 updated successfully.',
        visa: {
          id: 13,
          country: 'Greece',
          visaType: 'Tourist',
          priceUSD: 100,
          lengthOfStay: 10,
          numberOfEntries: 'Single',
          filingFeeUSD: 20,
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
          message: 'Record to update not found.',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Unique constraint violation',
      example: {
        error: true,
        statusCode: 400,
        errorDetails: {
          message:
            '\nInvalid `prisma.visaProducts.update()` invocation:\n\n\nUnique constraint failed on the fields: (`country`,`visaType`)',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    })
  );
};
