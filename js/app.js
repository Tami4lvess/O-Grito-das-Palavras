/* ========================================================
   O GRITO DAS PALAVRAS — app.js
   SPA completo: sem window.open, sem livro.html separado
   ======================================================== */

/* ── Dados ── */
const COVERS = [
  { file:'assets/covers/dali.png',            name:'A Persistência da Memória (1931) — Salvador Dalí' },
  { file:'assets/covers/klimt.png',           name:'O Beijo (1907-08) — Gustav Klimt' },
  { file:'assets/covers/girassois.png',       name:'Os Girassóis (1888) — Vincent van Gogh' },
  { file:'assets/covers/monalisa.png',        name:'Mona Lisa (c.1503-19) — Leonardo da Vinci' },
  { file:'assets/covers/noite_estrelada.png', name:'Noite Estrelada (1889) — Vincent van Gogh' },
  { file:'assets/covers/guernica.png',        name:'Guernica (1937) — Pablo Picasso' },
  { file:'assets/covers/abaporu.png',         name:'Abaporu (1928) — Tarsila do Amaral' },
];

const POEMAS = {
  romance: [
    { author:'Pablo Neruda', work:'Vinte Poemas de Amor e Uma Canção Desesperada', part:'Abertura — O chamado do amor',
      lines:'Posso escrever os versos mais tristes esta noite.\nEscrever, por exemplo: "A noite está estrelada,\ne tilintam, azuis, os astros, ao longe."\nO vento da noite gira no céu e canta.\nEu a amei, e às vezes ela também me amava.' },
    { author:'Florbela Espanca', work:'Livro de Sóror Saudade', part:'Movimento I — A saudade como forma de amor',
      lines:'Eu quero amar, amar perdidamente!\nAmar só por amar: aqui… além…\nMais Este e Aquele, o Outro e toda a gente…\nAmar! Amar! E não amar ninguém!' },
    { author:'Fernando Pessoa (Álvaro de Campos)', work:'Lisbon Revisited', part:'Movimento II — O eu que sonha',
      lines:'Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\nÀ parte isso, tenho em mim todos os sonhos do mundo.' },
    { author:'Luís de Camões', work:'Sonetos — Rimas', part:'Coda — O amor que transforma e destrói',
      lines:'Amor é fogo que arde sem se ver;\né ferida que dói e não se sente;\né um contentamento descontente;\né dor que desatina sem doer.' },
  ],
  politico: [
    { author:'Bertolt Brecht', work:'Poemas de Svendborg (1939)', part:'Abertura — A consciência que desperta',
      lines:'Nos tempos sombrios\nhá ainda canto?\nHaverá ainda canto.\nSobre os tempos sombrios.' },
    { author:'Pablo Neruda', work:'Canto Geral (1950)', part:'Movimento I — A voz dos oprimidos',
      lines:'Sou feito da mesma madeira\nque os que constroem e que os que destroem.\nMinha voz é a voz de todos:\nquem não luta por mim luta contra si mesmo.' },
    { author:'Ferreira Gullar', work:'Poema Sujo (1976)', part:'Movimento II — A resistência como ato de existir',
      lines:'Um homem só, numa cidade estranha,\ncompõe, à noite, um pequeno poema.\nEle sabe que amanhã\nnão haverá tempo para poemas.' },
    { author:'Álvaro de Campos (Fernando Pessoa)', work:'Ultimatum (1917)', part:'Coda — O grito que não cala',
      lines:'Mando ao mundo\nde uma só vez todo o seu lixo.\nFica nu, mundo, fica nu—\na tua verdade é o que não tens.' },
  ],
  existencia: [
    { author:'Rainer Maria Rilke', work:'Elegias de Duíno (1923)', part:'Abertura — O abismo que nos constitui',
      lines:'Quem, se eu gritasse, me ouviria\nno meio dos anjos?\nE se, de súbito, um deles me apertasse\nao coração: eu morreria de sua existência mais forte.' },
    { author:'Carlos Drummond de Andrade', work:'A Rosa do Povo (1945)', part:'Movimento I — O tempo que devora',
      lines:'No meio do caminho tinha uma pedra\ntinha uma pedra no meio do caminho\ntinha uma pedra\nno meio do caminho tinha uma pedra.\nNunca me esquecerei desse acontecimento\nna vida de minhas retinas tão fatigadas.' },
    { author:'Emily Dickinson', work:'Poemas (edição póstuma, 1890)', part:'Movimento II — A morte como espelho da vida',
      lines:'Porque não pude deter-me para a Morte—\nela gentilmente parou por mim—\na carruagem continha apenas nós dois\ne a Imortalidade.' },
    { author:'Fernando Pessoa (ele mesmo)', work:'Mensagem (1934)', part:'Coda — O ser que se pergunta',
      lines:'Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\nÀ parte isso, tenho em mim todos os sonhos do mundo.' },
  ],
};

