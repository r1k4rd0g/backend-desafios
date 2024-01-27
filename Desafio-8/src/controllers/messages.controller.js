//importamos clase general:
import Controllers from "./class.controller.js";
//importamos servicios:
import msgService from "../services/messages.service.js";


export default class MsgController extends Controllers{
    constructor(){
        super(msgService)};
}