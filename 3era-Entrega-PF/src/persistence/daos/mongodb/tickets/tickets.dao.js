import MongoDao from '../mongo.dao.js';
import {TicketModel} from './tickets.model.js';

export default class TicketMongoDao extends MongoDao{
    constructor(){
        super(TicketModel)
    }

}