const TITULOS = {
  romance:    ['Os Laços Invisíveis','Amor em Carne Viva','Cartas ao Mar','O Incêndio Quieto','Ferida Doce'],
  politico:   ['Trincheiras de Papel','O Grito que Persiste','Voz sem Dono','Resistência','Manifesto dos Esquecidos'],
  existencia: ['O Peso do Ser','Abismo Interior','Entre o Nada e Tudo','Silêncio Profundo','A Pedra no Caminho'],
};

const NOMES_TEMA = { romance:'Romance', politico:'Político', existencia:'Existência' };

/* ── Estado ── */
let usuario     = null;
let livros      = JSON.parse(localStorage.getItem('ogrito_livros') || '[]');
let coverIdx    = livros.length % COVERS.length;
let livroAtual  = null;
let paginaAtual = 'main';

/* ── Persistência de sessão ── */
function salvarSessao(u) {
  if (u) localStorage.setItem('ogrito_user', JSON.stringify(u));
  else   localStorage.removeItem('ogrito_user');
}
function restaurarSessao() {
  try {
    const s = localStorage.getItem('ogrito_user');
    if (s) usuario = JSON.parse(s);
  } catch(e) {}
}

/* ── Navegação SPA ── */
function ir(pagina) {
  // esconde página atual
  const pgAtual = document.getElementById('pg-' + paginaAtual);
  if (pgAtual) pgAtual.classList.remove('active');

  paginaAtual = pagina;
  const pgNova = document.getElementById('pg-' + pagina);
  if (pgNova) {
    pgNova.classList.add('active');
    window.scrollTo(0, 0);
  }

  if (pagina === 'biblioteca') renderBiblioteca();
}
window.ir = ir;

/* ── Auth ── */
window.fazerLogin = function() {
  usuario = {
    name:   'Leitor Anônimo',
    avatar: 'https://ui-avatars.com/api/?name=Leitor&background=3d5e3a&color=e8dcc8&size=80',
  };
  salvarSessao(usuario);
  atualizarUI();
  toast('Bem-vindo, ' + usuario.name + '!');
};

window.fazerLogout = function() {
  usuario = null;
  salvarSessao(null);
  atualizarUI();
  ir('main');
  toast('Até logo!');
};

function atualizarUI() {
  const loginBtn = document.getElementById('google-login-btn');
  const userInfo = document.getElementById('user-info');
  const libBtn   = document.getElementById('library-nav-btn');
  if (!loginBtn) return;
  if (usuario) {
    loginBtn.style.display = 'none';
    userInfo.style.display = 'flex';
    libBtn.style.display   = 'block';
    document.getElementById('user-avatar').src       = usuario.avatar;
    document.getElementById('user-name').textContent = usuario.name;
  } else {
    loginBtn.style.display = 'flex';
    userInfo.style.display = 'none';
    libBtn.style.display   = 'none';
  }
}

/* ── Modal tema ── */
window.abrirModalTema = function() {
  if (!usuario) { toast('Faça login para gerar livros!'); return; }
  document.getElementById('modal-tema').classList.add('active');
};
window.fecharModalTema = function() {
  document.getElementById('modal-tema').classList.remove('active');
};

/* ── Gerar livro ── */
window.gerarLivro = function(tema) {
  const userSalvo = usuario;
  fecharModalTema();

  const loading = document.getElementById('loading-overlay');
  loading.classList.add('active');

  setTimeout(function() {
    if (!usuario && userSalvo) { usuario = userSalvo; salvarSessao(usuario); atualizarUI(); }

    const capa   = COVERS[coverIdx % COVERS.length];
    coverIdx     = (coverIdx + 1) % COVERS.length;
    const titulos = TITULOS[tema];
    const titulo  = titulos[Math.floor(Math.random() * titulos.length)];

    livroAtual = {
      id:        Date.now(),
      titulo:    titulo,
      tema:      tema,
      capa:      capa.file,
      capaNome:  capa.name,
      data:      new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' }),
      estrofes:  POEMAS[tema],
    };

    livros.push(livroAtual);
    localStorage.setItem('ogrito_livros', JSON.stringify(livros));

    loading.classList.remove('active');
    renderSobre(livroAtual);
    ir('sobre');
    toast('Livro gerado com sucesso!');
  }, 2400);
};

