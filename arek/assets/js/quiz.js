/* quiz.js - data + quiz logic (UI adjusted for new skin) */

const questions = [
  {
    tanya: "Apa kudapan khas Jember yang terbuat dari tape singkong dan sering dijadikan oleh-oleh?",
    opsi: ["Gudeg", "Suwar-Suwir", "Pempek"],
    jawaban: 1,
    fact: "Konon, suwar suwir telah menjadi oleh-oleh khas Kota Jember sejak zaman Belanda."
  },
  {
    tanya: "Nama lengkap pantai Papuma adalah ...",
    opsi: ["Pantai Pasir Putih Malikan", "Pantai Selatan Jember", "Pantai Rembangan"],
    jawaban: 0,
    fact: "Papuma adalah singkatan dari 'Pasir Putih Malikan'."
  },
  {
    tanya: "Komoditas Na-Oogst di Jember merujuk ke ...",
    opsi: ["Kopi spesial", "Tembakau", "Kakao"],
    jawaban: 1,
    fact: "Na-Oogst adalah jenis tembakau yang banyak dibudidayakan di beberapa daerah di Jawa Timur."
  },
  {
    tanya: "Rembangan lebih dikenal sebagai ...",
    opsi: ["Kawasan pantai", "Kawasan pegunungan sejuk", "Kota besar"],
    jawaban: 1,
    fact: "Rembangan terkenal karena pemandangan perbukitan dan udara sejuk."
  },
  {
    tanya: "Camilan oleh-oleh terkenal dari Jember berbahan dasar fermentasi ketan atau singkong disebut ...",
    opsi: ["Tape", "Krupuk", "Lapis Surabaya"],
    jawaban: 0,
    fact: "Tape sering diolah menjadi proll tape dan kue tradisional sebagai oleh-oleh."
  },
  {
    tanya: "Produk pertanian selain tembakau dan kopi yang penting di Jember adalah ...",
    opsi: ["Kakao", "Tebu", "Jagung"],
    jawaban: 0,
    fact: "Kakao di Jember mendukung pengolahan cokelat skala kecil."
  },
  {
    tanya: "Pecel pincuk Garahan khas karena penyajiannya dalam ...",
    opsi: ["Piring plastik", "Pincuk/daun pisang", "Mangkok tanah liat"],
    jawaban: 1,
    fact: "Penyajian 'pincuk' menambah aroma alami dan tradisi berkumpul."
  },
  {
    tanya: "Curug Tancak adalah ...",
    opsi: ["Sebuah pegunungan", "Sebuah air terjun", "Sebuah pasar tradisional"],
    jawaban: 1,
    fact: "Curug Tancak dikenal sebagai lokasi trekking dan ekowisata lokal."
  }
];

let qIndex = 0, score = 0, currentContainer = null;

function startQuiz(container) {
  qIndex = 0; score = 0; currentContainer = container;
  renderQuizShell(container);
  loadQuestion(container);
}

function renderQuizShell(container) {
  container.innerHTML = `
    <div class="card" id="quiz-shell">
      <div class="section-title">
        <h3>Mini Quiz — Jember</h3>
        <div class="section-sub kecil">Tes pengetahuan singkat</div>
      </div>
      <div id="quiz-body" class="content-body"></div>
    </div>
  `;
}

function loadQuestion(container) {
  const body = container.querySelector('#quiz-body');
  const q = questions[qIndex];
  body.innerHTML = `
    <div class="card quiz-quest">
      <h3>${qIndex + 1}. ${q.tanya}</h3>
      <div class="options" id="options">
        ${q.opsi.map((o, i) => `<button class="option-btn" data-i="${i}" onclick="checkAnswer(${i})">${o}</button>`).join('')}
      </div>
      <div id="feedback-area"></div>
    </div>
  `;
}

function checkAnswer(i) {
  const q = questions[qIndex];
  const opts = document.querySelectorAll('.option-btn');
  opts.forEach(b => { b.classList.add('disabled'); b.disabled = true; });

  const feedbackArea = document.getElementById('feedback-area');

  if (i === q.jawaban) {
    score++;
    feedbackArea.innerHTML = `
      <div class="feedback">
        <strong>Benar!</strong> Jawaban: <em>${q.opsi[q.jawaban]}</em>
        <div class="kecil" style="margin-top:6px">${q.fact}</div>
      </div>
      <div style="margin-top:10px">
        <button class="btn-cta" onclick="nextQuestion()">Lanjut</button>
      </div>
    `;
  } else {
    feedbackArea.innerHTML = `
      <div class="feedback">
        <strong>Salah.</strong> Jawaban yang benar: <em>${q.opsi[q.jawaban]}</em>
        <div class="kecil" style="margin-top:6px">${q.fact}</div>
      </div>
      <div style="margin-top:10px">
        <button class="btn-cta" onclick="nextQuestion()">Lanjut</button>
      </div>
    `;
  }
}

function nextQuestion() {
  qIndex++;
  const body = document.getElementById('quiz-body');
  if (qIndex < questions.length) {
    body.innerHTML = '<div class="kecil">Memuat soal berikutnya…</div>';
    setTimeout(() => loadQuestion(currentContainer), 180);
  } else {
    showResult();
  }
}

function showResult() {
  const body = document.getElementById('quiz-body');
  const total = questions.length;
  const ratio = score / total;
  let comment = '';
  if (ratio === 1) comment = "Wah, kamu ahli arek Jember! Semua jawaban benar. 🐚🌊";
  else if (ratio >= 0.7) comment = "Kamu lumayan arek Jember! Coba eksplor lagi bagian wisata ya! 🐚";
  else if (ratio >= 0.4) comment = "Lumayan! Baca lagi materi untuk skor yang lebih baik. 🌿";
  else comment = "Yuk belajar lebih banyak tentang Jember — mulai dari Materi! 🌊";

  body.innerHTML = `
    <div class="card result">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="score">${score} / ${total}</div>
        <div class="emoji">${ratio >= 0.7 ? '🐚' : '🌊'}</div>
      </div>
      <div class="kecil">${comment}</div>
      <div style="display:flex; gap:10px; margin-top:8px;">
        <button class="btn-cta" onclick="startQuiz(document.getElementById('content'))">Ulangi Quiz</button>
        <button class="card" onclick="loadMateri(document.getElementById('content'))" style="padding:10px 12px; border-radius:12px;">Baca Materi</button>
      </div>
    </div>
  `;
}
