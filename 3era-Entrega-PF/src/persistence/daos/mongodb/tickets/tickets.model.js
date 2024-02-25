import {Schema, model} from 'mongoose';
import { UserModel } from '../users/users.model.js';

//nombre de la colección de tickets
export const ticketsCollection = "tickets"

export const ticketsSchema = new Schema({
    Code:{ //Código debe ser un string, se auto genere y sea único.
        type: String,
        required: true,
        index: true,
        unique: true
    },
    purchaseDataTime: { //Fecha y hora en que se realizó el pago del ticket.
        type: String,
        required: true,
        index: true
    },
    amount: { //monto total de la compra
        type: Number,
        required: true,
        index: true
    },
    purchaser:{
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
            index: true
        }
    }
})


//exportamos el modelo como TicketModel
export const TicketModel = model (
    'tickets',
    ticketsSchema
)