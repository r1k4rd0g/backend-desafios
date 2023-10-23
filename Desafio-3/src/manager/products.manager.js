import fs from "fs";

export class ProductManager{
    constructor(){
        this.path = './products.json';
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

}