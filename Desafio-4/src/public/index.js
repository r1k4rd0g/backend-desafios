const socket = io();
const form =document.getElementById('form');
const inputPrice = document.getElementById('price');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputCategory = document.getElementById('category');
const inputIdProduct = document.getElementById('idProduct');
const inputStock = document.getElementById('stock');
const btnCargar = document.getElementById('cargar');
const btnEliminar = document.getElementById('eliminar');

newProduct = {inputPrice, inputTitle, inputCode, inputDescription, inputCategory, inputStock};



/*form.onsubmit =(e) =>{
    e.preventDefault();
    const price = inputPrice.value;
    const title = inputTitle.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const category = inputCategory.value;
    const stock = inputStock.value;
    const newProduct = {price, title, description, code, category, stock};
    socket.emit('nuevoProducto', newProduct);
}*/


/*btnCargar.addEventListener('click', ()=>{
    socket.emit('newProduct', {
        price : inputPrice.value,
        title : inputTitle.value,
        code : inputCode.value,
        description : inputDescription.value,
        category : inputCategory.value,
        stock: inputStock.value,
    });
    console.log('console 3', newProduct)
    //limpiamos el formulario:
    cleanForm();
});


function cleanForm(){
    inputPrice.value = '';
    inputTitle.value = '';
    inputCode.value = '';
    inputDescription.value = '';
    inputCategory.value= '';
    inputStock.value = '';
};
*/
