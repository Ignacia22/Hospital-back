"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const moment_1 = __importDefault(require("moment"));
const data_source_1 = require("../config/data.source");
const Appointment_entity_1 = require("../entities/Appointment.entity");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const appointmentDateTime = (0, moment_1.default)(`${(0, moment_1.default)(date).format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HH:mm');
        const now = (0, moment_1.default)();
        // Validar que la fecha de la cita no sea en el pasado
        if (appointmentDateTime.isBefore(now, 'minute')) {
            throw new Error('No se pueden agendar citas en fechas o horas pasadas.');
        }
        const [hour, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date).setUTCHours(hour, minutes, 0, 0);
        const dateArg = new Date(appointmentDate);
        const dateNowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        const milliseconds = dateArg.getTime() - dateNowArg.getTime();
        const hours = milliseconds / (60 * 60 * 1000);
        if (hours < 24) {
            throw new Error("No se puede reservar sin 24 horas de antelación");
        }
        // // Validar que la fecha de la cita no sea con más de 24 horas de anticipación
        // const maxDateTime = moment().add(24, 'hours'); // Crear un nuevo momento para el límite máximo
        // if (appointmentDateTime.isAfter(maxDateTime, 'minute')) {
        //   throw new Error('No se pueden agendar citas con más de 24 horas de anticipación.');
        // }
        // Define el horario permitido
        const startHour = (0, moment_1.default)(`${(0, moment_1.default)(date).format('YYYY-MM-DD')} 09:00`, 'YYYY-MM-DD HH:mm');
        const endHour = (0, moment_1.default)(`${(0, moment_1.default)(date).format('YYYY-MM-DD')} 18:00`, 'YYYY-MM-DD HH:mm');
        // Validar si es fin de semana
        if (appointmentDateTime.isoWeekday() > 5) {
            throw new Error('No se pueden agendar citas los fines de semana.');
        }
        // Validar si la hora está dentro del rango permitido
        if (!appointmentDateTime.isBetween(startHour, endHour, 'minute', '[)')) {
            throw new Error('La cita debe estar entre las 09:00 y las 18:00.');
        }
        console.log('Cita válida:', appointmentDateTime.format('LLLL'));
    },
    validateExistingAppointment: async function (userId, date, time) {
        const appointmentFound = await this.findOne({
            where: {
                user: {
                    id: userId
                },
                date: date,
                time: time,
            }
        });
        if (appointmentFound)
            throw new Error(`La cita con fecha: ${date}, y con hora ${time}, para el usuario con id: ${userId}, ya existe`);
    }
});
