document.addEventListener('DOMContentLoaded', function() {
 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const textos = [
            'Desenvolvedor apaixonado por tecnologia.',
            'Experiência com React Native, Flutter e JavaScript.',
            'Criando interfaces modernas e responsivas.',
            'Transformando ideias em produtos digitais.',
            'Sempre aprendendo e inovando.'
        ];
        let textoIndex = 0;
        let charIndex = 0;
        let typingDelay = 70;
        let erasingDelay = 40;
        let newTextDelay = 1200;
        let timeoutId = null;

        function type() {
            if (timeoutId) clearTimeout(timeoutId);
            
            if (charIndex < textos[textoIndex].length) {
                typingElement.textContent = textos[textoIndex].substring(0, charIndex + 1);
                charIndex++;
                timeoutId = setTimeout(type, typingDelay);
            } else {
                timeoutId = setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (timeoutId) clearTimeout(timeoutId);
            
            if (charIndex > 0) {
                charIndex--;
                typingElement.textContent = textos[textoIndex].substring(0, charIndex);
                timeoutId = setTimeout(erase, erasingDelay);
            } else {
                textoIndex = (textoIndex + 1) % textos.length;
                timeoutId = setTimeout(type, typingDelay + 300);
            }
        }
        
        typingElement.textContent = '';
        timeoutId = setTimeout(type, 800);
    }

    const carouselContainer = document.querySelector('.carousel-projetos');
    if (carouselContainer) {
        let currentProjetos = 0;
        const slidesProjetos = document.querySelectorAll('.carousel-slide');
        const indicatorsProjetos = document.querySelectorAll('.carousel-indicator');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const totalProjetos = slidesProjetos.length;
        let intervalProjetos;

        if (slidesProjetos.length > 0 && indicatorsProjetos.length > 0 && prevBtn && nextBtn) {

            function showSlideProjetos(n) {
                currentProjetos = (n + totalProjetos) % totalProjetos;
                
                slidesProjetos.forEach((slide, i) => {
                    slide.classList.toggle('active', i === currentProjetos);
                });
                indicatorsProjetos.forEach((ind, i) => {
                    ind.classList.toggle('active', i === currentProjetos);
                });
            }

            function nextProjetos() {
                showSlideProjetos(currentProjetos + 1);
            }

            function startAutoProjetos() {
                clearInterval(intervalProjetos); 
                intervalProjetos = setInterval(nextProjetos, 8000);
            }

            function resetAutoProjetos() {
                startAutoProjetos();
            }

            prevBtn.addEventListener('click', () => {
                showSlideProjetos(currentProjetos - 1);
                resetAutoProjetos();
            });

            nextBtn.addEventListener('click', () => {
                showSlideProjetos(currentProjetos + 1);
                resetAutoProjetos();
            });

            indicatorsProjetos.forEach((ind, i) => {
                ind.addEventListener('click', () => {
                    showSlideProjetos(i);
                    resetAutoProjetos();
                });
            });

            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                projectsSection.addEventListener('mouseenter', () => {
                    clearInterval(intervalProjetos);
                });
                projectsSection.addEventListener('mouseleave', () => {
                    startAutoProjetos();
                });
            }

            document.addEventListener('keydown', (e) => {
                const rect = carouselContainer.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

                if (isVisible) {
                    if (e.key === 'ArrowLeft') {
                        showSlideProjetos(currentProjetos - 1);
                        resetAutoProjetos();
                    } else if (e.key === 'ArrowRight') {
                        showSlideProjetos(currentProjetos + 1);
                        resetAutoProjetos();
                    }
                }
            });

            let startX = 0;
            carouselContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            carouselContainer.addEventListener('touchend', (e) => {
                let endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        showSlideProjetos(currentProjetos + 1);
                    } else {
                        showSlideProjetos(currentProjetos - 1);
                    }
                    resetAutoProjetos();
                }
            });
            
            showSlideProjetos(0);
            startAutoProjetos();
        }
    }
});