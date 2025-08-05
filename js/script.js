document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão de "pular"

            const targetId = this.getAttribute('href'); // Pega o ID (ex: "#sobre")
            const targetElement = document.querySelector(targetId); // Encontra o elemento alvo

            if (targetElement) { // Verifica se o elemento alvo existe
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Faz a rolagem suave
                });
            }
        });
    });
});