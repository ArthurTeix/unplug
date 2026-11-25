// Lista de profissionais
const profissionais = [
  { id: 1, nome: 'Dra. Sofia',   especialidade: 'Especialista em burnout',      foto: '../img/dra-sofia.png',    sombra: '#483997' },
  { id: 2, nome: 'Dr. Bernardo', especialidade: 'Especialista em família',      foto: '../img/dr-bernardo.png',  sombra: '#503F9F' },
  { id: 3, nome: 'Dra. Juliana', especialidade: 'Especialista infanto-juvenil', foto: '../img/dra-juliana.png',  sombra: '#5C48AC' },
];

const lista = document.getElementById('lista');

// Cards
profissionais.forEach((p) => {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
    <img class="foto" src="${p.foto}" alt="${p.nome}">
    <div class="info">
      <p class="nome">${p.nome}</p>
      <p class="especialidade">${p.especialidade}</p>
    </div>
    <button class="btn" style="--sombra: ${p.sombra}" data-id="${p.id}">Conversar</button>
  `;
  lista.appendChild(li);
});

// Clique em "Conversar"
lista.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const prof = profissionais.find((p) => p.id === Number(btn.dataset.id));
  // Troque pela navegação real, ex.: window.location.href = `chat.html?id=${prof.id}`;
  console.log('Conversar com:', prof.nome);
  alert(`Iniciando conversa com ${prof.nome}...`);
});

// Botão voltar
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Escala 1280x720
const tela = document.getElementById('tela');
function ajustar() {
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  tela.style.transform = `scale(${s})`;
  tela.style.margin = `${(720 * s - 720) / 2}px ${(1280 * s - 1280) / 2}px`;
}
window.addEventListener('resize', ajustar);
ajustar();