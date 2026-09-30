function normalizarTexto(texto) {
  return String(texto).trim().replace(/\s+/g, " ");
}

function normalizarNome(nome) {
  return normalizarTexto(nome)
    .toLowerCase()
    .replace(/\b\p{L}/gu, letra => letra.toUpperCase());
}

function normalizarEmail(email) {
  return normalizarTexto(email).toLowerCase();
}

function normalizarCurso(curso) {
  return normalizarTexto(curso);
}

function normalizarMatricula(matricula) {
  return normalizarTexto(matricula).toUpperCase();
}

function validarNome(nome) {
  if (nome.length < 3) {
    throw new Error("Nome deve ter pelo menos 3 caracteres.");
  }
}

function validarEmail(email) {
  if (!email.includes("@") || !email.includes(".")) {
    throw new Error("E-mail inválido.");
  }
}

function validarNotas(notas) {
  for (let nota of notas) {
    if (typeof nota !== "number" || nota < 0 || nota > 10) {
      throw new Error("As notas devem estar entre 0 e 10.");
    }
  }
}

export function calcularMedia(aluno) {
  if (aluno.notas.length === 0) {
    return null;
  }

  let soma = 0;

  for (let nota of aluno.notas) {
    soma += nota;
  }

  return soma / aluno.notas.length;
}

export function calcularSituacao(aluno, mediaMinima = 6) {
  let media = calcularMedia(aluno);

  if (media === null) {
    return "Sem notas";
  }

  if (media >= mediaMinima) {
    return "Aprovado";
  }

  return "Reprovado";
}

export function dadosAluno(aluno, mediaMinima = 6) {
  return {
    ...aluno,
    media: calcularMedia(aluno),
    situacao: calcularSituacao(aluno, mediaMinima)
  };
}

export class CadastroAlunos {
  constructor() {
    this.alunos = [];
  }

  cadastrar(aluno) {
    let novoAluno = {
      id: aluno.id,
      matricula: normalizarMatricula(aluno.matricula),
      nome: normalizarNome(aluno.nome),
      email: normalizarEmail(aluno.email),
      curso: normalizarCurso(aluno.curso),
      notas: [...aluno.notas]
    };

    if (
      this.alunos.some(
        item => item.matricula === novoAluno.matricula
      )
    ) {
      throw new Error("Matrícula já cadastrada.");
    }

    validarNome(novoAluno.nome);
    validarEmail(novoAluno.email);
    validarNotas(novoAluno.notas);

    this.alunos.push(novoAluno);

    return novoAluno;
  }

  buscar(matricula) {
    matricula = normalizarMatricula(matricula);

    return this.alunos.find(
      aluno => aluno.matricula === matricula
    ) || null;
  }

  remover(matricula) {
    matricula = normalizarMatricula(matricula);

    let indice = this.alunos.findIndex(
      aluno => aluno.matricula === matricula
    );

    if (indice === -1) {
      return null;
    }

    return this.alunos.splice(indice, 1)[0];
  }

  listar() {
    return [...this.alunos];
  }
}