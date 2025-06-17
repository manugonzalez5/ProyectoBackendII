const form = document.getElementById('adminLoginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    // Validación rápida de campos vacíos
    if (!obj.email || !obj.password) {
        alert("Por favor completá todos los campos.");
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
            console.log("Cookies generadas:");
            console.log(document.cookie);

            alert("¡Login realizado con éxito!");
            window.location.replace('/admin/courses');
        } else if (response.status === 401 || response.status === 404) {
            const error = await response.json();
            alert(error.error || "Credenciales inválidas.");
        } else {
            const error = await response.json();
            alert(error.error || "Ocurrió un error inesperado.");
        }
    } catch (err) {
        console.error("Error en la petición:", err);
        alert("Error de conexión con el servidor.");
    }
});
