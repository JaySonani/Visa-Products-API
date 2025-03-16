import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EntryType, VisaType } from '../types/enums';
import { Visa } from '../types/visa';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVisaDto implements Partial<Visa> {
  @ApiProperty({
    description: 'The country of the visa',
    example: 'USA',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: 'The type of visa: Business, Tourist, Schengen, Student',
    example: 'Tourist',
  })
  @IsOptional()
  @IsEnum(VisaType, {
    message: 'visaType must be one of: Business, Tourist, Schengen, Student',
  })
  visaType?: VisaType;

  @ApiProperty({
    description: 'The price of the visa in USD',
    example: 1000,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  priceUSD?: number;

  @ApiProperty({
    description: 'The length of stay of the visa in days',
    example: 30,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  lengthOfStay?: number;

  @ApiProperty({
    description: 'The number of entries of the visa: Single, Multiple',
    example: 'Single',
  })
  @IsOptional()
  @IsEnum(EntryType, {
    message: 'numberOfEntries must be one of: Single, Multiple',
  })
  numberOfEntries?: EntryType;

  @ApiProperty({
    description: 'The filing fee of the visa in USD',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  filingFeeUSD?: number;
}
