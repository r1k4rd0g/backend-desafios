import { isValidPass } from "../../utils.js";
import { UserModel } from "./models/users.model.js";

export default class UserDaoMongoDB{

    async create(newUser){
        try {//console.log('consola create dao',newUser)
            const userCreated = await UserModel.create(newUser);
            //console.log('consola de dao', userCreated)
            return userCreated;
        } catch (error) {
            throw new Error (`error al crear el usuario en dao con obj ${newUser}, msg ${error}`);
        }
    }

    async userSearch({email, password}){
        try {//console.log(email, typeof password,'consola de dao')
            const userFind = await UserModel.findOne({email, password})
            //console.log(userFind, 'userFind')
            return userFind;
        } catch (error) {
            throw new Error (`error al buscar el usuario con obj ${email, password}, msg ${error}`);
        }
    }

    async searchByEmail (email){
        try {//console.log('viene de services en dao..', typeof(email))
            const userFindByEmail = await UserModel.findOne({email: email});
            //console.log('consola de dao buscando..', userFindByEmail)
            return userFindByEmail
        } catch (error) {
            console.log(`error al obtener el usuario de email: ${email}, msg: ${error}`);
            throw new Error (`error al obtener el usuario de email: ${email}, msg: ${error}`)
        }
    }
    async searchById (id){
        try {
            return await UserModel.findById(id);
        } catch (error) {
            console.log(`error al obtener el usuario de email: ${id}, msg: ${error}`);
            throw new Error (`error al obtener el usuario de email: ${id}, msg: ${error}`)
        }
    }
}
