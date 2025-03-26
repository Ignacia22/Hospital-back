import {PORT} from "./config/envs";
import server from "./server";

import "reflect-metadata";
import { AppDataSource } from "./config/data.source";

AppDataSource.initialize()
   .then(() => {

    console.log("Database connection successful");
    


    server.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
   })

   .catch((err) => {
    console.log(err);
   })

