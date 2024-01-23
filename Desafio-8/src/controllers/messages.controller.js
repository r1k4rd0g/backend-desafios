//importamos clase general:
import Controllers from "./class.controller.js";
//importamos servicios:
import MsgService from "../services/messages.service.js";
//inicializamos
const msgService = MsgService();

export default class MsgController extends Controllers{
    constructor(){
        super(msgService)};
}