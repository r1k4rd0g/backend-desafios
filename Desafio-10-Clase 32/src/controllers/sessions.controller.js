//importamos class Generic:
import usersServices from "../services/users.service.js";
import userRepository from "../persistence/repository/user.repository.js";
import Controllers from "./class.controller.js";

class SessionController extends Controllers {
    constructor(){
        super(usersServices)
        this.userRepository = userRepository
    }

    profileResponse = async (req, res, next) =>{
        try {
            //console.log('consola req.user en sessions controller:', req.user)
            const userLog = req.session.passport.user;
            const id = userLog._id
            //console.log('id buscado de userLog', id)
            const user = await userRepository.getUserById(id);
            //console.log('user de dto en sessions.controller', user);
            req.session.passport.dto = user;
            res.json(user);
            //res.render('profile', {user: user});
            //return user
        } catch (error) {
            next (error);
        }
    }

}


const sessionController = new SessionController();
export default sessionController