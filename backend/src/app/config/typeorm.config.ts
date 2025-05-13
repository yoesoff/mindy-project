import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ApaPropertyEntity } from '../../entity/apa_property.entity';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService): DataSourceOptions => {
    const dbType = configService.get<string>('DB_TYPE') as any;
    const password = configService.get<string>('DB_PASSWORD') || '';

    const baseConfig = {
      type: dbType,
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
      username: configService.get('DB_USERNAME'),
      password,
      database: configService.get('DB_NAME'),
      entities: [ApaPropertyEntity],
      synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      logging: true,
    };

    if (dbType === 'aurora-mysql') {
      return {
        ...baseConfig,
        region: configService.get<string>('DB_REGION'),
        secretArn: configService.get<string>('DB_SECRET_ARN'),
        resourceArn: configService.get<string>('DB_RESOURCE_ARN'),
      };
    }

    return baseConfig;
  },
  inject: [ConfigService],
});
