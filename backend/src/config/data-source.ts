import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

export default AppDataSource;
