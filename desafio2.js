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
                return console.log(`Ya existe el producto con ${code} ingresado`);
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
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return newProduct;
        }catch (error) {
            return console.log(`Error al agregar el producto: ${error.message}`)
        }
    }
    #generateId(){
        const maxId = data.reduce((prev,current)=>(prev.y>current.y)?prev:current,1)
        
        return maxId +1;
    }
/*
getProducts debe devolver todos los elementos que se encuentren dentro del arreglo del archivo json.
*/
    async getProductById(idSearch){
        if(fs.existsSync(this.path)){
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(productsJSON);
        } else {
            throw new Error(`Error al obtener el archivo: ${this.path} ${e.message}`);
        }
    }
}

/*
getProductById debe:
    1-recibir por parametro el ID
    2-leer todo el archivo para buscar el ID
    3-devolver en formato objeto. 
*/
    getProductById();
/*
updateProduct debe:
    1-recibir el ID del producto para actualizar
    2-modificar el campo actualizado 
    3-actualizar el producto
    4-no borrar el ID
*/
    updateProduct();
/*
deleteProduct debe:
    1-recibir el ID del producto
    2-borrar el producto del archivo
    3-crear una array con productos borrados? (opcional)
*/
    deleteProduct();
