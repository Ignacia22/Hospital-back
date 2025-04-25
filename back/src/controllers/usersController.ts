import { Request, Response } from "express";
import { UserLoginDTO, UserLoginSuccessDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { getUserByIdService, getUsersService, loginUsersServices, registerUsersService } from "../services/userServices";
import { PostgresError } from "../interface/IError";


// Controlador para obtener todos los usuarios
export const getUsersController = async (req: Request, res: Response):  Promise<void> => {
    try {
        const response = await getUsersService();  // Llamada al servicio para obtener usuarios
        res.status(200).json({message: "Obtener el listado de usuarios", response});
    } catch (error) {
        res.status(400).json({ message: `ERROR: ${error}` });
    }
};

// Controlador para obtener un usuario por su ID
export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const response = await getUserByIdService(id);  // Llamada al servicio para obtener el usuario por ID
        res.status(200).json({message: "Obtener usuario por ID" +id, response});
    } catch (error) {
        res.status(404).json({ 
            message: "Error en el servidor",
            data: error instanceof Error ? error.message: "Error desconocido"
        });
    }
};

// Controlador para registro de usuarios
export const registerUsersController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        await registerUsersService(req.body);
        res.status(201).json({message: "Usuario creado"});
    } catch (error) {

        const postgresError = error as PostgresError;



        res.status(400).json({ 
            message: `ERROR: ${error}`,
            data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail: postgresError.message: "error"
        })
    }
};

// Controlador para login (por implementar en el servicio)
export const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
    try {
        const response: UserLoginSuccessDTO | null = await loginUsersServices(req.body)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message: "Error desconocido"
        })
    }
    
};
