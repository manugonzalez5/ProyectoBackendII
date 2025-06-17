document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart-btn');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const courseId = button.getAttribute('data-id');

            try {
                const response = await fetch('/api/cart/add', {
                    method: 'POST',
                    credentials: 'include',  // <--- OJO aquí!
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseId })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Curso agregado al carrito!');
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || response.statusText}`);
                }
            } catch (error) {
                alert('Error en la conexión: ' + error.message);
            }
        });
    });
});
