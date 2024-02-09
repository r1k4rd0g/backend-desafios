//importamos los Crud de servicios:
import Services from './class.services.js';
//importamos el modelo MsgDao:
import msgDao from '../persistence/persistence.js'



class MsgService extends Services{
    constructor(){
        super(msgDao)
    }

    removeAll = async ()=>{
        try {
            return await msgDao.deleteAll()
        } catch (error) {
            console.log('error al eliminar todos los mensajes en messages.service', error);
        }
    }
}

const msgService = new MsgService(msgDao);
export default msgService;



/*export const getById = async(id)=>{
    try {
        const msgSearch = await msgDao.getById(id);
        if(msgSearch) return false, console.log(`mensaje buscado en messages.service con id: ${id}, no encontrado`)
        else return msgSearch;
    } catch (error) {
        console.log(`error al crear el mensaje con obj ${obj}, msg ${error}, en messages.service`);
    }
}*/
/*export const create = async(obj)=>{
    try {
        const msgNew = await msgDao.create(obj);
        console.log('consola de messages.services const create:',newProd);
        if(!msgNew) return false, console.log('mensaje no creado');
        else return msgNew
    } catch (error) {
        console.log(`error al crear el mensaje con obj ${obj}, msg ${error}, en messages.service`);
        }
    }
*/
/*export const update = async(id, obj)=>{
    try {
        const msgUpdate = await msgDao.update(id, obj);
        if(!msgUpdate) return false, console.log(`mensaje buscado en messages.service con id: ${id}, no encontrado`);
        else return msgUpdate;
    } catch (error) {
        console.log(`error al actualizar el mensaje de id: ${id}, con obj: ${obj} ,msg: ${error}, en messages.service`);
    }
}*/

/*export const remove = async(id)=>{
    try {
        const msgRemove = await msgDao.delete(id)
        if(!msgRemove) return false, console.log(`mensaje con id: ${id}, no encontrado`);
        else return msgRemove;
    } catch (error) {
        console.log(`error al eliminar el mensaje con id ${id}, msg ${error}, en messages.service`);
    }
}*/
