// En server.ts
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

const server = express();

server.use(express.json());
server.use(morgan("dev"));

// Configurar CORS para permitir solicitudes desde cualquier origen en este caso
server.use(cors({
  origin: '*', // Esto permite solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Alternativamente, si quieres ser más específico:
/*
server.use(cors({
  origin: ['https://tu-frontend-en-vercel.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
*/

server.use(router);

export default server;