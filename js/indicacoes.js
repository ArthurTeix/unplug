/* ========== LISTAS: sombra e botão "ver mais" ========== */
document.querySelectorAll('.coluna').forEach((coluna) => {
    const lista = coluna.querySelector('.lista');
    const botao = coluna.querySelector('.ver-mais');

    const atualizarSombra = () => {
        const noTopo = lista.scrollTop <= 4;
        const noFim = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 4;

        // lê o valor de --fade do CSS, então acompanha as media queries
        const fade = getComputedStyle(lista).getPropertyValue('--fade').trim();

        lista.style.setProperty('--fade-top', noTopo ? '0px' : fade);
        lista.style.setProperty('--fade-bottom', noFim ? '0px' : fade);

        botao.textContent = noFim ? 'Ver menos' : 'Ver mais';
    };

    botao.addEventListener('click', () => {
    const noFim = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 4;

    // altura de 3 itens (item + espaço entre eles)
    const passo = lista.querySelector('li').offsetHeight * 3 + parseFloat(getComputedStyle(lista).rowGap) * 3;

    lista.scrollTo({
        top: noFim ? 0 : lista.scrollTop + passo,
        behavior: 'smooth'
        });
    });

    lista.addEventListener('scroll', atualizarSombra, { passive: true });
    atualizarSombra();
});

/* ========== CARROSSEL MOBILE: setas para trocar de seção ========== */
const trilho = document.querySelector('.colunas');

if (trilho) {
  // cria o carrossel em volta das colunas, se ainda não existir no HTML
  let carrossel = trilho.closest('.carrossel');

  if (!carrossel) {
    carrossel = document.createElement('div');
    carrossel.className = 'carrossel';
    trilho.parentNode.insertBefore(carrossel, trilho);
    carrossel.appendChild(trilho);
  }

  // cria as setas, se ainda não existirem no HTML
  const icone = (d) => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"
      stroke-linecap="round" stroke-linejoin="round"><path d="${d}" /></svg>`;

  if (!carrossel.querySelector('.seta-nav.anterior')) {
    carrossel.insertAdjacentHTML('afterbegin',
      `<button type="button" class="seta-nav anterior" aria-label="Seção anterior">${icone('M15 5l-7 7 7 7')}</button>`);
  }

  if (!carrossel.querySelector('.seta-nav.proxima')) {
    carrossel.insertAdjacentHTML('beforeend',
      `<button type="button" class="seta-nav proxima" aria-label="Próxima seção">${icone('M9 5l7 7-7 7')}</button>`);
  }

  const anterior = carrossel.querySelector('.seta-nav.anterior');
  const proxima = carrossel.querySelector('.seta-nav.proxima');
  const total = trilho.children.length;

  const indiceAtual = () => Math.round(trilho.scrollLeft / trilho.clientWidth);

  const irPara = (indice) => {
    trilho.scrollTo({ left: indice * trilho.clientWidth, behavior: 'smooth' });
  };

  const atualizarSetas = () => {
    const i = indiceAtual();
    anterior.disabled = i <= 0;
    proxima.disabled = i >= total - 1;
  };

  anterior.addEventListener('click', () => irPara(indiceAtual() - 1));
  proxima.addEventListener('click', () => irPara(indiceAtual() + 1));

  // atualiza também quando o usuário arrasta com o dedo
  trilho.addEventListener('scroll', atualizarSetas, { passive: true });
  window.addEventListener('resize', atualizarSetas);
  atualizarSetas();
}