import { dadosAluno } from "./alunos.js";

export function gerarRelatorio(
  alunos,
  filtrar,
  formatar,
  comparar
) {
  let resultado = alunos.filter(filtrar);

  if (comparar) {
    resultado.sort(comparar);
  }

  return resultado.map(formatar);
}

export function criarFiltro(opcao, valor) {
  return function(aluno) {
    if (opcao === "media") {
      let dados = dadosAluno(aluno, valor);

      return dados.media !== null && dados.media >= valor;
    }

    if (opcao === "curso") {
      return (
        aluno.curso.toLowerCase() ===
        valor.toLowerCase()
      );
    }

    return true;
  };
}

export function relatorioAprovados(alunos, mediaMinima = 6) {
  return gerarRelatorio(
    alunos,
    aluno => {
      return (
        dadosAluno(aluno, mediaMinima).situacao ===
        "Aprovado"
      );
    },
    aluno => {
      let dados = dadosAluno(aluno, mediaMinima);

      return {
        nome: aluno.nome,
        matricula: aluno.matricula,
        curso: aluno.curso,
        media: dados.media
      };
    },
    (a, b) => a.nome.localeCompare(b.nome)
  );
}

export function relatorioReprovados(alunos, mediaMinima = 6) {
  return gerarRelatorio(
    alunos,
    aluno => {
      return (
        dadosAluno(aluno, mediaMinima).situacao ===
        "Reprovado"
      );
    },
    aluno => {
      let dados = dadosAluno(aluno, mediaMinima);

      return {
        nome: aluno.nome,
        matricula: aluno.matricula,
        curso: aluno.curso,
        media: dados.media
      };
    },
    (a, b) => a.media - b.media
  );
}

export function relatorioCursoCsv(alunos, curso) {
  let filtro = criarFiltro("curso", curso);

  let resultado = gerarRelatorio(
    alunos,
    filtro,
    aluno => {
      let dados = dadosAluno(aluno);

      return {
        matricula: aluno.matricula,
        nome: aluno.nome,
        email: aluno.email,
        curso: aluno.curso,
        media: dados.media
      };
    },
    (a, b) => a.nome.localeCompare(b.nome)
  );

  let linhas = [];

  linhas.push(
    "matricula;nome;email;curso;media"
  );

  for (let aluno of resultado) {
    let media = aluno.media === null
      ? "N/A"
      : aluno.media.toFixed(2);

    linhas.push(
      `${aluno.matricula};${aluno.nome};${aluno.email};${aluno.curso};${media}`
    );
  }

  return linhas.join("\n");
}

export function relatorioResumo(alunos) {
  let cursos = [];

  for (let aluno of alunos) {
    if (!cursos.includes(aluno.curso)) {
      cursos.push(aluno.curso);
    }
  }

  let resultado = [];

  for (let curso of cursos) {
    let alunosCurso = alunos.filter(
      aluno => aluno.curso === curso
    );

    let soma = 0;
    let quantidadeComNota = 0;

    for (let aluno of alunosCurso) {
      let media = dadosAluno(aluno).media;

      if (media !== null) {
        soma += media;
        quantidadeComNota++;
      }
    }

    let mediaGeral = null;

    if (quantidadeComNota > 0) {
      mediaGeral = soma / quantidadeComNota;
    }

    resultado.push({
      curso: curso,
      quantidade: alunosCurso.length,
      mediaGeral: mediaGeral
    });
  }

  return resultado;
}