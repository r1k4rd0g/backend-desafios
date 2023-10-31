import fs from "fs";

export class ProductManager{
    constructor(){
        this.path = '/../data/products.json';
        this.products=[];
    };
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
    //**Enclosing Classes *//

#generateId(products){
    if (!products || products.length === 0){
        return 1;
    }
    const maxId = products.reduce((max, product) => product.id > max ? product.id : max, 0);
    return maxId + 1;
}   ;
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
