import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApaPropertyEntity } from '../../../entity/apa_property.entity';
import { PaginationQueryDto } from '../../dto/pagination-query.dto';

@Injectable()
export class ApaPropertyService {
  constructor(
    @InjectRepository(ApaPropertyEntity)
    private propertyRepository: Repository<ApaPropertyEntity>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const page = Number(paginationQuery.page) || 1;
    const limit = Number(paginationQuery.limit) || 9;

    const [data, total] = await this.propertyRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }


  async findOne(propertyId: number): Promise<ApaPropertyEntity> {
    const property = await this.propertyRepository.findOne({ where: { propertyId } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }
    return property;
  }
}
