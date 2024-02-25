
    const boton = document.getElementById("boton");

    boton.onclick = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        console.log('token almacenado en local storage', token)
        fetch('/api/sessions/current', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cookie: {'Authorization': `Bearer ${token}`}
        }).then((response) =>response.json()) //console.log(response, 'response 1'))
            .then((response) => {
                console.log(response); //DATOS DEL USUARIO
                window.location.href = "/profile";
            })
    };

