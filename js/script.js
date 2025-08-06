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

// === CAROUSEL FUNCTIONALITY ===
let currentSlide = 0;
const slides = document.querySelectorAll('.projeto-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoSlideInterval;

// Função para mostrar slide específico
function showSlide(index) {
    // Remove active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adiciona active ao slide e indicador atual
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Move o carousel track
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${index * 25}%)`;
    
    currentSlide = index;
}

// Função para mudar slide (navegação manual)
function changeSlide(direction) {
    const newSlide = (currentSlide + direction + totalSlides) % totalSlides;
    showSlide(newSlide);
    resetAutoSlide();
}

// Função para ir para slide específico (indicadores)
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Auto slide function
function nextSlide() {
    const newSlide = (currentSlide + 1) % totalSlides;
    showSlide(newSlide);
}

// Função para resetar o auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
    startAutoSlide();
}

// Função para iniciar auto slide
function startAutoSlide() {
    // Garante que não há múltiplos intervalos rodando
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextSlide, 5000); 
}

// Event listeners para indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Pausar auto slide quando mouse estiver sobre o carousel ou interagindo com ele
const carouselContainer = document.querySelector('.carousel-container');
const projectSlides = document.querySelectorAll('.projeto-slide');

if (carouselContainer) {
    // Pausar quando mouse entrar no container do carrossel
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    });
    
    // Retomar quando mouse sair do container do carrossel
    carouselContainer.addEventListener('mouseleave', () => {
        // Pequeno delay para evitar conflitos
        setTimeout(() => {
            if (!carouselContainer.matches(':hover')) {
                startAutoSlide();
            }
        }, 100);
    });
}

// Pausar especificamente quando mouse estiver sobre os projetos
projectSlides.forEach(slide => {
    slide.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    });
    
    slide.addEventListener('mouseleave', () => {
        // Só retoma se não estiver mais sobre o carousel container
        setTimeout(() => {
            if (!carouselContainer.matches(':hover')) {
                startAutoSlide();
            }
        }, 100);
    });
});

// Iniciar auto slide quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0); // Mostrar primeiro slide
        startAutoSlide(); // Iniciar auto slide
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch support para mobile
let startX = 0;
let endX = 0;

carouselContainer?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselContainer?.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}