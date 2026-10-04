// =====================================================
// ARRAY DE ALUNOS
// Os dados ficam somente na memória.
// Ao atualizar a página, os dados serão apagados.
// =====================================================

const alunos = [];


// =====================================================
// ELEMENTOS PRINCIPAIS
// =====================================================

const app = document.querySelector("#app");

const botoesMenu = document.querySelectorAll(
  "nav button"
);


// =====================================================
// MARCAR MENU ATIVO
// =====================================================

function marcarMenuAtivo(rota) {

  botoesMenu.forEach(botao => {

    botao.classList.toggle(
      "ativo",
      botao.dataset.rota === rota
    );

  });

}


// =====================================================
// NAVEGAÇÃO DA SPA
// =====================================================

function irPara(rota) {

  marcarMenuAtivo(rota);

  if (rota === "inicio") {
    mostrarInicio();
  }

  if (rota === "cadastro") {
    mostrarCadastro();
  }

  if (rota === "lista") {
    mostrarLista();
  }

  if (rota === "sobre") {
    mostrarSobre();
  }

}


// =====================================================
// TELA INICIAL
// =====================================================

function mostrarInicio() {

  app.innerHTML = `

    <section class="banner">

      <div>

        <h1>
          Olá! Bem-vindo ao Educa+
        </h1>

        <p>
          Gerencie o cadastro dos alunos
          de forma simples e organizada.
        </p>

        <div class="acoes">

          <button
            class="botao"
            id="btnCadastrar">

            + Cadastrar aluno

          </button>

          <button
            class="botao secundario"
            id="btnLista">

            Ver alunos

          </button>

        </div>

      </div>

      <div class="banner-info">
        🎓
      </div>

    </section>


    <div class="titulo-pagina">

      <h1>Visão geral</h1>

      <p>
        Resumo dos alunos cadastrados nesta sessão.
      </p>

    </div>


    <section class="cards">

      <div class="card">

        <div class="card-topo">

          <div class="card-icone">
            👨‍🎓
          </div>

        </div>

        <h3>Total de alunos</h3>

        <div class="numero">
          ${alunos.length}
        </div>

      </div>


      <div class="card">

        <div class="card-topo">

          <div class="card-icone">
            📚
          </div>

        </div>

        <h3>Cursos cadastrados</h3>

        <div class="numero">
          ${quantidadeCursos()}
        </div>

      </div>


      <div class="card">

        <div class="card-topo">

          <div class="card-icone">
            ✓
          </div>

        </div>

        <h3>Status do sistema</h3>

        <div class="numero">
          Ativo
        </div>

      </div>

    </section>

  `;


  document
    .querySelector("#btnCadastrar")
    .addEventListener(
      "click",
      () => irPara("cadastro")
    );


  document
    .querySelector("#btnLista")
    .addEventListener(
      "click",
      () => irPara("lista")
    );

}


// =====================================================
// QUANTIDADE DE CURSOS
// =====================================================

function quantidadeCursos() {

  const cursos = alunos.map(
    aluno => aluno.curso
  );

  const cursosUnicos = [...new Set(cursos)];

  return cursosUnicos.length;

}


// =====================================================
// TELA DE CADASTRO
// =====================================================

function mostrarCadastro() {

  app.innerHTML = `

    <div class="titulo-pagina">

      <h1>Cadastrar novo aluno</h1>

      <p>
        Preencha os dados abaixo para adicionar
        um aluno ao sistema.
      </p>

    </div>


    <form
      id="formAluno"
      class="formulario">


      <div class="linha">

        <div class="campo">

          <label for="nome">
            Nome completo
          </label>

          <input
            type="text"
            id="nome"
            placeholder="Ex.: João da Silva"
            required
          >

        </div>


        <div class="campo">

          <label for="matricula">
            Matrícula
          </label>

          <input
            type="text"
            id="matricula"
            placeholder="Ex.: 2026001"
            required
          >

        </div>

      </div>


      <div class="linha">

        <div class="campo">

          <label for="curso">
            Curso
          </label>

          <select id="curso" required>

            <option value="">
              Selecione um curso
            </option>

            <option value="Administração">
              Administração
            </option>

            <option value="Análise e Desenvolvimento de Sistemas">
              Análise e Desenvolvimento de Sistemas
            </option>

            <option value="Direito">
              Direito
            </option>

            <option value="Enfermagem">
              Enfermagem
            </option>

            <option value="Engenharia">
              Engenharia
            </option>

          </select>

        </div>


        <div class="campo">

          <label for="email">
            E-mail
          </label>

          <input
            type="email"
            id="email"
            placeholder="aluno@email.com"
            required
          >

        </div>

      </div>


      <div class="campo">

        <label for="idade">
          Idade
        </label>

        <input
          type="number"
          id="idade"
          min="1"
          max="100"
          placeholder="Digite a idade"
          required
        >

      </div>


      <button
        type="submit"
        class="botao">

        Cadastrar aluno

      </button>


      <div id="mensagem"></div>

    </form>

  `;


  // ===================================================
  // EVENTO DO FORMULÁRIO
  // ===================================================

  document
    .querySelector("#formAluno")
    .addEventListener(
      "submit",
      cadastrarAluno
    );

}


// =====================================================
// CADASTRAR ALUNO
// =====================================================

