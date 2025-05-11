import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../dto/pagination-query.dto';
import { ApaPropertyService } from './apa-property.service';

@Controller('properties')
export class ApaPropertyController {
  constructor(private readonly propertyService: ApaPropertyService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 9; // atau default limit yang kamu mau

    const { data, total } = await this.propertyService.findAll({ page, limit });

    return {
      data,
      total,
      page,
      limit,
    };
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }
}
