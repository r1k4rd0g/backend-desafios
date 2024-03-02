
const profile = document.getElementById("perfil");
const workWProduct = document.getElementById("workWProduct");
const toCart = document.getElementById('toCart');


profile.onclick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    //console.log('token almacenado en local storage', token)
    fetch('/api/sessions/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cookie: { 'Authorization': `Bearer ${token}` }
    }).then((response) => response.json()) //console.log(response, 'response 1'))
        .then((response) => {
            console.log(response); //DATOS DEL USUARIO
            window.location.href = "/profile";
        })
};

workWProduct.onclick = (e) => {
    e.preventDefault();
    window.location.href = "/realtimeproducts";
};


/** Agregar producto al carrito */
document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll('.addToCart');  // Todos los formularios con la clase addToCart
    forms.forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
                const productId = form.getAttribute('id')
                //console.log(productId, 'productId')
                //const productIdElement = form.querySelector('.productId');
                //const productId = productIdElement.getAttribute('data-product-id');
            const cartId = document.getElementById('cartId').getAttribute('data-cart-id');
            console.log('product id: ', productId, 'cart id:', cartId);
            const quantity = parseInt(form.querySelector("input[name='quantity']").value);
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            if (response.ok) {
                const result = await response.json();
                console.log('producto agregado al carrito:', result);
                alert('producto agregado al carrito con éxito');
            } else {
                console.log('error al agregar el producto al carrito');
            }
        });
    });
});


