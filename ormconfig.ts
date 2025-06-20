import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Contact } from "./entities/contact/Contact";
import * as dotenv from "dotenv";
dotenv.config();

config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: String(process.env.DATABASE_NAME),
  entities: [Contact],
  synchronize: true,
});
