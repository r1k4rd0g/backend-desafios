//importamos los Crud de servicios o las funciones básicas de servicios:
import Services from './class.services.js';
//importamos el modelo UserMongo con las nuevas :
import userDao from "../daos/mongodb/users/users.dao.js";
//importamos utils:
import { createHash, isValidPass } from "../utils.js";


class UserService extends Services{
    constructor(){
        super(userDao)
    }
    createUser = async (userData)=>{
        try {//console.log('userData services', typeof(userData), userData)
            const { first_name, last_name, email, password, age, isGithub} = userData;
            console.log('consola 9', typeof email, typeof password, typeof first_name)
            if (email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                return await userDao.create({
                    ...userData,
                    password: createHash(password),
                    role:'admin'});
            }
            const newUser = await userDao.create({
                first_name,
                last_name,
                age: 18,
                email,
                password: createHash(password),
                isGithub
                })
            //console.log('consola de users.services const createUser:', newUser);
            if(!newUser) return false;
            else return newUser;
        } catch (error) {
            console.log('error al crear el usuario con datos en users.service', userData);
        }
    }

    login = async (user) =>{
        try {
            //console.log('consola lo que viene de controller:', user)
            const { email, password } = user;
            const userExist = await userDao.searchByEmail(email);
            console.log('user exist', userExist)
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

    getByEmail = async (email)=>{
        try {//console.log(email, typeof email, 'verifico email en service')
            const userSearch = await userDao.searchByEmail(email);
            if(!userSearch) return false, console.log(`usuario no encontrado en user.service con ${email}`);
            else return userSearch
        } catch (error) {
            console.log(`error al buscar el usuario con datos: ${email}, msg: ${error}, en users.service`)
        }
    }

}

const usersServices = new UserService(userDao);
export default usersServices;

/*export const getById = async (id)=>{
    try {
        const userSearch = await userDao.searchById(id);
        if(!userSearch) return false, console.log(`usuario no encontrado en user.service con ${id}`);
        else return userSearch
    } catch (error) {
        console.log(`error al buscar el usuario con datos: ${id}, msg: ${error}, en users.service`)
    }
}*/
