const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    // Validación rápida del frontend
    if (!obj.email || !obj.password) {
        alert('Por favor completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const json = await response.json();
            console.log(json);
            localStorage.setItem('authToken', json.access_token);
            localStorage.setItem('USER_ID', json.id);
            alert("¡Login realizado con éxito!");
            window.location.replace('/users/profile');
        } else if (response.status === 401 || response.status === 404) {
            const error = await response.json();
            alert(error.error || "Credenciales incorrectas");
        } else {
            // Otros errores (403, 500, etc)
            const error = await response.json();
            alert(error.error || "Ocurrió un error inesperado");
        }
    } catch (err) {
        console.error("Error en la petición:", err);
        alert("Error de conexión con el servidor");
    }
});