import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { Status } from "../interface/IAppointment";
import { getUserByIdService } from "./userServices";
import { AppointmentRepository } from "../Repositories/Appointment.repository";
import { Appointment } from "../entities/Appointment.entity";




export const registerAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<Appointment> => {

    await getUserByIdService(appointment.userId.toString());

    AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time)
    await AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time)

    const newAppointment =AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: {id: appointment.userId},

    })

    return await AppointmentRepository.save(newAppointment);

};


export const getAppointmentsService = async(): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find()
    if(appointments.length === 0) throw new Error("No se encontraron citas")
        return appointments
};


export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {

    const appointmentFound =await AppointmentRepository.findOne({
        where: {
            id
        }
    })

    if (!appointmentFound) throw new Error(`El turno ${id} no fue encontrado`);
    else return appointmentFound;
};


export const cancelStatusAppointmentService = async (id: number): Promise<Appointment> => {

    const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id
        }
    })


    if (!appointmentFound) throw new Error(`El turno ${id} no fue encontrado`);
        appointmentFound.status = Status.Cancelled;
    return await AppointmentRepository.save(appointmentFound)
};



