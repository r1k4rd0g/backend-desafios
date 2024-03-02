import MongoDao from '../mongo.dao.js';
import {TicketModel} from './tickets.model.js';

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
            console.log('error al crear el ticket', error);
            throw new Error ('error al crear el ticket', error)
        }
    }
}