/* ── Renderizar "Sobre o Livro" ── */
function renderSobre(livro) {
  const estrofesHTML = livro.estrofes.map(function(s) {
    return '<div class="poem-stanza">' +
      '<div class="stanza-author-tag">' +
        '<span class="stanza-author-name">' + s.author + '</span>' +
        '<span class="stanza-part-name">' + s.part + '</span>' +
      '</div>' +
      '<div class="stanza-text">' + s.lines + '</div>' +
    '</div>' +
    '<div class="stanza-divider">· · ·</div>';
  }).join('');

  const bibHTML = livro.estrofes.map(function(s) {
    return '<div class="bib-entry">' +
      '<span class="bib-author">' + s.author + '</span>' +
      '<span class="bib-work">' + s.work + '</span>' +
      '<span class="bib-part">' + s.part + '</span>' +
    '</div>';
  }).join('');

  document.getElementById('sobre-conteudo').innerHTML =
    '<div class="book-header">' +
      '<img class="book-cover-large" src="' + livro.capa + '" alt="' + livro.titulo + '"' +
      ' onerror="this.src=\'https://placehold.co/300x400/1a2e1a/7aad6e?text=Capa\'"/>' +
      '<div class="book-meta">' +
        '<h1>' + livro.titulo + '</h1>' +
        '<div class="theme-tag">✦ ' + NOMES_TEMA[livro.tema] + '</div>' +
        '<div class="cover-credit">' + livro.capaNome + '</div>' +
        '<div class="book-date">Gerado em ' + livro.data + '</div>' +
        '<div class="action-btns">' +
          '<button class="action-btn primary" onclick="abrirPoema()">📖 Ler Poema</button>' +
          '<button class="action-btn" onclick="gerarPDF()">⬇ Baixar PDF</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="poem-inline-section">' +
      '<div class="poem-section-title">' + livro.titulo + '</div>' +
      estrofesHTML +
    '</div>' +
    '<div class="bibliography-section">' +
      '<h3>Referências Bibliográficas</h3>' +
      '<p class="bib-intro">Autores e obras que compõem este livro:</p>' +
      bibHTML +
    '</div>';
}

/* ── Abrir poema limpo (MESMA página, sem window.open) ── */
window.abrirPoema = function() {
  if (!livroAtual) return;
  const livro = livroAtual;

  // Título na topbar
  document.getElementById('poema-titulo-topo').textContent = livro.titulo;

  const wrap = document.getElementById('poema-wrap');
  // Limpa
  wrap.innerHTML = '';

  // Cabeçalho
  const cab = document.createElement('div');
  cab.className = 'poema-cabecalho';
  const h1 = document.createElement('h1');
  h1.className = 'poema-titulo';
  h1.textContent = livro.titulo;
  const tag = document.createElement('div');
  tag.className = 'poema-tag';
  tag.textContent = '✦ ' + NOMES_TEMA[livro.tema];
  const data = document.createElement('span');
  data.className = 'poema-data';
  data.textContent = livro.data;
  cab.appendChild(h1);
  cab.appendChild(tag);
  cab.appendChild(data);
  wrap.appendChild(cab);

  // Ornamento
  const orn = document.createElement('div');
  orn.className = 'poema-ornamento';
  orn.textContent = '— ✦ —';
  wrap.appendChild(orn);

  // Estrofes com textContent (preserva \n, sem risco de HTML injetado)
  livro.estrofes.forEach(function(s, i) {
    const p = document.createElement('p');
    p.className = 'poema-estrofe';
    p.textContent = s.lines;   // textContent preserva \n intactos
    wrap.appendChild(p);

    if (i < livro.estrofes.length - 1) {
      const div = document.createElement('div');
      div.className = 'poema-divisor';
      div.textContent = '· · ·';
      wrap.appendChild(div);
    }
  });

  // Rodapé
  const rod = document.createElement('div');
  rod.className = 'poema-rodape';
  rod.innerHTML = '<p>Uma Antologia Viva</p>';
  wrap.appendChild(rod);

  ir('poema');
};

/* ── Renderizar biblioteca ── */
function renderBiblioteca() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  if (livros.length === 0) {
    grid.innerHTML = '<div class="empty-library">Nenhum livro gerado ainda.<br>Clique em "✦ Gerar Livro" para começar.</div>';
    return;
  }
  grid.innerHTML = livros.map(function(b) {
    return '<div class="book-card" onclick=\'abrirLivroDaBiblioteca(' + b.id + ')\'>' +
      '<img class="book-cover" src="' + b.capa + '" alt="' + b.titulo + '"' +
      ' onerror="this.src=\'https://placehold.co/300x400/1a2e1a/7aad6e?text=Capa\'"/>' +
      '<div class="book-info">' +
        '<div class="book-card-title">' + b.titulo + '</div>' +
        '<div class="book-card-theme">' + NOMES_TEMA[b.tema] + '</div>' +
        '<div class="book-card-date">' + b.data + '</div>' +
      '</div></div>';
  }).join('');
}

