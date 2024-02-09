import {MsgModel} from './messages.model.js';
import MongoDao from '../mongo.dao.js';

class MsgMongoDao extends MongoDao{
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

const messageDaoMongoDB = new MsgMongoDao();
export default messageDaoMongoDB