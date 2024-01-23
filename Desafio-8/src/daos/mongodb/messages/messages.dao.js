import {MsgModel} from './messages.model';
import MongoDao from '../mongo.dao.js';

export default class MsgMongoDao extends MongoDao{
    constructor(){
        super(MsgModel);
    }
    async deleteAll(){
        try {
            return await MsgModel.deleteMany({});
        } catch (error) {
            console.log('consola deleteAll dao messages', error);
            throw new Error('consola deleteAll dao messages', error);
        }
    }
}

//exporto e instancio para poder usarlo en diferentes partes del código y no instanciarlo cada vez que lo requiera:

export const msgDao = new MsgMongoDao();