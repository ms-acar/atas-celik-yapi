document.addEventListener('DOMContentLoaded', function() {
    var copy = document.querySelector(".logos-slide").cloneNode(true);
    document.querySelector(".logos").appendChild(copy);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    
    document.querySelectorAll('.fade-content').forEach((el) => {
      observer.observe(el);
    });
    
    window.addEventListener('scroll', function () {
      const content = document.querySelector('.fade-content');
      if (!content) return; // Hata engelleme
      const contentPosition = content.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
    
      if (contentPosition < screenPosition) {
        content.classList.add('fade-in');
      }
    });
});    