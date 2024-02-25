import { Router } from "express";
import userController from "../controllers/users.controller.js";
import passport from "passport";
import sessionController from '../controllers/sessions.controller.js'
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post('/current',verifyToken, sessionController.profileResponse);
//acá tiene que ir el método necesario para mostrar los datos del usuario, una vez sea validado el token

/*router.get('/profile', (req, res) => {
    res.render('profile', { user })
});*/
export default router;