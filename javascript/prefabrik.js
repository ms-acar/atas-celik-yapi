const blue = '#2563eb';
const orange = '#f97316';
const prefabrikEvler = [
  { name: 'Tek Katlı Prefabrik Konut 166m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 166m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 129m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 129m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 98m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 98m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 95m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 95m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 90m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 90m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 81m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 81m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 75m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 75m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 68m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 68m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 62m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 62m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 53m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 53m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 49m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 49m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 45m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 45m².jpg' },
  { name: 'Tek Katlı Prefabrik Konut 40m²', type: 'tek kat', folder: 'tek', img: 'Tek Katlı Prefabrik Konut 40m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 158m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 158m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 155m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 155m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 150m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 150m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 149m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 149m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 142m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 142m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 134m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 134m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 131m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 131m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 122m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 122m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 114m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 114m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 105m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 105m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 100m² (çeşit-2)', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 100m² (çeşit-2).jpg' },
  { name: 'Çift Katlı Prefabrik Konut 100m² (çeşit-1)', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 100m² (çeşit-1).jpg' },
  { name: 'Çift Katlı Prefabrik Konut 86m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 86m².jpg' },
  { name: 'Çift Katlı Prefabrik Konut 80m²', type: 'çift kat', folder: 'cift', img: 'Çift Katlı Prefabrik Konut 80m².jpg' }
];
const cardsContainer = document.getElementById('prefabrik-cards');
const metrekareSet = new Set();
prefabrikEvler.forEach(ev => {
  const match = ev.name.match(/([0-9]+([.,][0-9]+)?)m²/);
  if (match) metrekareSet.add(match[1].replace(",", "."));
});
const metrekareler = Array.from(metrekareSet).sort((a,b)=>parseFloat(a)-parseFloat(b));
const cardsPerPage = 10;
let currentPage = 1;

function renderCardsPaginated(filterType, filterM2, page = 1) {
  cardsContainer.innerHTML = '';
  let filtered = prefabrikEvler.filter(ev => {
    let show = true;
    if (filterType && ev.type !== filterType) show = false;
    if (filterM2) {
      const match = ev.name.match(/([0-9]+([.,][0-9]+)?)m²/);
      if (!match || match[1].replace(",", ".") !== filterM2) show = false;
    }
    return show;
  });

  const totalPages = Math.ceil(filtered.length / cardsPerPage);
  currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCards = filtered.slice(start, end);

  pageCards.forEach(ev => {
    const imgPath = `images/prefabrik/${ev.folder}/${ev.img}`;
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl border p-4 flex flex-col shadow hover:shadow-lg transition';
    card.innerHTML = `
      <div class=\"relative\">\n
      <span class=\"absolute top-2 left-2\" style=\"background:${blue};color:white;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:6px;\">Prefabrik Ev</span>\n
      <img src=\"${imgPath}\" alt=\"${ev.name}\" class=\"rounded-t-lg w-full h-56 object-cover mb-2\" onerror=\"this.src='images/cards/edirne15.jpg'\">\n
      </div>\n
      <div class=\"flex-1 flex flex-col justify-between\">\n
      <h3 class=\"text-lg font-semibold mb-2\" style=\"color:${blue}\">${ev.name}</h3>\n
      <div class=\"flex gap-2 mt-auto\">\n
      <button type=\"button\" class=\"flex-1 text-center py-2 rounded fiyat-al-btn\" style=\"background:${orange};color:white;font-weight:600;\">Fiyat Al</button>\n
      <a href=\"urun.html?ev=images/prefabrik/${ev.folder}/${ev.img}\" class=\"flex-1 text-center py-2 rounded\" style=\"background:${blue};color:white;font-weight:600;\">İncele</a>\n
      </div>\n
      </div>\n
      `;
      // <div class=\"relative\">\n
      // <span class=\"absolute top-2 left-2\" style=\"background:${blue};color:white;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:6px;\">Çelik Ev</span>\n
      // <img src=\"${imgPath}\" alt=\"${ev.name}\" class=\"rounded-t-lg w-full h-56 object-cover mb-2\" onerror=\"this.src='images/cards/edirne15.jpg'\">\n
      // </div>\n
      // <div class=\"flex-1 flex flex-col justify-between\">\n
      // <h3 class=\"text-lg font-semibold mb-2\" style=\"color:${blue}\">${ev.name}</h3>\n
      // <div class=\"flex gap-2 mt-auto\">\n
      // <button type=\"button\" class=\"flex-1 text-center py-2 rounded fiyat-al-btn\" style=\"background:${orange};color:white;font-weight:600;\">Fiyat Al</button>\n
      // <a href=\"urun.html?ev=${encodeURIComponent(ev.name)}\" class=\"flex-1 text-center py-2 rounded\" style=\"background:${blue};color:white;font-weight:600;\">İncele</a>\n
      // </div>\n
      // </div>\n
      // `;
    cardsContainer.appendChild(card);
  });

  document.getElementById('urun-sayac').textContent = filtered.length + ' ürün listelendi';
  renderPagination(totalPages, currentPage, filterType, filterM2);
  if (window.attachModalEvents) window.attachModalEvents();
}

    // Mobilde m2 dropdown tıklama ile açılıp kapanmalı, açıkken içine tıklanınca kapanmasın
    document.addEventListener('DOMContentLoaded', function() {
      var btn = document.getElementById('custom-dropdown-btn');
      var list = document.getElementById('custom-dropdown-list');
      if(btn && list) {
        btn.onclick = function(e) {
          e.stopPropagation();
          if(list.classList.contains('show')) {
            list.classList.remove('show');
          } else {
            list.classList.add('show');
          }
        };
        list.onclick = function(e) {
          e.stopPropagation(); // Listeye tıklanınca kapanmasın
        };
        // Sayfada başka yere tıklanınca kapansın
        document.addEventListener('click', function(e) {
          if(!btn.contains(e.target) && !list.contains(e.target)) {
            list.classList.remove('show');
          }
        });
      }
    });

function renderPagination(totalPages, currentPage, filterType, filterM2) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'px-4 py-2 rounded border font-semibold' + (i === currentPage ? ' bg-[#024CAA] text-white' : ' bg-white text-black');
    btn.onclick = () => renderCardsPaginated(filterType, filterM2, i);
    pagination.appendChild(btn);
  }
}

