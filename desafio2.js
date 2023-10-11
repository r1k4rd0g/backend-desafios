const fs = require('fs');

class ProductManager{
    constructor(){
        this.path='./products.json'
    }
}
/*
addProduct debe:
    1-recibir un objeto
    2-asignarle un id autoincrementado
    3-guardarlo en el array del archivo. 
*/
    addProduct();

/*
getProducts debe:
    1-leer el archivo y devolver todos los productos existentes. 
*/
    getProducts();

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
