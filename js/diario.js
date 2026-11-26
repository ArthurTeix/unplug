const SQUAD = "devzords";
const API_URL = `https://psel-api.vercel.app/api/${SQUAD}/diario`;

const formDiario = document.getElementById("form-diario");
const campoTitulo = document.getElementById("titulo");
const campoConteudo = document.getElementById("conteudo");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  const agora = new Date();
  const ontem = new Date();
  ontem.setDate(agora.getDate() - 1);

  const hora = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dia = data
    .toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    .replace(" de ", " ")
    .replace(".", "");

  if (data.toDateString() === agora.toDateString()) {
    return `Hoje · ${dia} · ${hora}`;
  }
  if (data.toDateString() === ontem.toDateString()) {
    return `Ontem · ${dia} · ${hora}`;
  }
  return `${dia} · ${hora}`;
}


function criarBotao(texto, classe) {
  const botao = document.createElement("button");
  botao.type = "button"; 
  botao.className = classe;
  botao.textContent = texto;
  return botao;
}


function criarCartao(entrada) {
  const cartao = document.createElement("article");
  cartao.className = "entrada";

  const data = document.createElement("small");
  data.className = "entrada-data";
  data.textContent = formatarData(entrada.createdAt);

  const titulo = document.createElement("h3");
  titulo.className = "entrada-titulo";
  titulo.textContent = entrada.titulo || "Sem título";

  const texto = document.createElement("p");
  texto.className = "entrada-texto";
  texto.textContent = entrada.conteudo;


  const acoes = document.createElement("div");
  acoes.className = "entrada-acoes";

  const btnEditar = criarBotao("Editar", "btn-editar");
  btnEditar.addEventListener("click", () => ativarEdicao(cartao, entrada));

  const btnExcluir = criarBotao("Excluir", "btn-excluir");
  btnExcluir.addEventListener("click", () => excluirEntrada(entrada.id));

  acoes.append(btnEditar, btnExcluir);

  cartao.append(data, titulo, texto, acoes);
  return cartao;
}

async function carregarDiario() {
  lista.textContent = "Carregando...";

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status);
    }

    const entradas = await resposta.json();

  
    entradas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    lista.textContent = "";

    if (entradas.length === 0) {
      lista.textContent = "Ainda não há entradas. Escreva a primeira!";
      return;
    }

    entradas.forEach((entrada) => {
      lista.appendChild(criarCartao(entrada));
    });
  } catch (erro) {
    console.error("Falha ao carregar o diário:", erro);
    lista.textContent = "Não foi possível carregar o diário. Tente novamente.";
  }
}

async function salvarEntrada(evento) {
  evento.preventDefault(); 

  const conteudo = campoConteudo.value.trim();

  if (conteudo === "") {
    mostrarMensagem("Escreva algo antes de salvar.");
    return;
  }


  let titulo = "";
  if (campoTitulo) {
    titulo = campoTitulo.value.trim();
  }
  if (titulo === "") {
    titulo = conteudo.slice(0, 30);
  }

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: titulo, conteudo: conteudo }),
    });

    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status);
    }

    formDiario.reset();
    mostrarMensagem("Entrada salva!");
    await carregarDiario();
  } catch (erro) {
    console.error("Falha ao salvar a entrada:", erro);
    mostrarMensagem("Não foi possível salvar. Tente novamente.");
  }
}


async function excluirEntrada(id) {
  const confirmou = confirm("Excluir esta entrada? Isso não pode ser desfeito.");
  if (!confirmou) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status);
    }

    mostrarMensagem("Entrada excluída.");
    await carregarDiario();
  } catch (erro) {
    console.error("Falha ao excluir a entrada:", erro);
    mostrarMensagem("Não foi possível excluir. Tente novamente.");
  }
}


function ativarEdicao(cartao, entrada) {
  cartao.textContent = ""; 

  const campoTituloEdicao = document.createElement("input");
  campoTituloEdicao.type = "text";
  campoTituloEdicao.className = "entrada-edicao-titulo";
  campoTituloEdicao.value = entrada.titulo || "";

  const campoTextoEdicao = document.createElement("textarea");
  campoTextoEdicao.className = "entrada-edicao-texto";
  campoTextoEdicao.value = entrada.conteudo;

  const acoes = document.createElement("div");
  acoes.className = "entrada-acoes";

  const btnSalvar = criarBotao("Salvar", "btn-salvar");
  btnSalvar.addEventListener("click", () => {
    atualizarEntrada(
      entrada.id,
      campoTituloEdicao.value.trim(),
      campoTextoEdicao.value.trim()
    );
  });

  const btnCancelar = criarBotao("Cancelar", "btn-cancelar");
  btnCancelar.addEventListener("click", () => {
    
    cartao.replaceWith(criarCartao(entrada));
  });

  acoes.append(btnSalvar, btnCancelar);
  cartao.append(campoTituloEdicao, campoTextoEdicao, acoes);
}


async function atualizarEntrada(id, titulo, conteudo) {
  if (conteudo === "") {
    mostrarMensagem("O texto não pode ficar vazio.");
    return;
  }

  if (titulo === "") {
    titulo = conteudo.slice(0, 30);
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: titulo, conteudo: conteudo }),
    });

    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status);
    }

    mostrarMensagem("Entrada atualizada!");
    await carregarDiario();
  } catch (erro) {
    console.error("Falha ao atualizar a entrada:", erro);
    mostrarMensagem("Não foi possível atualizar. Tente novamente.");
  }
}


formDiario.addEventListener("submit", salvarEntrada);
carregarDiario();
