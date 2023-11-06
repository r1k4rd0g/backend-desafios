class ProductManager{
    constructor(){
        this.products=[];
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if (this.products.find((product)=> product.code === code)){
            return console.log(`Ya existe un producto con ${code} ingresado`);
        }
        const product={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.#generateId() + 1,
        }
        this.products.push(product);
    }
    /*#generateId(){
        let maxId = 0;
        this.products.map((product)=>{
            if(product.id > maxId) maxId = product.id;
        });
        return maxId;
    };*/
//cambio sugerido por tutor en las lineas siguientes, sobre el generateId:
    #generateId(){
        const maxId = data.reduce((prev,current)=>(prev.y>current.y)?prev:current,1)

        return maxId +1;
    };// según codium puede ser mejorada, pero dejo así para que quede con la corrección del tutor. 
    getProducts(){
        return this.products;
    }
    getProductById(idSearch){
        const productSearch = this.products.find((product) => product.id === idSearch)
        if(productSearch) {
            return productSearch
        } else{
            return `Product with id ${idSearch} not found`
        }

    }
}

const productManager = new ProductManager();

productManager.addProduct('Agua Jane', 'Agua Jane, 1.2 L. Limpia, desinfecta y blanquea', 150, 'https://f.fcdn.app/imgs/8a4b3f/coraluy.com/corauy/cddc/original/catalogo/LAJANE1001281/2000-2000/lavandina-agua-jane-1-lt.jpg', 12345, 10)
productManager.addProduct('Arroz', 'Arroz Saman Blanco, 1kg', 870, 'https://geant.vtexassets.com/arquivos/ids/282097/523035.jpg?v=637656746433700000', 45697, 20)
//agregamos un producto con el codigo igual a otro:
productManager.addProduct('Arroz', 'Arroz Blue Patna, 1kg', 870, 'https://coopar.com.uy/Files/Productos/8293E406E83A1921.jpg', 45697, 15)
//console.log('Mostramos los productos que existen: ',productManager.getProducts());
//console.log('buscamos un productos con id que existe: ', productManager.getProductById(1));
//console.log('buscamos un productos con id que NO existe: ', productManager.getProductById(789));

