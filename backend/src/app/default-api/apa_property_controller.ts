import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { ApaPropertyService } from './apa-property.service';

@Controller('properties')
export class ApaPropertyController {
  constructor(private readonly propertyService: ApaPropertyService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.propertyService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }
}
