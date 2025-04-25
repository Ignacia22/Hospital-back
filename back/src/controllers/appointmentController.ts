import {Request, Response} from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppointmentsService, registerAppointmentService } from "../services/appointmentServices";
import { PostgresError } from "../interface/IError";

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {

    try {
        const response = await getAppointmentsService();  // Llamada al servicio para obtener turnos
        res.status(200).json({message: "Obtener el listado de usuarios", response});
    } catch (error) {
        res.status(404).json({ 
            message: "Error en el servicio",
            data: error instanceof Error ? error.message: "Error desconocido" 
        });
        console.log(error);
    }
};

export const getAppointmentByIdController = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
    const { id } = req.params;
    try{
        const response = await getAppointmentByIdService(id);  // Llamada al servicio para obtener el turno por ID
        res.status(200).json({message: "Obtener turno por ID" +id, response});
    } catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
};

export const registerAppointmentController = async(req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {

    try {
        const response = await registerAppointmentService(req.body);  // Llamada al servicio para obtener el turno por ID
        res.status(201).json({message: "Cita creada con exito", response});
    } catch (error) {
        const err = error as PostgresError
        res.status(400).json({ 
            message:err instanceof Error ? err.detail ? err.detail: err.message: 'Error desconocido'
        });
    }

};



export const cancelStatusAppointmentController = async (req: Request<{ id: number }>, res: Response): Promise<void> => {


    const { id } = req.params;

    try {
        const response = await cancelStatusAppointmentService(id);  // Llamada al servicio para obtener el turno por ID
        res.status(200).json({message: "Se cancela el turno", response});
    } catch (error) {
        res.status(404).json({ message: `Error en el servicio: ${error}` });
    }
};

