import { Router } from "express";
import * as controllerUser from '../controllers/users.controller.js'
import passport from "passport";


const router = Router();

router.post("/register", passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/registererror'
}));
//router.get('/github', passport.authenticate('github', {scope: ['user:email']}))

router.get('/home', (req, res)=>{
    res.render('home');
})
router.get('/productlist', (req, res) => {
    res.render('productlist', { user: req.user });
});
/*router.post("/login", passport.authenticate('login', {
    successRedirect: '/productlist',
    failureRedirect: '/errorlogin'
}));*/

router.post("/login", passport.authenticate('login'), controllerUser.loginResponse)
router.post('/logout', controllerUser.logout);

router.get("/github", passport.authenticate("github", {
    failureRedirect: "/registererror", //en caso de que haya error, nos manda al login nuevamente.
    successRedirect: "/productlist", //en caso de que no haya error, entonces renderizamos la vista que queremos ver..
    passReqToCallback: true
}));

export default router;