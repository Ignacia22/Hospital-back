/* eslint-disable @typescript-eslint/prefer-as-const */
import "dotenv/config";

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const DB_TYPE: "postgres" = "postgres";
export const DB_HOST: string | undefined = process.env.PGHOST;
export const DB_PORT: number | undefined = process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432;
export const DB_USERNAME: string | undefined = process.env.PGUSER;
export const DB_PASSWORD: string | undefined = process.env.PGPASSWORD;
export const DB_DATABASE: string | undefined = process.env.PGDATABASE;

export const DB_SYNC: boolean = process.env.DB_SYNC ? process.env.DB_SYNC === "true" : true;
export const DB_LOGGING: boolean = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true" : true;
export const DB_ENTITIES: string[] = process.env.DB_ENTITIES
  ? process.env.DB_ENTITIES.split(",")
  : [__dirname + "/../entities/**/*.{ts,js}"];

export const DB_DROP: boolean = process.env.DB_DROP ? process.env.DB_DROP === "true" : false;
