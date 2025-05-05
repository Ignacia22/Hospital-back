"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUsersController = exports.getUserByIdController = exports.getUsersController = void 0;
const userServices_1 = require("../services/userServices");
// Controlador para obtener todos los usuarios
const getUsersController = async (req, res) => {
    try {
        const response = await (0, userServices_1.getUsersService)(); // Llamada al servicio para obtener usuarios
        res.status(200).json({ message: "Obtener el listado de usuarios", response });
    }
    catch (error) {
        res.status(400).json({ message: `ERROR: ${error}` });
    }
};
exports.getUsersController = getUsersController;
// Controlador para obtener un usuario por su ID
const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await (0, userServices_1.getUserByIdService)(id); // Llamada al servicio para obtener el usuario por ID
        res.status(200).json({ message: "Obtener usuario por ID" + id, response });
    }
    catch (error) {
        res.status(404).json({
            message: "Error en el servidor",
            data: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};
exports.getUserByIdController = getUserByIdController;
// Controlador para registro de usuarios
const registerUsersController = async (req, res) => {
    try {
        await (0, userServices_1.registerUsersService)(req.body);
        res.status(201).json({ message: "Usuario creado" });
    }
    catch (error) {
        const postgresError = error;
        res.status(400).json({
            message: `ERROR: ${error}`,
            data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail : postgresError.message : "error"
        });
    }
};
exports.registerUsersController = registerUsersController;
// Controlador para login (por implementar en el servicio)
const loginUserController = async (req, res) => {
    try {
        const response = await (0, userServices_1.loginUsersServices)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Error desconocido"
        });
    }
};
exports.loginUserController = loginUserController;
