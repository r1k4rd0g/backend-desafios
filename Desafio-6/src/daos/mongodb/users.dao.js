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


}