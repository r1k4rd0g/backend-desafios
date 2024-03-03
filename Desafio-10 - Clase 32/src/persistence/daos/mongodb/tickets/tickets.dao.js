import MongoDao from '../mongo.dao.js';
import {TicketModel} from './tickets.model.js';
import { errorsDictionary } from '../../../../utils/errors.dictionary.js';

export default class TicketMongoDao extends MongoDao{
    constructor(){
        super(TicketModel)
    };
    async generateTicket (datos) {
        try {
            console.log('lo que llega de service a ticket.dao', datos )
            const newTicket = await TicketModel.create(datos)
            console.log('ticket nuevo desde ticket.dao:',newTicket);
            return newTicket;
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_CREATE);
        }
    }
}

