import { isValidPass } from "../../utils.js";
import { UserModel } from "./models/users.model.js";

export default class UserDaoMongoDB{

    async create(obj){
        try {
            const newUser = await UserModel.create(obj);
            return newUser;
        } catch (error) {
            throw new Error (`error al crear el usuario con obj ${obj}, msg ${error}`);
        }
    }

    async userSearch({email, password}){
        try {//console.log(email, typeof password,'consola de dao')
            const userFind = await UserModel.findOne({email})
            if(userFind){
                const isValid = isValidPass(password, userFind);
                if(!isValid) return false;
                else return userFind
            }
            //console.log(userFind, 'userFind')
            return false;
        } catch (error) {
            throw new Error (`error al buscar el usuario con obj ${email, password}, msg ${error}`);
        }
    }
}