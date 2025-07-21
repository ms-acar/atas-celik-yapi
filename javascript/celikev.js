// celikev.js
// Renk paleti
const blue = '#2563eb';
const orange = '#f97316';
// Klasör isimleri ve tipleri
const celikEvler = [
  { name: "Ataş – 102 160 m²", type: "tek kat" },
  { name: "Ataş – 103 160.63 m²", type: "çift kat" },
  { name: "Ataş – 104 210.8 m²", type: "çift kat" },
  { name: "Ataş – 105 100 m²", type: "tek kat" },
  { name: "Ataş – 107 206 m²", type: "tek kat" },
  { name: "Ataş – 108 177 m²", type: "tek kat" },
  { name: "Ataş – 109 225 m²", type: "tek kat" },
  { name: "Ataş – 152 86 m²", type: "tek kat" },
  { name: "Ataş – 201 200 m²", type: "çift kat" },
  { name: "Ataş – 202 255 m²", type: "çift kat" },
  { name: "Ataş – 203 208 m²", type: "çift kat" },
  { name: "Ataş – 239 171.44 m²", type: "çift kat" },
  { name: "Ataş – 239 303.5 m²", type: "çift kat" },
  { name: "Ataş – 240 354.6 m²", type: "çift kat" },
  { name: "Ataş – 301 345 m²", type: "çift kat" },
  { name: "Ataş – 302 149 m²", type: "çift kat" },
  { name: "Ataş – 303 99 m²", type: "çift kat" },
  { name: "Ataş – 308 144 m²", type: "çift kat" },
  { name: "Ataş – 309 148 m²", type: "çift kat" },
  { name: "Ataş – 310 170 m²", type: "çift kat" },
  { name: "Ataş – 315 149 m²", type: "çift kat" },
  { name: "Ataş – 317 141 m²", type: "çift kat" },
  { name: "Ataş – 422 164 m²", type: "çift kat" },
  { name: "Ataş – 425 145 m²", type: "çift kat" }
];
const cardsContainer = document.getElementById('celikev-cards');
// Metrekareleri çıkar
const metrekareSet = new Set();
celikEvler.forEach(ev => {
  const match = ev.name.match(/([0-9]+([.,][0-9]+)?)\s*m[²2]/i);
  if (match) metrekareSet.add(match[1].replace(",", "."));
});
const metrekareler = Array.from(metrekareSet).sort((a,b)=>parseFloat(a)-parseFloat(b));
const cardsPerPage = 10;
let currentPage = 1;

function renderCardsPaginated(filterType, filterM2, page = 1) {
  cardsContainer.innerHTML = '';
  let filtered = celikEvler.filter(ev => {
    let show = true;
    if (filterType && ev.type !== filterType) show = false;
    if (filterM2) {
      const match = ev.name.match(/([0-9]+([.,][0-9]+)?)\s*m[²2]/i);
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
    const imgPath = `images/celikev/${ev.name}/1.jpg`;
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl border p-4 flex flex-col shadow hover:shadow-lg transition';
    card.innerHTML = `
      <div class=\"relative\">\n
      <span class=\"absolute top-2 left-2\" style=\"background:${blue};color:white;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:6px;\">Çelik Ev</span>\n
      <img src=\"${imgPath}\" alt=\"${ev.name}\" class=\"rounded-t-lg w-full h-56 object-cover mb-2\" onerror=\"this.src='images/cards/edirne15.jpg'\">\n
      </div>\n
      <div class=\"flex-1 flex flex-col justify-between\">\n
      <h3 class=\"text-lg font-semibold mb-2\" style=\"color:${blue}\">${ev.name}</h3>\n
      <div class=\"flex gap-2 mt-auto\">\n
      <button type=\"button\" class=\"flex-1 text-center py-2 rounded fiyat-al-btn\" style=\"background:${orange};color:white;font-weight:600;\">Fiyat Al</button>\n
      <a href=\"urun.html?ev=${encodeURIComponent(ev.name)}\" class=\"flex-1 text-center py-2 rounded\" style=\"background:${blue};color:white;font-weight:600;\">İncele</a>\n
      </div>\n
      </div>\n
      `;
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

// Filtre butonlarınızda ve dropdown'da renderCards yerine renderCardsPaginated kullanın!
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