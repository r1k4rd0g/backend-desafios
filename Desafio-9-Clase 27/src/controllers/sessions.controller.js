//importamos class Generic:
import usersServices from "../services/users.service.js";
import Controllers from "./class.controller.js";

class SessionController extends Controllers {
    constructor(){
        super(usersServices)
    }

    profileResponse = async (req, res, next) =>{
        try {
            const dataProfileUser = req.user;
            console.log('dataProfileUser de sessions.controller', dataProfileUser)
            res.render('profile', {user: dataProfileUser});
        } catch (error) {
            console.log('consola error de profileResponse', error);
        }
    }

}


const sessionController = new SessionController();
export default sessionController