import {Request, Response, Router, NextFunction} from "express";
import { getUsersController, getUserByIdController, registerUsersController, loginUserController } from "../controllers/usersController";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { validateUserRegisterData } from "../middlewares";


const router: Router = Router();

router.get("/",(req: Request, res: Response) => getUsersController(req, res));

router.get("/:id",(req: Request<{id: string}>, res: Response) => getUserByIdController(req, res));

router.post("/register",
    (req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next), 
    (req: Request< unknown, unknown, UserRegisterDTO >, res: Response) => registerUsersController(req, res));

router.post("/login",(req: Request< unknown, unknown, UserLoginDTO >, res: Response) => loginUserController(req, res));

export default router;