//importamos class Generic:
import usersServices from "../services/users.service.js";
import Controllers from "./class.controller.js";

class SessionController extends Controllers {
    constructor(){
        super(usersServices)
    }

    profileResponse = async (req, res, next) =>{
        try {
            //console.log('consola req.user en sessions controller:', req.user)
            const user = req.session.passport.user;
            //console.log('user de sessions.controller', user)
            res.json(user)
            //res.render('profile', {user: user});
            //return user
        } catch (error) {
            console.log('consola error de profileResponse', error);
        }
    }

}


const sessionController = new SessionController();
export default sessionController