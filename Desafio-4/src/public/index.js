const socket = io();

const productsList =  document.getElementById('containerList')
const add =document.getElementById('add');
const price = document.getElementById('price');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const category = document.getElementById('category');
const idProduct = document.getElementById('idProduct');
const stock = document.getElementById('stock');
const btnCargar = document.getElementById('cargar');
const btnEliminar = document.getElementById('eliminar');


socket.on('products', (products)=>{
    console.log(JSON.stringify(products))
    let infoProducts = '';
    productsList.innerHTML = `<ul>`;
    products.forEach(p=>{
        console.log(JSON.stringify(p))
        infoProducts += `<li>
        <strong>Titulo: </strong>${p.title}<br>
        <strong>PricePrice: </strong>${p.price}<br>
        <strong>Description: </strong>${p.description}}<br>
        <strong>Category: </strong>${p.category}<br>
        </li>`
    })
    productsList.innerHTML = infoProducts
    console.log(productsList);
    products.innerHTML = '</ul>';
    cleanForm();
})

function cleanForm(){
    price.value = '';
    title.value = '';
    code.value = '';
    description.value = '';
    category.value= '';
    stock.value = '';
};

