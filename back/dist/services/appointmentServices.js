"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = exports.registerAppointmentService = void 0;
const IAppointment_1 = require("../interface/IAppointment");
const userServices_1 = require("./userServices");
const Appointment_repository_1 = require("../repositories/Appointment.repository");
const registerAppointmentService = async (appointment) => {
    await (0, userServices_1.getUserByIdService)(appointment.userId.toString());
    Appointment_repository_1.AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
    await Appointment_repository_1.AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = Appointment_repository_1.AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    });
    return await Appointment_repository_1.AppointmentRepository.save(newAppointment);
};
exports.registerAppointmentService = registerAppointmentService;
const getAppointmentsService = async () => {
    const appointments = await Appointment_repository_1.AppointmentRepository.find();
    if (appointments.length === 0)
        throw new Error("No se encontraron citas");
    return appointments;
};
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentByIdService = async (id) => {
    const appointmentFound = await Appointment_repository_1.AppointmentRepository.findOne({
        where: {
            id
        }
    });
    if (!appointmentFound)
        throw new Error(`El turno ${id} no fue encontrado`);
    else
        return appointmentFound;
};
exports.getAppointmentByIdService = getAppointmentByIdService;
const cancelStatusAppointmentService = async (id) => {
    const appointmentFound = await Appointment_repository_1.AppointmentRepository.findOne({
        where: {
            id
        }
    });
    if (!appointmentFound)
        throw new Error(`El turno ${id} no fue encontrado`);
    appointmentFound.status = IAppointment_1.Status.Cancelled;
    return await Appointment_repository_1.AppointmentRepository.save(appointmentFound);
};
exports.cancelStatusAppointmentService = cancelStatusAppointmentService;
