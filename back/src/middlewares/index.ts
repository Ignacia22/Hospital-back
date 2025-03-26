import { NextFunction, Request, Response } from "express";


export const validateUserRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, birthdate, nDni, username, password} = req.body;

    if(!name || !email || !birthdate || !nDni || !username || !password) 
 {
        res.status(400).json({ message: `Faltan datos en el registro de usuario` });
    } else{
        next();
    }
};

export const validateAppointmentData = (req: Request, res: Response, next: NextFunction): void => {
    const {date, time, userId} = req.body


    if(!date || !time || !userId) {
        res.status(400).json({ message: `Faltan datos en el registro de turno` });
    } else{
        next();
    }
}