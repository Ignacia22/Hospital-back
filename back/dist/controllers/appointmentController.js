"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppointmentController = exports.registerAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, appointmentServices_1.getAppointmentsService)(); // Llamada al servicio para obtener turnos
        res.status(200).json({ message: "Obtener el listado de usuarios", response });
    }
    catch (error) {
        res.status(404).json({
            message: "Error en el servicio",
            data: error instanceof Error ? error.message : "Error desconocido"
        });
        console.log(error);
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, appointmentServices_1.getAppointmentByIdService)(id); // Llamada al servicio para obtener el turno por ID
        res.status(200).json({ message: "Obtener turno por ID" + id, response });
    }
    catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const registerAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, appointmentServices_1.registerAppointmentService)(req.body); // Llamada al servicio para obtener el turno por ID
        res.status(201).json({ message: "Cita creada con exito", response });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err instanceof Error ? err.detail ? err.detail : err.message : 'Error desconocido'
        });
    }
});
exports.registerAppointmentController = registerAppointmentController;
const cancelStatusAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, appointmentServices_1.cancelStatusAppointmentService)(id); // Llamada al servicio para obtener el turno por ID
        res.status(200).json({ message: "Se cancela el turno", response });
    }
    catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
});
exports.cancelStatusAppointmentController = cancelStatusAppointmentController;
