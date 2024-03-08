import { errorsDictionary } from "../utils/errors.dictionary.js";
export default class Services {
    constructor(dao){
        this.dao = dao;
    }

    //funciones simples:

    //busca todos los items:
    getAll = async ()=>{
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_GET);
        }
    };
    //busca un item por id específico:
    getById = async (id)=>{
        try {
            //console.log('consola getById de class.services que muestra el id que viene desde controllers:', id)
            const itemSearch = await this.dao.getById(id);
            //console.log('itemSearch en class.service', itemSearch);
            if(!itemSearch) return false, console.log(`no se encontró item buscado por id ${id}`);
            else return itemSearch;
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_FIND);
        }
    };
    //crea un item:
    create = async (obj)=>{
        try {
            const newItem = await this.dao.create(obj);
            if(!newItem) return false;
            //console.log("item no creado, consola create class.service");
            else return newItem;
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_CREATE);
        }
    };

    //actualizar un item:
    update = async (id, obj) =>{
        try {
            const itemSearch = await this.dao.getById(id);
            if(!itemSearch) return false;
            //console.log (`item con id: ${id} no encontrado, consola update de class.service`);
            else return itemUpdate = await this.dao.update(id, obj);
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_UPDATE);
        }
    };
    //borrar un item:
    delete = async (id) =>{
        try {
            const itemDelete = await this.dao.delete(id);
            if(!itemDelete) return false;
            //console.log(`no se encontró item buscado por id ${id}`);
            else return itemDelete;
        } catch (error) {
            throw new Error (error.message, errorsDictionary.ERROR_TO_REMOVE);
        }
    }

}