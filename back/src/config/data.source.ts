import {DataSource, Repository} from "typeorm";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { DB_ENTITIES, DB_SYNC, DB_LOGGING, DB_DROP } from "./envs";

// Usar URL de conexión directamente
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/modulo_3';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    synchronize: DB_SYNC,
    logging: DB_LOGGING,
    entities: DB_ENTITIES,
    dropSchema: DB_DROP,
    ssl: {
        rejectUnauthorized: false
    }
});

export const UserModel: Repository<User> = AppDataSource.getRepository(User)
export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)