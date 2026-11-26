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
    <div class="card-topo">
      <img class="foto" src="${p.foto}" alt="${p.nome}">
      <div class="info">
        <p class="nome">${p.nome}</p>
        <p class="especialidade">${p.especialidade}</p>
      </div>
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
  console.log('Conversar com:', prof.nome);
  alert(`Iniciando conversa com ${prof.nome}...`);
});

// Botão voltar
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.location.href = '../index.html';
});