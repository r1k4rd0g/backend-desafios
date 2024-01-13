import {MsgModel} from './messages.model';
import MongoDao from '../mongo.dao.js';

export default class MsgDaoMongoDBe extends MongoDao{
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
