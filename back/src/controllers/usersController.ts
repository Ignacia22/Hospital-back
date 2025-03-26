import { Request, Response } from "express";
import { UserLoginDTO, UserLoginSuccessDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { getUserByIdService, getUsersService, loginUsersServices, registerUsersService } from "../services/userServices";
import { PostgresError } from "../interface/IError";
import { QueryFailedError } from "typeorm";


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
      res.status(201).json({ message: "Usuario creado" });
    } catch (error: unknown) { // Tipamos el error como unknown
      // Verificamos si el error es un QueryFailedError
      if (error instanceof QueryFailedError) {
        const queryError = error as PostgresError;
        if (queryError.code === '23505') { // Violación de unicidad
          const detail = queryError.detail || "Error de unicidad";
          if (detail.includes("username")) {
            res.status(409).json({ 
              message: "El username ya está en uso",
              detail: "El username proporcionado ya existe en la base de datos",
            });
          } else if (detail.includes("email")) {
            res.status(409).json({ 
              message: "El email ya está en uso",
              detail: "El email proporcionado ya existe en la base de datos",
            });
          } else if (detail.includes("nDni")) {
            res.status(409).json({ 
              message: "El nDni ya está en uso",
              detail: "El nDni proporcionado ya existe en la base de datos",
            });
          } else {
            res.status(409).json({ 
              message: "Conflicto con los datos proporcionados",
              detail: detail,
            });
          }
        } else {
          console.error("Error en registerUsersController:", queryError);
          res.status(400).json({ 
            message: "Error al registrar el usuario",
            detail: queryError.message || "Error desconocido",
          });
        }
      } else if (error instanceof Error) {
        // Maneja otros errores que no sean de TypeORM
        res.status(400).json({ 
          message: "Error al registrar el usuario",
          detail: error.message || "Error desconocido",
        });
      } else {
        // Maneja errores desconocidos
        console.error("Error desconocido en registerUsersController:", error);
        res.status(400).json({ 
          message: "Error al registrar el usuario",
          detail: "Error desconocido",
        });
      }
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
