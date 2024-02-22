

const formLogin = document.getElementById("formLogin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

formLogin.onsubmit = (e) => {
    //e.preventDefault(); //para que la página no se refresque
    fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            'Content-Type': 'application/json' //esto va por defecto
        },
    })
        .then((response) => {
            response.header()
            response.cookies
        }) //responde por el token
        .then((response) => {
            console.log(response); //token
            localStorage.setItem('token', response)
        })
}
