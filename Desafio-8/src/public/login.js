
    const boton = document.getElementById("boton");

    boton.onclick = () => {
        const token = localStorage.getItem('token')
        console.log('token almacenado en local storage', token)
        fetch('/api/sessions/current', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => response.json())
            .then((response) => {
                console.log(response); //DATOS DEL USUARIO
            })
    };
