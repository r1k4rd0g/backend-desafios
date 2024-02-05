//importamos class Generic:
import Controllers from "./class.controller.js";
//importamos Service específico:
import usersServices from '../services/users.service.js';
import session from 'express-session';
import { generateToken } from "../jwt/auth.js";


class UserController extends Controllers {
    constructor() {
        super(usersServices)
    }
    register = async (req, res, next) => {
        try {
            const userData = req.body
            console.log('consola register en controller', userData);
            const user = await usersServices.createUser(userData)
            if (user) res.redirect("/home");
            else res.redirect("/registererror")
        } catch (error) {
            next(error);
        }
    }

    /*login = async (req, res, next) => {
        try {console.log(req.body, 'lo que viene de req.body en login de user controller')
            const { email, password } = req.body
            //const user = { email, password }
            const userOk = await usersServices.login({ user: { email, password } });
            console.log('userOk del login en user.controller', userOk)
            if (userOk) {
                //const token = generateToken(userOk);
                //console.log('consola login user service que genera token:', token)
                //res.cookie('token', token, {
                //    maxAge: 120000,
                //    httpOnly: true,
                //})
                req.session.user = userOk;
                req.session.email = email;
                req.session.password = password;
                console.log('consola de session', req.session.user)
                res.redirect('/productlist');
            } else res.redirect("/errorlogin");
        } catch (error) {
            console.log(error)
        }
    }*/
    loginResponse = async (req, res, next) => {
        try {
            const id = req.session.passport.user;
            //console.log('id de passport users.controllers', id)
            const userOk = await usersServices.getById(id);
            //console.log('consola de loginResponse con dato userOk:', userOk)
            const { email, password } = userOk;
            const token = generateToken(userOk);
            console.log('token generado en loginResponse userController',token, typeof token);
            //console.log('usuario ok?', userOk);
            if (userOk) {
                req.session.passport.user = userOk;
                req.session.passport.email = email.userOk;
                req.session.passport.password = password.userOk;
                //console.log('consola de session', req.session.passport.user)
                res
                .header('Authorization', token)//acá dejo establecido el token en el header
                .cookie('token', token, { httpOnly: true })// acá dejo establecido el token en una cookie
                .redirect("/productlist");
            } else res.redirect("/errorlogin");
        } catch (error) {
            next(error)
        }
    }

    logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.redirect('/error');
            }
            res.clearCookie('connect.sid');
            res.redirect("/home");
        });
    };
}

const  userController = new UserController();
export default userController;