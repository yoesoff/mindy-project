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

  async findAll(paginationQuery: PaginationQueryDto): Promise<ApaPropertyEntity[]> {
    const { limit, offset } = paginationQuery;
    return await this.propertyRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(propertyId: number): Promise<ApaPropertyEntity> {
    const property = await this.propertyRepository.findOne({ where: { propertyId } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }
    return property;
  }
}
