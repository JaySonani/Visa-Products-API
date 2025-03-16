import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VisaType } from '../types/enums';
import { VisaFilters } from '../types/visa-filters';

export class VisaFiltersDto implements VisaFilters {
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(VisaType)
  visaType?: VisaType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
