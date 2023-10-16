const fs = require('fs');

class ProductManager{
    constructor(){
        this.path='./products.json'
    }    
/*
addProduct debe:
    1-recibir un objeto
    2-asignarle un id autoincrementado
    3-guardarlo en el array del archivo. 
*/
    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
            const existingProduct = products.find((product) => product.code === code);
            if (existingProduct){
                throw new Error(`Ya existe el producto con ${code} ingresado`);
            }
            const newProduct={
                title,
                description, 
                price,            
                thumbnail,
                code,
                stock,
                id: this.#generateId() + 1,
            };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        }catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`)
        }
    }
    #generateId(products){
        const maxId = products.reduce((prev,current)=>(prev.id >current.id ?prev:current), {id:0})
        return maxId.id +1;
    }
/*
getProducts debe:
    1-devolver todos los elementos que se encuentren dentro del arreglo del archivo json.
*/
    async getProduct(){
        try {
            const productsJSON= await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productsJSON);
        } catch (error) {
            throw new Error (`Error al leer el archivo: ${e.message}`);
        }
    }
/*
getProductById debe:
    1-recibir por parametro el ID
    2-leer todo el archivo para buscar el ID
    3-devolver en formato objeto. 
*/
    async getProductById(idSearch){
        try {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
            const product = products.find((product) => product.id === idSearch);
            if (!product){
                throw new Error(`No existe producto con ${idSearch} ingresado.`)
            };
            return product;
        } catch (error) {
            throw new Error (`Error al buscar el producto con ${idSearch}`);
        };
    };
/*
updateProduct debe:
    1-recibir el ID del producto para actualizar
    2-modificar el campo actualizado 
    3-actualizar el producto
    4-no borrar el ID
*/
    async updateProduct(idSearch, updateValues){
        try {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
            const productFind = products.findIndex((product) =>product.id === idSearch);
            if (productFind === -1){
                throw new Error(`El Producto con ${idSearch} no existe.`);
            }
            const updateProduct ={
                ...products[productFind],
                ...updateValues
            };
            products[productFind] = updateProduct;
            const updateProductJSON = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, updateProductJSON);
            return updateProduct;
        } catch (error) {
            throw new Error (`Error al actualizar con el producto con Id ${idSearch}`);
        }
    };
/*
deleteProduct debe:
    1-recibir el ID del producto
    2-borrar el producto del archivo
    3-crear una array con productos borrados? (opcional)
*/
    async deleteProduct(idSearch){
        try {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
            const productFind = products.findIndex((product) =>product.id === idSearch);
            if (productFind === -1){
                throw new Error(`El Producto con Id ${idSearch} no existe.`);
            }
        
        } catch (error) {
                throw new Error (`Error al eliminar el producto con Id ${idSearch}`);
        }
    }
};
