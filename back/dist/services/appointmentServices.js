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
exports.cancelStatusAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = exports.registerAppointmentService = void 0;
const IAppointment_1 = require("../interface/IAppointment");
const userServices_1 = require("./userServices");
const Appointment_repository_1 = require("../Repositories/Appointment.repository");
const registerAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userServices_1.getUserByIdService)(appointment.userId.toString());
    Appointment_repository_1.AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
    yield Appointment_repository_1.AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = Appointment_repository_1.AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    });
    return yield Appointment_repository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield Appointment_repository_1.AppointmentRepository.find();
    if (appointments.length === 0)
        throw new Error("No se encontraron citas");
    return appointments;
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_repository_1.AppointmentRepository.findOne({
        where: {
            id
        }
    });
    if (!appointmentFound)
        throw new Error(`El turno ${id} no fue encontrado`);
    else
        return appointmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const cancelStatusAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_repository_1.AppointmentRepository.findOne({
        where: {
            id
        }
    });
    if (!appointmentFound)
        throw new Error(`El turno ${id} no fue encontrado`);
    appointmentFound.status = IAppointment_1.Status.Cancelled;
    return yield Appointment_repository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelStatusAppointmentService = cancelStatusAppointmentService;
