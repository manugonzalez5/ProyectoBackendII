document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const courseId = button.getAttribute('data-id');
            const confirmed = confirm('¿Querés eliminar este curso?');
            if (!confirmed) return;

            try {
                const response = await fetch(`/api/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // Opcional: recargar la página o eliminar el curso del DOM
                    window.location.reload();
                } else {
                    alert('Error al eliminar el curso');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el curso');
            }
        });
    });
});