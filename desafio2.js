const fs = require('fs');

class ProductManager{
    constructor(){
        this.path = './products.json';
        this.products=[];
    };
/* - getProducts debe:
    1-devolver todos los elementos que se encuentren dentro del arreglo del archivo json. */
    async getProducts(){
            try {
                if(fs.existsSync(this.path)){
                const productsJSON= await fs.promises.readFile(this.path, 'utf-8')
                const productsJavaScript = JSON.parse(productsJSON);
                return productsJavaScript;
                }else return [];
            } catch (error) {
                throw new Error (`Error al leer el archivo: ${error.message}`);
        }
    };
/* - getProductById debe:
    1-recibir por parametro el ID
    2-leer todo el archivo para buscar el ID
    3-devolver en formato objeto. */
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
/* - addProduct debe:
    1-recibir un objeto
    2-asignarle un id autoincrementado
    3-guardarlo en el array del archivo. */
    async addProduct(title, description, price, thumbnail, code, stock){
        if(typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof thumbnail !== 'string' || typeof code !== 'string' || typeof stock !== 'number'){
            throw new Error('Invalid input parameters');
        }
        const products = await this.getProducts();
        const existingProduct = products.find((product) => product.code === code);
        if (existingProduct){
            throw new Error(`Ya existe el producto con ${code} ingresado`);
        }
        try{
            const newProduct={
                title,
                description, 
                price,            
                thumbnail,
                code: code.toString(),
                stock,
                id: this.#generateId(products),
            };            
            this.products.push(newProduct);
            //console.log('productos antes de guardar:', this.products); - utilizaba para buscar un error
            await this.#saveProducts(this.products);
            //console.log('productos después de guardar:', this.products); - utilizaba para buscar un error
            return newProduct;
        }catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`)
        }
    }
/* - updateProduct debe:
    1-recibir el ID del producto para actualizar
    2-modificar el campo actualizado 
    3-actualizar el producto
    4-no borrar el ID */
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

/* - deleteProduct debe:
    1-recibir el ID del producto
    2-borrar el producto del archivo
    3-crear una array con productos borrados? (opcional) */
async deleteProduct(idSearch){
    try {
        const productFind = await this.#findProductIndexById(idSearch);
        if (productFind === -1){
            throw new Error(`El Producto con Id ${idSearch} no existe.`);
        }
        const products = await this.getProducts();
        const deletedProduct = products.splice(productFind, 1)[0];
        await this.#saveProducts(products);
        return deletedProduct;
    } catch (error) {
            throw new Error (`Error al eliminar el producto con Id ${idSearch}`);
    }
}

//**Enclosing Classes *//

    #generateId(products){
        if (!products || products.length === 0){
            return 1;
        }
        const maxId = products.reduce((max, product) => product.id > max ? product.id : max, 0);
        return maxId + 1;
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
}

//**Tests */
const productManager = new ProductManager();
const product1 ={
    title : 'Agua_Jane',
    description: 'Agua Jane, 1.2 L. Limpia, desinfecta y blanquea', 
    price: 150,
    thumbnail: 'https://discouy.vtexassets.com/arquivos/ids/1419680/AGUA-JANE-Antisplash-1-L-1.jpg?v=638296921167830000',
    code: 'r7891z',
    stock: 10,
};

const product2 ={
    title : 'Arroz',
    description: 'Arroz Saman Blanco, 1kg', 
    price: 87,
    thumbnail: 'https://geant.vtexassets.com/arquivos/ids/282097/523035.jpg?v=637656746433700000',
    code: 'e51qf',
    stock: 22,
};
//product3 con mismo código para chequear que no se puede dar de alta a un producto con mismo código. 
const product3 ={
    title : 'Café',
    description: 'Café Nescafé - Bracafé 170g', 
    price: 65,
    thumbnail: 'https://districomp.com.uy/files/tmp/compressed/normal/lqfienxv57rfktjjq239.jpg',
    code: 'e51qf',
    stock: 40,
};
//product4 creado para borrarlo con el deleteProduct()
const product4 ={
    title : 'Choclo en Lata',
    description: 'Choclo Amarillo Entero - Arcor 300g', 
    price: 45,
    thumbnail: 'https://prod-resize.tiendainglesa.com.uy/images/medium/P106237-1.jpg?20190729125546,Choclo-ARCOR-Amarillo-Cremoso-Lata-300gr-en-Tienda-Inglesa',
    code: 'e61qd',
    stock: 22,
};
const test = async() =>{
    await productManager.addProduct(product1.title, product1.description, product1.price, product1.thumbnail, product1.code, product1.stock);
    await productManager.addProduct(product2.title, product2.description, product2.price, product2.thumbnail, product2.code, product2.stock);
    //await productManager.addProduct(product3.title, product3.description, product3.price, product3.thumbnail, product3.code, product3.stock);
    await productManager.addProduct(product4.title, product4.description, product4.price, product4.thumbnail, product4.code, product4.stock);
    console.log('Producto buscado por Id 2: ',await productManager.getProductById(2));
    console.log('Productos guardados: ',await productManager.getProducts());
    console.log('Producto a eliminar: ', await productManager.deleteProduct(3));
    console.log('Actualizamos precio producto 1: ', await productManager.updateProduct(1,{price: 97}));
    }

test();