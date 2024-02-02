import { Router } from "express";
import userController from "../controllers/users.controller.js";
import passport from "passport";
import sessionController from '../controllers/sessions.controller.js'
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get('/current', sessionController.profileResponse);
//acá tiene que ir el método necesario para mostrar los datos del usuario, una vez sea validado el token


export default router;