import {PORT} from "./config/envs";
import server from "./server";

import "reflect-metadata";
import { AppDataSource } from "./config/data.source";

const MAX_RETRIES = 5;
let retries = 0;

function connectToDB() {
  console.log("Attempting to connect to database...");
  console.log(`Connection details: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
  
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connection successful");
      
      server.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
      });
    })
    .catch((err: Error) => {
      console.log("Database connection error:", err);
      
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Retry ${retries}/${MAX_RETRIES} in 5 seconds...`);
        setTimeout(connectToDB, 5000);
      } else {
        console.log("Max retries reached. Starting server without database connection.");
        // Iniciar el servidor de todos modos para poder ver los logs
        server.listen(PORT, () => {
          console.log(`Servidor corriendo en el puerto ${PORT} (sin conexión a la base de datos)`);
        });
      }
    });
}

connectToDB();