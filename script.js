document.addEventListener('DOMContentLoaded', () => {
    // Menu icon logic for mobile
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            const currentDisplay = window.getComputedStyle(navLinks).display;
            if (currentDisplay === 'none') {
                navLinks.style.display = 'flex';
                // Adjust for mobile view temporarily
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(9, 9, 11, 0.95)';
                navLinks.style.padding = '2rem 0';
            } else {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
            }
        });

        // Close it if user clicks a link (on mobile)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = '';
                    navLinks.style.flexDirection = '';
                    navLinks.style.position = '';
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.padding = '';
            }
        });
    }

    // Gallery Filters logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Change active button state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterText = btn.textContent.trim().toLowerCase();

                galleryItems.forEach(item => {
                    const img = item.querySelector('img');
                    const imgAlt = img ? img.alt.toLowerCase() : '';
                    
                    if (filterText === 'todos') {
                        item.style.display = 'block';
                    } else if (filterText.includes(imgAlt) || imgAlt.includes(filterText.substring(0, 5))) {
                        // Matches basically if filter="cocinas" and alt="cocina"
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    // AJAX Form Submission Logic (FormSubmit)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue y te mande a otra web

            // Cambiar apariencia del botón mientras se envía
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'ENVIANDO...';
            submitBtn.disabled = true;

            // Recoger los datos del formulario
            const formData = new FormData(contactForm);

            // Enviar a FormSubmit Vía Fetch API (AJAX)
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    formMessage.innerText = '¡Gracias! Tu solicitud ha sido enviada con éxito.';
                    formMessage.style.backgroundColor = 'rgba(37, 211, 102, 0.2)'; // Verde transparente
                    formMessage.style.color = '#25D366';
                    formMessage.style.display = 'block';
                    contactForm.reset(); // Limpiar el formulario
                } else {
                    // Si hay un error, mostrarlo
                    formMessage.innerText = 'Hubo un problema al enviar el formulario. Intenta nuevamente.';
                    formMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Rojo transparente
                    formMessage.style.color = '#ff6b6b';
                    formMessage.style.display = 'block';
                }
            })
            .catch(error => {
                formMessage.innerText = 'Error de conexión. Verifica tu internet y vuelve a intentar.';
                formMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Rojo transparente
                formMessage.style.color = '#ff6b6b';
                formMessage.style.display = 'block';
            })
            .finally(() => {
                // Restaurar el botón original
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                // Ocultar el mensaje después de 5 segundos (Opcional)
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        });
    }
});
