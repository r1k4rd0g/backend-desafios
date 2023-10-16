const { isUtf8 } = require('buffer');
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
    async addProduct(product){
        const {title, description, price, thumbnail, code, stock} =  product;
        try{
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
            const newProductId = this.#generateId();
            const newProduct={
                title,
                description, 
                price,            
                thumbnail,
                code,
                stock,
                id: newProductId,
            };
            const existingProduct = products.find((product) => product.code === code);
            if (existingProduct){
                throw new Error(`Ya existe el producto con ${code} ingresado`);
            }
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        }catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`)
        }
    }
    
/*
getProducts debe:
    1-devolver todos los elementos que se encuentren dentro del arreglo del archivo json.
*/
    async getProducts(){
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
            const product = await this.#findProductById(idSearch);
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
            const productFind = await this.#findProductIndexById(idSearch);
            if (productFind === -1){
                throw new Error(`El Producto con ${idSearch} no existe.`);
            }
            const products = await this.getProducts();
            const updateProduct ={
                ...products[productFind],
                ...updateValues
            };
            if (updateProduct.id){
                delete updateProduct.id;
            }
            products[productFind] = updateProduct;
            await this.#saveProducts(products);            
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
            const productFind = await this.#findProductIndexById(idSearch);
            if (productFind === -1){
                throw new Error(`El Producto con Id ${idSearch} no existe.`);
            }
            const products = await this.getProducts();
            const deletedProduct = products.splice(productIndex, 1)[0];
            await this.#saveProducts(products);
            return deletedProduct;
        } catch (error) {
                throw new Error (`Error al eliminar el producto con Id ${idSearch}`);
        }
    }
    #generateId(products){
        const maxId = products.reduce((prev,current)=>(prev.id >current.id ?prev:current), {id:0})
        return maxId.id +1;
    };
    async #findProductById(idSearch){
        const products = await this.getProducts();
        return products.find((product) => product.id === idSearch);
    }
    async #findProductIndexById(idSearch){
        const products = await this.getProducts();
        return products.findIndex((product) => product.id === idSearch);
    }
    async #saveProducts(products){
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
};


const productManager = new ProductManager();

productManager.addProduct('Agua Jane', 'Agua Jane, 1.2 L. Limpia, desinfecta y blanquea', 150, 'https://f.fcdn.app/imgs/8a4b3f/coraluy.com/corauy/cddc/original/catalogo/LAJANE1001281/2000-2000/lavandina-agua-jane-1-lt.jpg', 12345, 10)
productManager.addProduct('Arroz', 'Arroz Saman Blanco, 1kg', 870, 'https://geant.vtexassets.com/arquivos/ids/282097/523035.jpg?v=637656746433700000', 45697, 20)

//agregamos un producto con el codigo igual a otro:
//productManager.addProduct('Arroz', 'Arroz Blue Patna, 1kg', 870, 'https://coopar.com.uy/Files/Productos/8293E406E83A1921.jpg', 45697, 15)
console.log('Mostramos los productos que existen: ',productManager.getProducts());
console.log('buscamos un productos con id que existe: ', productManager.getProductById(1));
console.log('buscamos un productos con id que NO existe: ', productManager.getProductById(789));

