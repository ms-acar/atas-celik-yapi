const calismaImages = [
    { src: 'images/cards/edirne15.jpg', title: 'Çalışma 1', desc: 'Bu bir örnek açıklamadır. Dilediğiniz gibi değiştirebilirsiniz.' },
    { src: 'images/cards/prefabrik-yap_m-asamalar1.jpg', title: 'Çalışma 2', desc: 'Prefabrik yapı sürecinden bir kare. Açıklama metni buradan güncelleyebilirsiniz.' },
    { src: 'images/cards/gokkusag_4.jpg', title: 'Çalışma 3', desc: 'Gökkuşağı projesinden bir detay. Açıklama metni örneği.' },
    { src: 'images/cards/ucmakderetek_rdag31.jpg', title: 'Çalışma 4', desc: 'Uçmakdere projesi. Buraya istediğiniz metni yazabilirsiniz.' },
    { src: 'images/cards/anasayfa edirne celik.jpg', title: 'Çalışma 5', desc: 'Edirne çelik yapı çalışmamızdan bir görüntü.' },
  ];
  let calismaIndex = 0;
  const calismaImg = document.getElementById('calisma-img');
  const calismaTitle = document.getElementById('calisma-title');
  const calismaDesc = document.getElementById('calisma-desc');
  const calismaDots = document.querySelectorAll('.calisma-dot');
  function showCalisma(idx) {
    calismaImg.src = calismaImages[idx].src;
    calismaTitle.textContent = calismaImages[idx].title;
    calismaDesc.textContent = calismaImages[idx].desc;
    calismaDots.forEach((dot, i) => {
      dot.classList.toggle('bg-gray-800', i === idx);
      dot.classList.toggle('bg-gray-300', i !== idx);
    });
    calismaIndex = idx;
  }
  calismaDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showCalisma(i);
      resetCalismaInterval();
    });
  });
  function nextCalisma() {
    let next = (calismaIndex + 1) % calismaImages.length;
    showCalisma(next);
  }
  function prevCalisma() {
    let prev = (calismaIndex - 1 + calismaImages.length) % calismaImages.length;
    showCalisma(prev);
  }
  document.getElementById('calisma-prev').onclick = function() {
    prevCalisma();
    resetCalismaInterval();
  };
  document.getElementById('calisma-next').onclick = function() {
    nextCalisma();
    resetCalismaInterval();
  };
  let calismaInterval = setInterval(nextCalisma, 2500);
  function resetCalismaInterval() {
    clearInterval(calismaInterval);
    calismaInterval = setInterval(nextCalisma, 2500);
  }
  showCalisma(0);

  // ARA KARTLAR

const altKategoriler = [
  [
    { title: 'Çelik Ev Modelleri', desc: 'Modern tasarım, yüksek güvenlik.', link: "celikev.html" },
    { title: 'Neden Tercih Etmeli?', desc: 'İşlevsel ve hızlı kurulum.', link: "celikev.html" },
    { title: 'Yapım Aşamaları', desc: 'Firmamızın ürün teslimat aşamalarını inceleyin.', link: "celikev.html" },
  ],
  [
    { title: 'Yaşam Konteyneri', desc: 'Her yere taşınabilir yaşam alanı.', link: "konteyner.html" },
    { title: 'Şantiye Konteyneri', desc: 'Pratik ve ekonomik çözüm.', link: "konteyner.html" },
    { title: 'Ofis & Yönetim Konteyneri', desc: 'Kullanıma hazır ofis çözümleri.', link: "konteyner.html" },
  ],
  [
    { title: 'Tek-Katlı Prefabrik', desc: 'Hızlı kurulum, pratik kullanım.', link: "prefabrik.html"},
    { title: 'Çift-Katlı Prefabrik', desc: 'Geniş alan, çok katlı çözüm.', link: "prefabrik.html" },
    { title: 'Prefabrik Ev Planları', desc: 'Güvenli ve modern yaşam alanı.', link: "prefabrik.html"},
  ]
];
const altKategorilerDiv = document.getElementById('alt-kategoriler');
document.querySelectorAll('.kategori-card').forEach(card => {
  card.addEventListener('click', function() {
    const idx = +this.dataset.kategori;
    altKategorilerDiv.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        ${altKategoriler[idx].map(alt => `
          <a href="${alt.link}" class='bg-white rounded-lg shadow p-6 flex flex-col items-center'>
            <h4 class='text-lg font-bold mb-2'>${alt.title}</h4>
            <p class='text-gray-500 text-center'>${alt.desc}</p>
          </a>
        `).join('')}
      </div>
    `;
    window.scrollTo({ top: altKategorilerDiv.offsetTop - 100, behavior: 'smooth' });
  });
});
