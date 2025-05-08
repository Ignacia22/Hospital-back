/* eslint-disable @typescript-eslint/prefer-as-const */

// No importar dotenv en producción
// import "dotenv/config";

// Usar directamente las variables de entorno del sistema
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const DB_TYPE: "postgres" = "postgres";
export const DB_HOST: string = process.env.DB_HOST || 'localhost';
export const DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10): 5432;
export const DB_USERNAME: string = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || 'postgres';
export const DB_DATABASE: string = process.env.DB_DATABASE || 'modulo_3';
export const DB_SYNC: boolean = process.env.DB_SYNC ? process.env.DB_SYNC === "true": true;
export const DB_LOGGING: boolean = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true": true;
export const DB_ENTITIES: string[] = process.env.DB_ENTITIES ? process.env.DB_ENTITIES.split(","): ["dist/entities/**/*.js"];
export const DB_DROP: boolean = process.env.DB_DROP ? process.env.DB_DROP === "true": false;