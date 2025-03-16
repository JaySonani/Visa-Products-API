import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UpdateVisaDto } from './dto/update-visa.dto';
import { VisaFiltersDto } from './dto/filter-visas.dto';
import { VisaService } from './visa.service';
import { VisaDto } from './dto/visa.dto';
import { Visa } from './types/visa';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetVisasDocs } from '../../documentation/get-visa.swagger';
import { ApiGetVisaByIdDocs } from '../../documentation/get-visa-by-id.swagger';
import { ApiCreateVisaDocs } from '../../documentation/create-visa.swagger';
import { ApiUpdateVisaByIdDocs } from '../../documentation/update-visa-by-id.swagger';

@ApiTags('Visa')
@Controller('visa')
export class VisaController {
  constructor(private readonly visaService: VisaService) {}

  // Browse all visa products (with pagination and filtering)
  @Get()
  @ApiGetVisasDocs()
  getVisas(@Query() visaFilters?: VisaFiltersDto) {
    return this.visaService.getVisas(visaFilters);
  }

  @Get(':id')
  @ApiGetVisaByIdDocs()
  getUniqueVisa(@Param('id', ParseIntPipe) id: number) {
    return this.visaService.getVisaById(id);
  }

  // Create new products
  @Post()
  @ApiCreateVisaDocs()
  createVisa(@Body() visa: VisaDto) {
    return this.visaService.createVisa(visa as Visa);
  }

  // Edit product information
  @Put(':id')
  @ApiUpdateVisaByIdDocs()
  updateVisa(
    @Param('id', ParseIntPipe) id: number,
    @Body() visa: UpdateVisaDto
  ) {
    return this.visaService.updateVisaById(id, visa);
  }
}
