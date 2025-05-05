"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppointmentController = exports.registerAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getAppointmentsController = async (req, res) => {
    try {
        const response = await (0, appointmentServices_1.getAppointmentsService)(); // Llamada al servicio para obtener turnos
        res.status(200).json({ message: "Obtener el listado de usuarios", response });
    }
    catch (error) {
        res.status(404).json({
            message: "Error en el servicio",
            data: error instanceof Error ? error.message : "Error desconocido"
        });
        console.log(error);
    }
};
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await (0, appointmentServices_1.getAppointmentByIdService)(id); // Llamada al servicio para obtener el turno por ID
        res.status(200).json({ message: "Obtener turno por ID" + id, response });
    }
    catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
};
exports.getAppointmentByIdController = getAppointmentByIdController;
const registerAppointmentController = async (req, res) => {
    try {
        const response = await (0, appointmentServices_1.registerAppointmentService)(req.body); // Llamada al servicio para obtener el turno por ID
        res.status(201).json({ message: "Cita creada con exito", response });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err instanceof Error ? err.detail ? err.detail : err.message : 'Error desconocido'
        });
    }
};
exports.registerAppointmentController = registerAppointmentController;
const cancelStatusAppointmentController = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await (0, appointmentServices_1.cancelStatusAppointmentService)(id); // Llamada al servicio para obtener el turno por ID
        res.status(200).json({ message: "Se cancela el turno", response });
    }
    catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
};
exports.cancelStatusAppointmentController = cancelStatusAppointmentController;
