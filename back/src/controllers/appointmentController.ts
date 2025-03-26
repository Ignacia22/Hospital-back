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

export const registerAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
    try {
      const response = await registerAppointmentService(req.body);
      res.status(201).json({ message: "Cita creada con éxito", response });
    } catch (error: unknown) {
      const err = error as PostgresError; // Usamos tu interfaz PostgresError
      if (err.code === '23505') { // Violación de unicidad (por ejemplo, horario ya ocupado)
        const detail = err.detail || "Error de unicidad";
        res.status(409).json({
          message: "Conflicto con los datos proporcionados",
          detail: detail,
        });
      } else if (error instanceof Error) {
        // Maneja errores genéricos que no sean de base de datos
        res.status(400).json({
          message: "Error al crear la cita",
          detail: error.message || "Error desconocido",
        });
      } else {
        // Maneja errores desconocidos
        console.error("Error desconocido en registerAppointmentController:", error);
        res.status(400).json({
          message: "Error al crear la cita",
          detail: err.message || "Error desconocido",
        });
      }
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