function cadastrarAluno(evento) {

  evento.preventDefault();


  const nome = document
    .querySelector("#nome")
    .value
    .trim();


  const matricula = document
    .querySelector("#matricula")
    .value
    .trim();


  const curso = document
    .querySelector("#curso")
    .value;


  const email = document
    .querySelector("#email")
    .value
    .trim();


  const idade = document
    .querySelector("#idade")
    .value;


  // -----------------------------------------------
  // Verifica se a matrícula já existe
  // -----------------------------------------------

  const matriculaExiste = alunos.some(
    aluno => aluno.matricula === matricula
  );


  if (matriculaExiste) {

    document.querySelector("#mensagem").innerHTML = `

      <div
        class="mensagem"
        style="
          background:#fff1f2;
          border-color:#fecaca;
          color:#b91c1c;
        ">

        Essa matrícula já está cadastrada.

      </div>

    `;

    return;
  }


  // -----------------------------------------------
  // Adiciona o aluno ao array
  // -----------------------------------------------

  alunos.push({

    nome: nome,

    matricula: matricula,

    curso: curso,

    email: email,

    idade: idade

  });


  // -----------------------------------------------
  // Exibe mensagem
  // -----------------------------------------------

  document.querySelector("#mensagem").innerHTML = `

    <div class="mensagem">

      ✓ Aluno cadastrado com sucesso!

    </div>

  `;


  // -----------------------------------------------
  // Limpa o formulário
  // -----------------------------------------------

  evento.target.reset();

}


// =====================================================
// TELA DE LISTA
// =====================================================

function mostrarLista() {

  app.innerHTML = `

    <div class="titulo-pagina">

      <h1>Alunos cadastrados</h1>

      <p>
        Consulte todos os alunos registrados
        nesta sessão.
      </p>

    </div>


    <div id="conteudoLista"></div>

  `;


  renderizarTabela();

}


// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarTabela() {

  const conteudo =
    document.querySelector("#conteudoLista");


  // -----------------------------------------------
  // Se não houver alunos
  // -----------------------------------------------

  if (alunos.length === 0) {

    conteudo.innerHTML = `

      <div class="card vazio">

        <div style="font-size:40px;">
          🎓
        </div>

        <p>
          Nenhum aluno cadastrado ainda.
        </p>

        <button
          class="botao"
          id="btnCadastrarLista">

          Cadastrar primeiro aluno

        </button>

      </div>

    `;


    document
      .querySelector("#btnCadastrarLista")
      .addEventListener(
        "click",
        () => irPara("cadastro")
      );


    return;
  }


  // -----------------------------------------------
  // Criar linhas da tabela
  // -----------------------------------------------

  let linhas = "";


  alunos.forEach(
    (aluno, indice) => {

      linhas += `

        <tr>

          <td>
            <strong>
              ${aluno.nome}
            </strong>
          </td>

          <td>
            ${aluno.matricula}
          </td>

          <td>
            ${aluno.curso}
          </td>

          <td>
            ${aluno.email}
          </td>

          <td>
            <span class="status">
              Ativo
            </span>
          </td>

          <td>

            <button
              class="excluir"
              data-indice="${indice}">

              Excluir

            </button>

          </td>

        </tr>

      `;

    }
  );


  // -----------------------------------------------
  // Montar tabela
  // -----------------------------------------------

  conteudo.innerHTML = `

    <div class="tabela-container">

      <table>

        <thead>

          <tr>

            <th>Aluno</th>

            <th>Matrícula</th>

            <th>Curso</th>

            <th>E-mail</th>

            <th>Status</th>

            <th>Ação</th>

          </tr>

        </thead>


        <tbody>

          ${linhas}

        </tbody>

      </table>

    </div>

  `;


  // -----------------------------------------------
  // Eventos dos botões excluir
  // -----------------------------------------------

  document
    .querySelectorAll(".excluir")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        function() {

          const indice =
            Number(this.dataset.indice);


          alunos.splice(indice, 1);


          renderizarTabela();

        }
      );

    });

}


// =====================================================
// TELA SOBRE
// =====================================================

function mostrarSobre() {

  app.innerHTML = `

    <div class="titulo-pagina">

      <h1>Sobre o projeto</h1>

      <p>
        Conheça as tecnologias utilizadas
        nesta aplicação.
      </p>

    </div>


    <section class="sobre">

      <h2>Educa+</h2>

      <p>
        O Educa+ é um sistema simples de
        cadastro e gerenciamento de alunos.
      </p>


      <h2>Single Page Application</h2>

      <p>
        Este projeto segue o conceito de SPA.
        Existe apenas um arquivo HTML e o conteúdo
        principal da aplicação é alterado pelo
        JavaScript sem que seja necessário
        carregar novas páginas.
      </p>


      <h2>Manipulação do DOM</h2>

      <p>
        O JavaScript utiliza o DOM para trocar
        o conteúdo da área principal, responder
        aos cliques do menu, receber os dados
        do formulário e atualizar a tabela
        de alunos.
      </p>


      <h2>Armazenamento em memória</h2>

      <p>
        Os alunos são armazenados em um array
        JavaScript durante a execução da aplicação.
        Não é utilizado banco de dados.
      </p>


      <h2>Tecnologias</h2>

      <p>
        HTML5, CSS3 e JavaScript.
      </p>

    </section>

  `;

}


// =====================================================
// EVENTOS DO MENU
// =====================================================

botoesMenu.forEach(
  botao => {

    botao.addEventListener(
      "click",
      () => {

        irPara(
          botao.dataset.rota
        );

      }
    );

  }
);


// =====================================================
// INICIAR A APLICAÇÃO
// =====================================================

mostrarInicio();
