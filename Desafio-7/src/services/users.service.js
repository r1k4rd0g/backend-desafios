import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
import { createHash, isValidPass } from "../utils.js";

const userDao = new UserDaoMongoDB();

export const createUser = async (userData)=>{
    try {console.log('userData services', userData)
        const {email, password} = userData;
        if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
            return await userDao.create({
                ...userData,
                password: createHash(password),
                role:'admin'});
        }
        const newUser = await userDao.create({
            ...userData,
            password: createHash(password)
            })
        //console.log('consola de users.services const createUser:', newUser);
        if(!newUser) return false;
        else return newUser;
    } catch (error) {
        console.log(`error al crear el usuario con datos: ${userData}, msg: ${error}, en users.service`);
    }
}

export const login = async (user) =>{
    try {
        //console.log('consola lo que viene de controller:', user)
        const { email, password } = user;
        const userExist = await userDao.searchByEmail({email});
        //console.log('user exist', userExist)
        if(userExist) {
            const passValid = isValidPass(password, userExist);
            if(!passValid) return false;
            else return userExist
        }
        return false;
    } catch (error) {
        console.log(`error al buscar el usuario con datos: ${email, password}, msg: ${error}, en users.service`)
    }
}

export const getByEmail = async (email)=>{
    try {
        const userSearch = await userDao.searchByEmail(email);
        if(!userSearch) return false, console.log(`usuario no encontrado en user.service con ${email}`);
        else return userSearch
    } catch (error) {
        console.log(`error al buscar el usuario con datos: ${email}, msg: ${error}, en users.service`)
    }
}

export const getById = async (id)=>{
    try {
        const userSearch = await userDao.searchById(id);
        if(!userSearch) return false, console.log(`usuario no encontrado en user.service con ${id}`);
        else return userSearch
    } catch (error) {
        console.log(`error al buscar el usuario con datos: ${id}, msg: ${error}, en users.service`)
    }
}