function setupCustomDropdown(onSelect) {
  const wrapper = document.getElementById('custom-dropdown-wrapper');
  const btn = document.getElementById('custom-dropdown-btn');
  const list = document.getElementById('custom-dropdown-list');

  if (!wrapper || !btn || !list) return;

  btn.setAttribute('aria-expanded', 'false');

  // Listeyi m² seçenekleriyle doldur
  list.innerHTML = '<li data-value="">Tüm m²</li>' + metrekareler.map(m2 =>
    `<li data-value="${m2}">${m2} m²</li>`
  ).join('');

  function openDropdown() {
    list.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    list.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    list.classList.toggle('hidden');
    const isHidden = list.classList.contains('hidden');
    btn.setAttribute('aria-expanded', !isHidden);
  }

  // Tıklama ile menüyü aç/kapat
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Sadece masaüstünde fareyle üzerine gelince aç
  let leaveTimeout;
  wrapper.addEventListener('mouseenter', () => {
    if (window.innerWidth >= 768) {
      clearTimeout(leaveTimeout);
      openDropdown();
    }
  });

  // Sadece masaüstünde fareyle dışarı çıkınca kapat
  wrapper.addEventListener('mouseleave', () => {
    if (window.innerWidth >= 768) {
      leaveTimeout = setTimeout(closeDropdown, 200);
    }
  });

  // Dışarıya tıklanınca menüyü kapat
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Menüden bir öğe seçilince
  list.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (e) => {
      btn.childNodes[0].nodeValue = li.textContent;
      closeDropdown();
      onSelect(li.getAttribute('data-value'));
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupCustomDropdown(function(selectedM2) {
    renderCardsPaginated(null, selectedM2 || null, 1);
  });
  document.getElementById('filter-all').onclick = function() {
    renderCardsPaginated();
    this.style.background = blue; this.style.color = 'white';
    document.getElementById('filter-tek').style.background = orange;
    document.getElementById('filter-cift').style.background = orange;
    highlightMetrekare('');
    metrekareDropdown.value = '';
  };
  document.getElementById('filter-tek').onclick = function() {
    renderCardsPaginated('tek kat', null, 1);
    this.style.background = blue; this.style.color = 'white';
    document.getElementById('filter-all').style.background = orange;
    document.getElementById('filter-all').style.color = 'white';
    document.getElementById('filter-cift').style.background = orange;
    highlightMetrekare('');
    metrekareDropdown.value = '';
  };
  document.getElementById('filter-cift').onclick = function() {
    renderCardsPaginated('çift kat', null, 1);
    this.style.background = blue; this.style.color = 'white';
    document.getElementById('filter-all').style.background = orange;
    document.getElementById('filter-all').style.color = 'white';
    document.getElementById('filter-tek').style.background = orange;
    highlightMetrekare('');
    metrekareDropdown.value = '';
  };
  ['filter-all','filter-tek','filter-cift'].forEach(id=>{
    document.getElementById(id).addEventListener('click',()=>{
      highlightMetrekare('');
      metrekareDropdown.value = '';
    });
  });
  renderCardsPaginated();
}); 