import { Module } from '@nestjs/common';
import { DefaultApiService } from './default-api.service';
import { DefaultApiController } from './default-api.controller';
import { ApaPropertyController } from './apa_property_controller';
import { ApaPropertyService } from './apa-property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApaPropertyEntity } from '../../entity/apa_property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApaPropertyEntity]), // Register the entity here
  ],
  controllers: [
    DefaultApiController,
    ApaPropertyController,
  ],
  providers: [DefaultApiService, ApaPropertyService],
})
export class DefaultApiModule {}