window.abrirLivroDaBiblioteca = function(id) {
  const livro = livros.find(function(b) { return b.id === id; });
  if (!livro) return;
  livroAtual = livro;
  renderSobre(livro);
  ir('sobre');
};

/* ── Gerar PDF ── */
window.gerarPDF = function() {
  if (!livroAtual) return;
  const b = livroAtual;
  const tema = NOMES_TEMA[b.tema] || b.tema;

  // Monta linhas do poema via DOM para escapar corretamente
  let pLines = '';
  b.estrofes.forEach(function(s, i) {
    const pre = document.createElement('pre');
    pre.textContent = s.lines;
    const sep = i < b.estrofes.length - 1
      ? '<p style="text-align:center;color:#b0c8a8;letter-spacing:.44em;margin:14px 0;">· · ·</p>' : '';
    pLines += '<pre style="font-family:\'IM Fell English\',Georgia,serif;font-size:1.04rem;line-height:2.05;font-style:italic;white-space:pre-wrap;margin-bottom:18px;background:none;border:none;padding:0;">' + pre.innerHTML + '</pre>' + sep;
  });

  let pBib = '';
  b.estrofes.forEach(function(s) {
    const a = document.createElement('span'); a.textContent = s.author;
    const w = document.createElement('span'); w.textContent = s.work;
    const p = document.createElement('span'); p.textContent = s.part;
    pBib += '<div style="margin-bottom:10px;">' +
      '<strong>' + a.innerHTML + '</strong><br>' +
      '<em style="color:#555;font-size:.8rem;">' + w.innerHTML + '</em><br>' +
      '<span style="color:#999;font-size:.72rem;">' + p.innerHTML + '</span>' +
    '</div>';
  });

  const tEl = document.createElement('span'); tEl.textContent = b.titulo;
  const dEl = document.createElement('span'); dEl.textContent = b.data;
  const cEl = document.createElement('span'); cEl.textContent = b.capaNome;

  const html =
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IM+Fell+English:ital@1&family=Cormorant+Garamond:wght@400&display=swap" rel="stylesheet"/>' +
    '<style>' +
    'body{font-family:"Cormorant Garamond",Georgia,serif;background:#faf7f0;color:#1a1a1a;max-width:640px;margin:0 auto;padding:58px 62px 80px;}' +
    'h1{font-family:"Playfair Display",serif;font-size:2.4rem;font-weight:900;color:#162016;line-height:1.13;margin-bottom:10px;}' +
    '.tag{display:inline-block;border:1px solid #3a5a38;color:#3a5a38;padding:3px 13px;font-size:.72rem;font-style:italic;letter-spacing:.13em;margin-bottom:6px;}' +
    '.meta{font-size:.73rem;color:#aaa;font-style:italic;margin-bottom:44px;padding-bottom:14px;border-bottom:1px solid #ddd;}' +
    '.orn{text-align:center;color:#b0c8a8;letter-spacing:.55em;margin-bottom:36px;}' +
    '.bw{margin-top:48px;padding-top:18px;border-top:1px solid #ddd;}' +
    '.bh{font-family:"Playfair Display",serif;font-size:.73rem;letter-spacing:.18em;text-transform:uppercase;color:#888;margin-bottom:13px;}' +
    '.ft{margin-top:42px;text-align:center;font-size:.67rem;color:#ccc;font-style:italic;letter-spacing:.1em;}' +
    '@media print{body{padding:32px 46px;}@page{margin:1.8cm;}}' +
    '</style></head><body>' +
    '<h1>' + tEl.innerHTML + '</h1>' +
    '<span class="tag">✦ ' + tema + '</span>' +
    '<p class="meta">Gerado em ' + dEl.innerHTML + ' · O Grito das Palavras · ' + cEl.innerHTML + '</p>' +
    '<p class="orn">— ✦ —</p>' +
    pLines +
    '<div class="bw"><p class="bh">Referências Bibliográficas</p>' + pBib + '</div>' +
    '<p class="ft">O Grito das Palavras — Uma Antologia Viva</p>' +
    '<scr'+'ipt>window.onload=function(){window.print();setTimeout(window.close,1500)};</scr'+'ipt>' +
    '</body></html>';

  const blob = new Blob([html], { type:'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const w    = window.open(url, '_blank');
  toast(w ? 'Janela aberta — escolha "Salvar como PDF".' : 'Permita pop-ups e tente novamente.');
  setTimeout(function() { URL.revokeObjectURL(url); }, 15000);
};

/* ── Toast ── */
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3400);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  restaurarSessao();
  atualizarUI();

  document.getElementById('modal-tema').addEventListener('click', function(e) {
    if (e.target === this) fecharModalTema();
  });
});
