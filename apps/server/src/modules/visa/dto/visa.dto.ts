import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Visa } from '../types/visa';
import { EntryType, VisaType } from '../types/enums';
import { ApiProperty } from '@nestjs/swagger';

export class VisaDto implements Omit<Visa, 'id'> {
  @ApiProperty({
    description: 'The country of the visa',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The type of visa: Business, Tourist, Schengen, Student',
    example: 'Tourist',
  })
  @IsNotEmpty()
  @IsEnum(VisaType, {
    message: 'visaType must be one of: Business, Tourist, Schengen, Student',
  })
  visaType: VisaType;

  @ApiProperty({
    description: 'The price of the visa in USD',
    example: 1000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  priceUSD: number;

  @ApiProperty({
    description: 'The length of stay of the visa in days',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  lengthOfStay: number;

  @ApiProperty({
    description: 'The number of entries of the visa: Single, Multiple',
    example: 'Single',
  })
  @IsNotEmpty()
  @IsEnum(EntryType, {
    message: 'numberOfEntries must be one of: Single, Multiple',
  })
  numberOfEntries: EntryType;

  @ApiProperty({
    description: 'The filing fee of the visa in USD',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  filingFeeUSD: number;
}
