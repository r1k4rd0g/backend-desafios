import { UserModel } from "./users.model.js";
import MongoDao from "../mongo.dao.js";

export default class UserMongoDao extends MongoDao{
    constructor(){
        super(UserModel);
    }

    async create(newUser){
        try {//console.log('consola create users.dao newUser:',newUser)
            const userCreated = await UserModel.create(newUser);
            //console.log('consola de users.dao userCreated:', userCreated)
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
        try {//console.log('viene de services en user.dao email: ', email, typeof(email))
            const userFindByEmail = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } }); //expresión que hace que sea insensible la busqueda del email ante mayúsucla o minúscula.
            //console.log('consola de users.dao findByEmail: ', userFindByEmail)
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

