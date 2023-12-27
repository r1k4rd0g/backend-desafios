import * as usersServices from '../services/users.service.js';
import * as serviceProduct from '../services/product.service.js'
import session from 'express-session';

export const register = async (req, res, next)=>{
    try {
        const userData = req.body
        console.log('consola register en controller', userData);
        const user = await usersServices.createUser(userData)
        if(user) res.redirect("/home");
        else res.redirect("/registererror")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next)=>{
    try {
        const {email, password} =req.body
        const user = {email, password}
        const userOk = await usersServices.login(user);
        if(userOk){
            req.session.user=userOk;
            req.session.email=email;
            req.session.password=password;
            console.log('consola de session', req.session.user)
            res.redirect('/productlist');
        } else res.redirect("/errorlogin");
    } catch (error) {
        next(error)
    }
}
export const loginResponse = async (req, res, next)=>{
    try {
        const id = req.session.passport.user;
        //console.log('id de passport', id)
        const userOk = await usersServices.getById(id);
        const {email, password} = userOk
        console.log('usuario ok?', userOk);
        if(userOk){
            req.session.passport.user=userOk;
            req.session.passport.email=email.userOk;
            req.session.passport.password=password.userOk;
            //console.log('consola de session', req.session.passport.user)
            res.redirect("/productlist");
        } else res.redirect("/errorlogin");
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/error');
        }
        res.clearCookie('connect.sid');
        res.redirect("/home");
    });
};