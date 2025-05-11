import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ApaPropertyEntity } from '../../entity/apa_property.entity';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [ApaPropertyEntity],
    synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    logging: true,
  }),
  inject: [ConfigService],
});
