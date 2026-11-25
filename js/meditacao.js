const FASES = [
  { texto: 'Inspire...',          segundos: 4, classe: 'inspire' },
  { texto: 'Segure...',           segundos: 7, classe: 'segure'  },
  { texto: 'Expire pela boca...',  segundos: 8, classe: 'expire'  },
];

const fase     = document.getElementById('fase');
const circulo  = document.getElementById('circulo');
const contador = document.getElementById('contador');
const btnPlay  = document.getElementById('btnPlay');
const icPlay   = document.getElementById('iconePlay');
const icPause  = document.getElementById('iconePause');
const rotulo   = document.getElementById('rotulo');
const duracao  = document.getElementById('duracao');

let intervalo = null;
let indiceFase = 0;
let restanteFase = 0;
let restanteTotal = 0;

function formatar(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function atualizarRotulo() {
  const nome = duracao.selectedOptions[0].dataset.nome;
  rotulo.textContent = `${nome} · ${formatar(restanteTotal)}`;
}

function atualizarBotao(rodando) {
  icPlay.hidden = rodando;
  icPause.hidden = !rodando;
  btnPlay.setAttribute('aria-label', rodando ? 'Pausar' : 'Iniciar pausa');
}

// começa uma fase. troca o texto, o número e anima o círculo durante x 'segundos'
function entrarNaFase(indice, segundos = FASES[indice].segundos) {
  const f = FASES[indice];
  indiceFase = indice;
  restanteFase = segundos;

  fase.textContent = f.texto;
  contador.textContent = restanteFase;

  circulo.style.transform = ''; // solta o congelamento da pausa
  circulo.style.setProperty('--duracao-fase', `${segundos}s`);
  circulo.classList.remove('inspire', 'segure', 'expire');
  circulo.classList.add(f.classe);
}

function tick() {
  restanteTotal--;
  restanteFase--;
  atualizarRotulo();

  if (restanteTotal <= 0) {
    concluir();
    return;
  }

  if (restanteFase <= 0) {
    entrarNaFase((indiceFase + 1) % FASES.length);
  } else {
    contador.textContent = restanteFase;
  }
}

function iniciar() {
  if (restanteTotal <= 0) reiniciar();

  // se é o começo de uma fase, começa normal. se veio de uma pausa, retoma de onde parou
  entrarNaFase(indiceFase, restanteFase || FASES[indiceFase].segundos);

  intervalo = setInterval(tick, 1000);
  atualizarBotao(true);
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;

  // congela o círculo no tamanho em que está atualmentw
  const atual = getComputedStyle(circulo).transform;
  circulo.style.setProperty('--duracao-fase', '0s');
  circulo.style.transform = atual;

  fase.textContent = 'Pausado';
  atualizarBotao(false);
}

function concluir() {
  clearInterval(intervalo);
  intervalo = null;

  circulo.style.setProperty('--duracao-fase', '1.5s');
  circulo.style.transform = '';
  circulo.classList.remove('inspire', 'segure', 'expire');

  fase.textContent = 'Sessão finalizada, respire fundo ✨';
  contador.textContent = '✓';
  atualizarBotao(false);
}

// volta tudo para o início, com o tempo da opção escolhida
function reiniciar() {
  restanteTotal = Number(duracao.value);
  indiceFase = 0;
  restanteFase = 0;

  circulo.style.transform = '';
  circulo.classList.remove('inspire', 'segure', 'expire');
  fase.textContent = FASES[0].texto;
  contador.textContent = FASES[0].segundos;
  atualizarRotulo();
}

btnPlay.addEventListener('click', () => {
  if (intervalo) pausar();
  else iniciar();
});

// trocar entre rápida / média / longa recomeça a sessão
duracao.addEventListener('change', () => {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    atualizarBotao(false);
  }
  reiniciar();
});

reiniciar();