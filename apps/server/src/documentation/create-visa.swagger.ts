import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VisaDto } from '../modules/visa/dto/visa.dto';

export const ApiCreateVisaDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new visa product' }),
    ApiBody({
      type: VisaDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Returns the created visa product',
      example: {
        message: 'New visa product created successfully.',
        visa: {
          id: 78,
          country: 'Greece',
          visaType: 'Business',
          priceUSD: 100,
          lengthOfStay: 10,
          numberOfEntries: 'Single',
          filingFeeUSD: 20,
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      examples: {
        'Invalid request body': {
          value: {
            error: true,
            statusCode: 400,
            errorDetails: {
              message: [
                'country should not be empty',
                'country must be a string',
              ],
              error: 'Bad Request',
            },
          },
          summary: 'Invalid request body',
        },
        'Unique constraint violation': {
          value: {
            error: true,
            statusCode: 400,
            errorDetails: {
              message:
                '\nInvalid `prisma.visaProducts.create()` invocation:\n\n\nUnique constraint failed on the fields: (`country`,`visaType`)',
            },
          },
          summary: 'Unique constraint violation',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    })
  );
};
