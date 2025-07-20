const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white', 'shadow-md', 'navbar-scrolled');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('bg-white', 'shadow-md', 'navbar-scrolled');
    navbar.classList.add('bg-transparent');
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('[data-collapse-toggle="mobile-menu-2"]');
    const mobileMenu = document.getElementById('mobile-menu-2');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeButton = document.getElementById('mobile-menu-close');

    function openMenu() {
        mobileMenu.classList.add('open');
        overlay.classList.add('open');
        mobileMenu.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('open');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            overlay.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    if (menuButton && mobileMenu && overlay) {
        menuButton.addEventListener('click', function (event) {
            event.stopPropagation();
            if (mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeMenu);
    }

    // Menüdeki linklere tıklanınca menüyü kapat
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (link.getAttribute('href').startsWith('#')) {
                closeMenu();
            }
        });
    });
});