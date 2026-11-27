# 🐘 Unplug — Refúgio Digital

> **PSEL 27.1 — Seed a Bit | 2º Desafio de Projetos (Squad: Devzords)**

🔗 **Aplicação publicada (GitHub Pages):** [Acesse o Unplug aqui](https://dlrussiano-commits.github.io/unplug/index.html)

---

## 💡 Sobre a Solução

O **Unplug** é um refúgio digital de alívio imediato desenvolvido para **jovens e profissionais sobrecarregados** que enfrentam dificuldades para se desconectar do trabalho, das notificações e das telas.

### 🎯 O Problema
Muitas pessoas se sentem constantemente esgotadas pelo ambiente digital, mas não encontram tempo ou ferramentas acessíveis para desacelerar sem que isso se torne mais uma obrigação pesada na rotina.

### ✨ A Proposta
A aplicação convida o usuário a fazer uma pausa leve e acolhedora por meio de cinco telas principais:
- **Check-in Diário:** registro rápido de humor e gatilhos do dia, com histórico salvo na nuvem e opção de exclusão.
- **Meu Diário:** espaço livre para escrita e descompressão, com criação, listagem, edição e exclusão de entradas.
- **Meditação:** exercícios guiados de respiração com temporizador funcional e seleção de modo/tempo.
- **Indicações:** curadoria de atividades, vídeos, músicas e livros para desacelerar.
- **Profissionais:** vitrine de profissionais de apoio com simulação de contato.

---

## 🌍 ODS Impactadas

- **ODS 3 — Saúde e Bem-Estar (Impacto Direto):** combate o esgotamento mental (*burnout*) e a ansiedade digital, promovendo o autocuidado e democratizando o acesso a ferramentas de descompressão diária.
- **ODS 8 — Trabalho Decente e Crescimento Econômico (Impacto Indireto):** apoia a saúde mental e a sustentabilidade emocional de profissionais no mercado de trabalho.

---

## 📋 MVP Contract (Escopo)

### Jornada Principal
O usuário acessa o refúgio digital (login simulado) → é direcionado ao menu inicial → escolhe uma das cinco funcionalidades (Check-in, Diário, Meditação, Indicações ou Profissionais) para registrar seu humor, escrever, fazer uma pausa guiada ou explorar conteúdos de apoio.

### Real vs. Simulado
- **Real:**
  - Cadastro, listagem e exclusão de registros de **Check-in** integrados à API da Seed (`GET`, `POST`, `DELETE`).
  - CRUD completo de entradas no **Meu Diário** integrado à API da Seed (`GET`, `POST`, `PATCH`, `DELETE`).
  - Temporizador funcional e animações de respiração na tela de **Meditação** (JavaScript).
  - Redirecionamento por links externos na tela de **Indicações**.
- **Simulado:**
  - Autenticação / saudação inicial (*"Olá, usuário!"*).
  - Ação do botão **"Conversar"** na tela de **Profissionais** (feedback visual em tela via JavaScript, sem agendamento real).

### Fora do Escopo (Visão de Futuro)
- Sistema de login e contas individuais com senha.
- Agendamento real e chat ao vivo com profissionais.
- Notificações *push* para lembrar de pausas.
- Bloqueio inteligente de telas.

---

## 🔌 Integração com a API da Seed

A comunicação com o back-end foi feita utilizando **JavaScript puro (`fetch` API com `async/await`)**, tratando erros com `try/catch` e atualizando o DOM dinamicamente após cada operação.

- **Base URL:** `https://psel-api.vercel.app`
- **Squad:** `devzords`

### Endpoints Utilizados

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/devzords/checkins` | Lista o histórico de check-ins diários |
| `POST` | `/api/devzords/checkins` | Cria um novo registro de humor e gatilhos |
| `DELETE` | `/api/devzords/checkins/{id}` | Remove um registro específico do histórico *(bônus)* |
| `GET` | `/api/devzords/diario` | Lista as entradas salvas no diário ordenadas por data |
| `POST` | `/api/devzords/diario` | Salva uma nova entrada no diário |
| `PATCH` | `/api/devzords/diario/{id}` | Edita o título e o conteúdo de uma entrada *(bônus)* |
| `DELETE` | `/api/devzords/diario/{id}` | Exclui uma entrada específica do diário *(bônus)* |

### Modelo de Dados (JSON)

**Coleção `checkins`:**
```json
{
  "data": "27/11/2026",
  "humor": "Feliz",
  "gatilhos": "Sono, Amigos"
}
```

**Coleção `diario`:**
```json
{
  "titulo": "Pausa necessária",
  "conteudo": "Hoje tirei 10 minutos longe do celular e me senti muito melhor."
}
```

*(Os campos `id` e `createdAt` são gerados automaticamente pelo servidor da API.)*

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** (estrutura semântica)
- **CSS3** (Flexbox, Grid, Glassmorphism e design responsivo mobile-first)
- **JavaScript (ES6+)** (manipulação de DOM, eventos e requisições HTTP via `fetch`)
- **API Genérica da Seed** (persistência dos dados do MVP)
- **GitHub Pages** (hospedagem e deploy)

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/ArthurTeix/unplug.git
   ```
2. Abra a pasta do projeto no VS Code.
3. Execute o arquivo `index.html` diretamente no navegador ou utilizando a extensão **Live Server**.

---

## 👥 Integrantes — Squad Devzords

- **Arthur Teixeira**
- **Davi Lins Russiano**
- **Flavia Hercilia da Silva**
- **Ricardo Soares Ventura**
- **Zaque Mateus Neves da Silva**
