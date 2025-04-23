import {DataSource, Repository} from "typeorm";
import { DB_DATABASE, DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";


export const AppDataSource = new DataSource(
    process.env.DATABASE_URL
      ? {
          type: "postgres",
          url: process.env.DATABASE_URL,
          synchronize: DB_SYNC,
          logging: DB_LOGGING,
          entities: DB_ENTITIES,
          dropSchema: DB_DROP,
        }
      : {
          type: DB_TYPE,
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          synchronize: DB_SYNC,
          logging: DB_LOGGING,
          entities: DB_ENTITIES,
          dropSchema: DB_DROP,
        }
  );
  


export const UserModel: Repository<User> = AppDataSource.getRepository(User)
export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)