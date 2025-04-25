"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointmentData = exports.validateUserRegisterData = void 0;
const validateUserRegisterData = (req, res, next) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        res.status(400).json({ message: `Faltan datos en el registro de usuario` });
    }
    else {
        next();
    }
};
exports.validateUserRegisterData = validateUserRegisterData;
const validateAppointmentData = (req, res, next) => {
    const { date, time, userId } = req.body;
    if (!date || !time || !userId) {
        res.status(400).json({ message: `Faltan datos en el registro de turno` });
    }
    else {
        next();
    }
};
exports.validateAppointmentData = validateAppointmentData;
