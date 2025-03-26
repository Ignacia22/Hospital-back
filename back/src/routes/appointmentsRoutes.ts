import {NextFunction, Request,Response, Router} from "express";
import { getAppointmentByIdController, getAppointmentsController, registerAppointmentController, cancelStatusAppointmentController } from "../controllers/appointmentController";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { validateAppointmentData } from "../middlewares";


const appointmentRoutes: Router = Router();

appointmentRoutes.get("/",(req: Request, res: Response) => getAppointmentsController(req, res));

appointmentRoutes.get("/:id",(req: Request<{id: number}>, res: Response) => getAppointmentByIdController(req, res));

appointmentRoutes.post("/schedule",
    (req: Request, res: Response, next: NextFunction) => validateAppointmentData(req, res, next),
    (req: Request <unknown, unknown, AppointmentRegisterDTO>, res: Response) => registerAppointmentController(req, res));

appointmentRoutes.put("/cancel/:id",(req: Request <{id: number}>, res: Response) => cancelStatusAppointmentController(req, res));

export default appointmentRoutes;