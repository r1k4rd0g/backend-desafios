import { Router } from "express";
import * as controllerUser from '../controllers/users.controller.js'

const router = Router();

router.post("/register", controllerUser.register);
router.get('/home', (req, res)=>{
    res.render('home');
})
router.post("/login", controllerUser.login);
router.post('/logout', controllerUser.logout);

export default router;