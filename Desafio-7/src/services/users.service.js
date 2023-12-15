import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
import { __dirname } from "../utils.js";

const userDao = new UserDaoMongoDB();

export const createUser = async (userData)=>{
    try {
        const {email, password} = userData;
        if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
            return await userDao.createAdmin({...userData, role:'admin'});
        }
        const newUser = await userDao.create(userData)
        console.log('consola de users.services const createUser:', newUser);
        if(!newUser) return false;
        else return newUser;
    } catch (error) {
        console.log(`error al crear el usuario con datos: ${userData}, msg: ${error}, en users.service`);
    }
}

export const login = async (email, password) =>{
    try {
        console.log('consola lo que viene de controller:', email, password)
        const userExist = await userDao.userSearch({email, password});
        console.log('user exist', userExist)
        if(!userExist) return false;
        else return userExist;
    } catch (error) {
        console.log(`error al buscar el usuario con datos: ${email, password}, msg: ${error}, en users.service`)
    }
}