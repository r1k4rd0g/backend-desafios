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
            console.log(`error al obtener todos los items, console getAll, class Service, msg: ${error}`);
        }
    };
    //busca un item por id específico:
    getById = async (id)=>{
        try {console.log('id que viene desde controllers:', id)
            const itemSearch = await this.dao.getById(id);
            console.log('itemSearch en class.service', itemSearch);
            if(!itemSearch) return false, console.log(`no se encontró item buscado por id ${id}`);
            else return itemSearch;
        } catch (error) {
            console.log(`error al obtener el item con id: ${id}, msg: ${error}, consola getById de class.service`);
        }
    };
    //crea un item:
    create = async (obj)=>{
        try {
            const newItem = await this.dao.create(obj);
            if(!newItem) return false, console.log("item no creado, consola create class.service");
            else return newItem;
        } catch (error) {
            console.log(`error al crear el item con datos: ${obj}, msg: ${error}, consola create class.service`);
        }
    };

    //actualizar un item:
    update = async (id, obj) =>{
        try {
            const itemSearch = await this.dao.getById(id);
            if(!itemSearch) return false, console.log (`item con id: ${id} no encontrado, consola update de class.service`);
            else return itemUpdate = await this.dao.update(id, obj);
        } catch (error) {
            console.log(`error al actualizar el item con id: ${id} y datos: ${obj}, en consola update de class.service`);
        }
    };
    //borrar un item:
    delete = async (id) =>{
        try {
            const itemDelete = await this.dao.delete(id);
            if(!itemDelete) return false, console.log(`no se encontró item buscado por id ${id}`);
            else return itemDelete;
        } catch (error) {
            console.log(`error al borrar el item con id: ${id}, msg: ${error}, consola delete de class.service`);
        }
    }

}