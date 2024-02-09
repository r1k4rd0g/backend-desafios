import fs from "fs";

class UserFSDao {
    constructor(path) {
        this.path = path;
    }

    async #getMaxId() {
        let maxId = 0;
        const items = await this.getAll();
        items.map((item) => {
            if (item.id > maxId) maxId = item.id;
        });
        return maxId;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const items = await fs.promises.readFile(this.path, "utf-8");
                const itemsJSON = JSON.parse(items);
                return itemsJSON;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const items = await this.getAll();
            const item = items.find((item) => item.id === id);
            if (item) {
                return item;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const item = {
                id: (await this.#getMaxId()) + 1,
                ...obj,
            };
            const itemsFile = await this.getAll();
            itemsFile.push(item);
            await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
            return item;
        } catch (error) {
            console.log(error);
        }
    }

    async update(obj, id) {
        try {
            const itemsFile = await this.getAll();
            const index = itemsFile.findIndex((item) => item.id === id);
            console.log("index:::", index);
            if (index === -1) {
                throw new Error(`Id ${id} not found`);
            } else {
                itemsFile[index] = { ...obj, id };
            }
            await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const itemsFile = await this.getAll();
            if (itemsFile.length > 0) {
                const newArray = itemsFile.filter((item) => item.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error(`Item id: ${id} not found`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async userSearch({email, password}){
        try {//console.log(email, typeof password,'consola de dao')
            const userFind = await UserModel.findOne({email, password})
            //console.log(userFind, 'userFind')
            return userFind;
        } catch (error) {
            throw new Error (`error al buscar el usuario con obj ${email, password}, msg ${error}`);
        }
    }

    async searchByEmail (email){
        try {//console.log('viene de services en dao..', typeof(email))
            const userFindByEmail = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } }); //expresión que hace que sea insensible la busqueda del email ante mayúsucla o minúscula.
            //console.log('consola de dao buscando..', userFindByEmail)
            return userFindByEmail
        } catch (error) {
            console.log(`error al obtener el usuario de email: ${email}, msg: ${error}`);
            throw new Error (`error al obtener el usuario de email: ${email}, msg: ${error}`)
        }
    }
}


const userDaoFS = new UserFSDao();
export default userDaoFS;