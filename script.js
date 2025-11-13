// Navegación responsive
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Cambiar estilo del header al hacer scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(10, 14, 23, 0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.background = "rgba(10, 14, 23, 0.9)";
        header.style.boxShadow = "none";
    }
});

// Carrusel de proyectos
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");
const dotsNav = document.querySelector(".carousel-dots");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Organizar las slides una al lado de la otra
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("active");
    targetSlide.classList.add("active");
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("active");
    targetDot.classList.add("active");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.style.visibility = "hidden";
        nextButton.style.visibility = "visible";
    } else if (targetIndex === slides.length - 1) {
        prevButton.style.visibility = "visible";
        nextButton.style.visibility = "hidden";
    } else {
        prevButton.style.visibility = "visible";
        nextButton.style.visibility = "visible";
    }
};

// Al hacer clic en el botón siguiente, mover la slide a la derecha
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".active");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// Al hacer clic en el botón anterior, mover la slide a la izquierda
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".active");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".active");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// Al hacer clic en los indicadores, mover a la slide correspondiente
dotsNav.addEventListener("click", e => {
    const targetDot = e.target.closest("span");
    
    if (!targetDot) return;
    
    const currentSlide = track.querySelector(".active");
    const currentDot = dotsNav.querySelector(".active");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// Animación de barras de habilidades
const animateSkillBars = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level') + '%';
        level.style.width = width;
    });
};

// Observador para animar elementos cuando son visibles
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            
            // Si es la sección de habilidades, animar las barras
            if (entry.target.id === 'habilidades') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
});

// Efectos de hover mejorados para las tarjetas
const skillCards = document.querySelectorAll(".skill-card, .certification-card, .soft-skill-card");
skillCards.forEach(card => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-10px)";
    });
    
    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
    });
});

// Formulario de contacto
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para enviar el formulario
        // Por ahora solo mostraremos una alerta
        alert("¡Gracias por tu mensaje! Te contactaré pronto.");
        this.reset();
    });
}

// Animación de entrada para las secciones
document.addEventListener("DOMContentLoaded", function() {
    // Agregar clase para animación después de que la página cargue
    setTimeout(() => {
        document.querySelector("body").classList.add("loaded");
    }, 100);
    
    // Inicializar animación de barras de habilidades si la sección es visible
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection && isElementInViewport(skillsSection)) {
        animateSkillBars();
    }
});

// Función auxiliar para verificar si un elemento está en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

