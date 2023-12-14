import * as usersServices from '../services/users.service.js';


export const register = async (req, res, next)=>{
    try {
        const userData = req.body
        const user = await usersServices.createUser(userData)
        if(user) res.redirect("/views");
        else res.redirect("/views/register-error")
    } catch (error) {
        next(error);
    }
}