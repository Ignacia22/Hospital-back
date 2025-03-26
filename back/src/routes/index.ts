import {Router} from "express";
import usersRoutes from "./usersRoutes";
import appointmentsRoutes from "./appointmentsRoutes";

const router: Router = Router();

router.use("/users", usersRoutes);

router.use("/appointments", appointmentsRoutes);

export default router;

