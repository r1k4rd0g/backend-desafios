import { Router } from "express";
import * as controllerUser from '../controllers/users.controller.js'

const router = Router();

router.post("/register", controllerUser.register);
//router.post("/login", controllerUser.login)

export default router;