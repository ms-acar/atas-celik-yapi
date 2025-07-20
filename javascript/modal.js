
// Tüm 'Fiyat Al' butonlarını seç
const openModalBtns = document.querySelectorAll('.fiyat-al-btn, #open-modal');
const modalBg = document.getElementById('modal-bg');
const closeModalBtn = document.getElementById('close-modal');
const modalForm = document.getElementById('modal-form');

if (openModalBtns && modalBg) {
  openModalBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      modalBg.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
  });
}
if (closeModalBtn && modalBg) {
  closeModalBtn.onclick = () => { modalBg.style.display = 'none'; document.body.style.overflow = ''; };
}
if (modalBg) {
  modalBg.onclick = (e) => { if (e.target === modalBg) { modalBg.style.display = 'none'; document.body.style.overflow = ''; } };
}
if (modalForm && modalBg) {
  modalForm.onsubmit = function(e) {
    e.preventDefault();
    alert('Talebiniz iletildi!');
    modalBg.style.display = 'none';
    document.body.style.overflow = '';
    this.reset();
  };
}
