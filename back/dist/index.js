"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data.source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connection successful");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor corriendo en el puerto ${envs_1.PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
