//importamos clase general:
import Controllers from "./class.controller.js";

import ticketService from "../services/tickets.service.js";
import cartService from "../services/carts.service.js";
import logger from "../utils/logger/logger.winston.js";

class TicketController extends Controllers{
    constructor(){
        super(ticketService);
        this.cartService = cartService
    }
    generateTicket = async (req, res, next)=>{
        try {
            const {cid} = req.params
            const userData = req.session.passport.user
            logger.info('tickets.controller - generateTicket - userData:'+ userData);
            logger.info('tickets.controller - generateTicket - cartId:'+ cid);
            const ticketGenerate = await  this.service.generateTicket(cid, userData)
            res.json(ticketGenerate)
            return ticketGenerate
        } catch (error) {
            logger.error('Entró al catch en tickets.controller de generateTicket'+ error)
            next(error)
        }
    }
}

const ticketController = new TicketController();
export default ticketController;


