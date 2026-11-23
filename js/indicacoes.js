document.querySelectorAll(".coluna").forEach((coluna) => {
    const lista = coluna.querySelector(".lista");
    const botao = coluna.querySelector(".ver-mais");

    const atualizarSombra = () => {
    const noTopo = lista.scrollTop <= 4;
    const noFim = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 4;

    // lê o valor de --fade do CSS, então acompanha as media queries
    const fade = getComputedStyle(lista).getPropertyValue("--fade").trim();

    lista.style.setProperty("--fade-top", noTopo ? "0px" : fade);
    lista.style.setProperty("--fade-bottom", noFim ? "0px" : fade);

    botao.textContent = noFim ? "Ver menos" : "Ver mais";
    };

    botao.addEventListener("click", () => {
    const noFim = lista.scrollTop + lista.clientHeight >= lista.scrollHeight - 4;

    // altura de 3 itens (item + espaço entre eles)
    const passo =
      lista.querySelector("li").offsetHeight * 3 +
      parseFloat(getComputedStyle(lista).rowGap) * 3;

    lista.scrollTo({
        top: noFim ? 0 : lista.scrollTop + passo,
        behavior: "smooth",
        });
    });

    lista.addEventListener("scroll", atualizarSombra, { passive: true });
    atualizarSombra();
});
