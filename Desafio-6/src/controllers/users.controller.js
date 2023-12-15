import * as usersServices from '../services/users.service.js';
import * as serviceProduct from '../services/product.service.js'
import session from 'express-session';

export const register = async (req, res, next)=>{
    try {
        const userData = req.body
        const user = await usersServices.createUser(userData)
        if(user) res.redirect("/api/users/home");
        else res.redirect("/api/views/register-error")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next)=>{
    try {
        const {email, password} =req.body
        const userOk = await usersServices.login( email, password);
        if(userOk){
            req.session.user=userOk;
            req.session.email=email;
            req.session.password=password;
            console.log('consola de session', req.session.user)
            res.redirect("/api/views/productlist");
        } else res.redirect("/api/views/errorlogin");
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
        res.redirect("/api/users/home");
    });
};