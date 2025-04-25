import { PORT } from "./config/envs.js"; // Añade .js
import server from "./server.js"; // Añade .js
import "reflect-metadata";
import { AppDataSource } from "./config/data.source.js"; // Añade .js

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful");
    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });