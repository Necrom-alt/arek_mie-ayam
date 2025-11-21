const materiList = [
  {
    judul: "Makanan Khas — Suwar-Suwir",
    isi: "Suwar suwir adalah kudapan yang terbuat dari bahan tape singkong yang dicampur dengan gula, susu, serta cokelat.",
    funfact: "Konon, suwar suwir telah menjadi oleh-oleh khas Kota Jember sejak zaman Belanda.",
    img: "assets/img/suwar-suwir.webp",
    credit: "Youtube: Dapur Difa"
  },
  {
    judul: "Makanan Khas — Pecel Pincuk Garahan",
    isi: "Pecel pincuk Garahan disajikan dalam daun pisang (pincuk). Bumbu kacangnya khas dan biasanya disajikan dengan lauk tempe dan peyek.",
    funfact: "Penyajian pincuk memperkuat rasa komunitas karena biasa dibagikan untuk makan bersama.",
    img: "assets/img/pecel-pincuk.jpg",
    credit: "Google: tampang.com"
  },
  {
    judul: "Oleh-oleh — Tape & Proll Tape",
    isi: "Tape ketan/singkong dan proll tape adalah oleh-oleh manis yang tahan lama. Diolah menjadi camilan atau kue lokal.",
    funfact: "Proll tape dibuat agar tape lebih praktis dijadikan oleh-oleh (kering/gorengan).",
    img: "assets/img/proll-tape.jpg",
    credit: "Google: cookpad.com"
  },
  {
    judul: "Wisata — Pantai Papuma",
    isi: "Papuma memiliki pasir putih, tebing karang, dan pemandangan laut yang menarik untuk sunrise/sunset. Spot foto populer di kalangan pengunjung.",
    funfact: "Papuma adalah singkatan dari 'Pasir Putih Malikan'.",
    img: "assets/img/pantai-papuma.webp",
    credit: "Google: traveloka.com"
  },
  {
    judul: "Wisata — Rembangan",
    isi: "Rembangan adalah dataran tinggi dengan udara sejuk, perbukitan, dan kebun teh. Favorit untuk camping dan landscape photography.",
    funfact: "Rembangan sering digunakan untuk kegiatan family outing dan foto prewedding.",
    img: "assets/img/puncak-rembangan.webp",
    credit: "Instagram: @pesonajember"
  },
  {
    judul: "Wisata — Curug Tancak",
    isi: "Curug Tancak menawarkan jalur trekking dan pemandangan air terjun yang asri. Tempat cocok untuk ekowisata komunitas.",
    funfact: "Curug Tancak jadi favorit lokal untuk rekreasi alam dekat kota.",
    img: "assets/img/curug-tancak.jpg",
    credit: "Google: indonesiakaya.com"
  },
  {
    judul: "Komoditas — Tembakau (Na-Oogst)",
    isi: "Jember penghasil tembakau beberapa varietas, termasuk Na-Oogst yang dipanen untuk industri rokok/cerutu.",
    funfact: "Tembakau mendukung ekonomi petani lokal dan perdagangan komoditas.",
    img: "assets/img/tembakau-na-oogst.jpg",
    credit: "Google: surabaya.tribunnews.com"
  },
  {
    judul: "Komoditas — Kopi",
    isi: "Kopi dari dataran tertentu di Jember bisa punya profil citarasa khas; kini beberapa petani mengembangkan kopi specialty.",
    funfact: "Workshop roasting dan cupping mulai menjadi kegiatan wisata kopi lokal.",
    img: "assets/img/kopi.jpg",
    credit: "Google: surabaya.bisnis.com"
  },
  {
    judul: "Komoditas — Kakao",
    isi: "Kakao menjadi sumber pendapatan alternatif. Olahan lokal mendukung usaha cokelat skala kecil.",
    funfact: "Kakao lokal diproses di pabrik skala kecil menjadi produk artisan.",
    img: "assets/img/kakao.jpg",
    credit: "Google: travel.kompas.com"
  }
];

function loadMateri(container) {
  const html = `
    <div class="card" id="materi-shell">
      <div class="section-title">
        <h3>Materi — Jember</h3>
        <div class="section-sub kecil">Makanan, wisata, dan komoditas utama</div>
      </div>
      <div class="content-body">
        ${materiList.map(m => `
          <div class="materi-item card">
            ${m.img ? `
            <img src="${m.img}" class="materi-img" alt="${m.judul}">
            ${m.credit ? `<p class="materi-credit">${m.credit}</p>` : ""}
           ` : ""}
            <h4>${m.judul}</h4>
            <p>${m.isi}</p>
            <div class="funfact"><strong>Fun Fact:</strong> ${m.funfact}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
  const el = document.getElementById('materi-shell');
  if (el) {
    el.classList.add('fade-wrap');
    requestAnimationFrame(() => el.classList.add('show'));
  }
}
