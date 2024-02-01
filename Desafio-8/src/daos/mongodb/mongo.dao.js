// creamos el CRUD que se utilizará en todas las clases.

export default class MongoDao {
    constructor(model) {
        this.model = model; //la variable this.model, será igual al modelo que llegue por el constructor.
    }
    //Crud:

    async getAll(){
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.log(error, 'consola getAll de mongo.dao');
            throw new Error (`error al obtener todos los items`);
        }
    }

    async getById(id){
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log(error, 'consola getById de mongo.dao');
            throw new Error (`error al obtener el items por id ${id}`);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            console.log(error, 'consola create de mongo.dao');
            throw new Error (`error al obtener crear el items por objeto: ${obj}`);
        }
    }

    async update (id, obj) {
        try {
            await this.model.updateOne({_id: id}, obj); //actualiza una solo.
            return obj
        } catch (error) {
            console.log(error, 'consola update de mongo.dao');
            throw new Error (`error al actualizar el items por id ${id}`);
        }
    }

    async delete (id){
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error, 'consola delete de mongo.dao');
            throw new Error (`error al borrar el items por id ${id}`);
        }
    }
}