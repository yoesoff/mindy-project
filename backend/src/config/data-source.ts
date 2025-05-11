import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "propertydb",
  synchronize: true, // Set to false in production
  logging: false,
  entities: ["src/entity/**/*.ts"], // Adjust path to your entities
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

export default AppDataSource;
