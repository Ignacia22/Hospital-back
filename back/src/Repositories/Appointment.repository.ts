import moment from 'moment';
import { AppDataSource } from "../config/data.source";
import { Appointment } from "../entities/Appointment.entity";



export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const appointmentDateTime = moment(
      `${moment(date).format('YYYY-MM-DD')} ${time}`,
      'YYYY-MM-DD HH:mm'
    );

    const now = moment();

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
    const startHour = moment(
      `${moment(date).format('YYYY-MM-DD')} 09:00`,
      'YYYY-MM-DD HH:mm'
    );
    const endHour = moment(
      `${moment(date).format('YYYY-MM-DD')} 18:00`,
      'YYYY-MM-DD HH:mm'
    );

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



  validateExistingAppointment: async function(userId: number, date: Date, time: string): Promise<void> {
    const appointmentFound = await this.findOne({
        where: {
            user: {
                id: userId
            },
            date: date,
            time: time,
        }
    })


    if(appointmentFound) throw new Error(`La cita con fecha: ${date}, y con hora ${time}, para el usuario con id: ${userId}, ya existe`)
  }
});

