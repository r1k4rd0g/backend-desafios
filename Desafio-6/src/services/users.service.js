import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
import { __dirname } from "../utils.js";

const userDao = new UserDaoMongoDB();

export const createUser = async (userData)=>{
    try {
        const newUser = await userDao.create(userData)
        console.log('consola de users.services const createUser:', newUser);
        if(!newUser) return false, console.log('usuario no creado');
        else return newUser;
    } catch (error) {
        console.log(`error al crear el usuario con datos: ${userData}, msg: ${msg}, en users.service`);
    }
}