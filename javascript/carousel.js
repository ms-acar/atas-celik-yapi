const container = document.querySelector('.scroll-container');
const sections = document.querySelectorAll('.scroll-section');
const dots = document.querySelectorAll('.fixed.right-8 button');
const navDots = document.getElementById('nav-dots');
let isScrolling = false;

function scrollToSection(index) {
    if (!isScrolling) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        updateDots(index);
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

function updateDots(index) {
    dots.forEach((dot, i) => {
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
            i === index ? 'bg-white scale-150' : 'bg-white/20 hover:bg-white hover:scale-150'
        }`;
    });
}

// Update dots on window scroll
window.addEventListener('scroll', () => {
    let closest = 0;
    let minDiff = Infinity;
    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const diff = Math.abs(rect.top);
        if (diff < minDiff) {
            minDiff = diff;
            closest = i;
        }
    });
    updateDots(closest);

    // Son section'ın altına gelindiyse dots'ları gizle
    const lastSection = sections[sections.length - 1];
    const lastRect = lastSection.getBoundingClientRect();
    if (lastRect.bottom < window.innerHeight * 0.5) {
        navDots.style.display = 'none';
    } else {
        navDots.style.display = '';
    }
});

// Initialize first dot
updateDots(0);