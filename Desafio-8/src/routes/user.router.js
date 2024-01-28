import { Router } from "express";
import userController from "../controllers/users.controller.js";
import passport from "passport";


const router = Router();

router.post("/register", passport.authenticate('register-local', {
    successRedirect: '/register-success',
    failureRedirect: '/registererror'
}));
//router.get('/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/home', (req, res)=>{
    res.render('home');
})
router.get('/productlist', (req, res) => {
    res.render('productlist', { user: req.user });
}); //con esta vista renderizo y muestro los datos del usuario registrado (falta ver si para github tambien o solo localmente).


router.post("/login", passport.authenticate("login-local"), userController.loginResponse) //con esta vista puedo generar el logueo local

router.get("/github-register", passport.authenticate("github-register", {
    failureRedirect: "/registererror", //en caso de que haya error, nos manda al login nuevamente.
    successRedirect: "/register-success", //en caso de que no haya error, entonces renderizamos la vista que queremos ver..
    passReqToCallback: true
}));
router.get("/github-login", passport.authenticate("github-login"), userController.loginResponse);
router.post("/github-login", passport.authenticate("github-login"), userController.loginResponse);

router.post('/logout', userController.logout);
export default router;