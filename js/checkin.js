const API_URL = 'https://psel-api.vercel.app/api/devzords/checkins';

const botoesHumor = document.querySelectorAll('.humor-btn');
const botoesTag = document.querySelectorAll('.tag-btn');
const btnContinuar = document.getElementById('btn-continuar');
const btnHistorico = document.getElementById('btn-historico');
const modalHistorico = document.getElementById('modal-historico');
const btnFechar = document.getElementById('btn-fechar');
const listaHistorico = document.getElementById('lista-historico');

let humorSelecionado = null;
let timerToast;

function mostrarAviso(mensagem, tipo = 'sucesso') {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.className = `toast visivel ${tipo === 'erro' ? 'erro' : ''}`;

    clearTimeout(timerToast);
    timerToast = setTimeout(() => {
        toast.classList.remove('visivel');
    }, 3000);
}

// Selecionar uma carinha de humor
botoesHumor.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesHumor.forEach((b) => b.classList.remove('selecionado'));
        botao.classList.add('selecionado');
        humorSelecionado = botao.dataset.humor;
    });
});

// Selecionar gatilhos
botoesTag.forEach((tag) => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('selecionado');
    });
});

// POST
async function salvarCheckin() {
    if (!humorSelecionado) {
        mostrarAviso('Selecione como você está se sentindo primeiro.', 'erro');
        return;
    }

    const tagsMarcadas = Array.from(document.querySelectorAll('.tag-btn.selecionado'))
        .map((tag) => tag.textContent.trim());

    const dados = {
        data: new Date().toLocaleDateString('pt-BR'),
        humor: humorSelecionado,
        gatilhos: tagsMarcadas.length > 0 ? tagsMarcadas.join(', ') : 'Nenhum informado'
    };

    btnContinuar.disabled = true;
    btnContinuar.textContent = 'Salvando...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        mostrarAviso('Check-in salvo com sucesso! ✨');
        limparSelecao();
        abrirHistorico();
    } catch (erro) {
        console.error('Erro ao salvar check-in:', erro);
        mostrarAviso('Não foi possível salvar. Tente novamente.', 'erro');
    } finally {
        btnContinuar.disabled = false;
        btnContinuar.textContent = 'Continuar';
    }
}

const iconesHumor = {
    'Muito triste': '../img/muito_triste.svg',
    'Triste': '../img/triste.svg',
    'Neutro': '../img/neutro.svg',
    'Feliz': '../img/feliz.svg',
    'Muito feliz': '../img/muito_feliz.svg'
};

// GET
async function carregarHistorico() {
    listaHistorico.innerHTML = '<p class="aviso-vazio">Carregando...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const registros = await response.json();

        if (registros.length === 0) {
            listaHistorico.innerHTML = '<p class="aviso-vazio">Nenhum check-in registrado ainda.</p>';
            return;
        }

        const ordenados = [...registros].reverse();

        listaHistorico.innerHTML = ordenados.map((item) => {
            const icone = iconesHumor[item.humor] || '';
            const imgHtml = icone ? `<img src="${icone}" alt="${item.humor}" class="mini-carinha">` : '';

            return `
                <div class="item-historico">
                    <div class="item-historico-topo">
                        <div class="item-humor-info">
                            ${imgHtml}
                            <span>${item.humor}</span>
                        </div>
                        <div class="item-acoes">
                            <span class="item-data">${item.data || new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
                            <button type="button" class="btn-apagar" onclick="deletarCheckin('${item.id}')" title="Apagar registro" aria-label="Apagar registro">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <p class="item-gatilhos">Gatilhos: ${item.gatilhos}</p>
                </div>
            `;
        }).join('');
    } catch (erro) {
        console.error('Erro ao buscar histórico:', erro);
        listaHistorico.innerHTML = '<p class="aviso-vazio">Erro ao carregar histórico.</p>';
    }
}

// DELETE
async function deletarCheckin(id) {
    const confirmar = confirm('Deseja apagar este registro do histórico?');
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        carregarHistorico();
    } catch (erro) {
        console.error('Erro ao apagar check-in:', erro);
        mostrarAviso('Não foi possível apagar o registro.', 'erro');
    }
}

function limparSelecao() {
    humorSelecionado = null;
    botoesHumor.forEach((b) => b.classList.remove('selecionado'));
    botoesTag.forEach((t) => t.classList.remove('selecionado'));
}

function abrirHistorico() {
    modalHistorico.hidden = false;
    carregarHistorico();
}

function fecharHistorico() {
    modalHistorico.hidden = true;
}

// Eventos dos botões
btnContinuar.addEventListener('click', salvarCheckin);
btnFechar.addEventListener('click', fecharHistorico);
btnHistorico.addEventListener('click', () => {
    if (modalHistorico.hidden) {
        abrirHistorico();
    } else {
        fecharHistorico();
    }
});

// Fecha o modal se clicar fora da caixa
modalHistorico.addEventListener('click', (e) => {
    if (e.target === modalHistorico) {
        fecharHistorico();
    }
});