//importamos los Crud de servicios:
import Services from './class.services.js';
//importamos el modelo MsgDao:
import persistence from '../persistence/daos/factory.js'



class MsgService extends Services{
    constructor(){
        super(persistence.msgDao)
    }

    removeAll = async ()=>{
        try {
            return await this.dao.deleteAll()
        } catch (error) {
            console.log('error al eliminar todos los mensajes en messages.service', error);
        }
    }
}

const msgService = new MsgService(persistence.msgDao);
export default msgService;
