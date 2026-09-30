import { CadastroAlunos } from "./alunos.js";

import {
  relatorioAprovados,
  relatorioReprovados,
  relatorioCursoCsv,
  relatorioResumo,
  criarFiltro
} from "./relatorios.js";

let cadastro = new CadastroAlunos();

cadastro.cadastrar({
  id: 1,
  matricula: "001",
  nome: " joao silva ",
  email: "JOAO@EMAIL.COM",
  curso: "Sistemas de Informação",
  notas: [8, 7, 9]
});

cadastro.cadastrar({
  id: 2,
  matricula: "002",
  nome: "maria souza",
  email: "maria@email.com",
  curso: "Sistemas de Informação",
  notas: [5, 4, 6]
});

cadastro.cadastrar({
  id: 3,
  matricula: "003",
  nome: "pedro lima",
  email: "pedro@email.com",
  curso: "Administração",
  notas: [9, 8, 10]
});

cadastro.cadastrar({
  id: 4,
  matricula: "004",
  nome: "ana costa",
  email: "ana@email.com",
  curso: "Administração",
  notas: []
});

let alunos = cadastro.listar();

console.log("APROVADOS");
console.table(relatorioAprovados(alunos));

console.log("REPROVADOS");
console.table(relatorioReprovados(alunos));

console.log("CSV - SISTEMAS DE INFORMAÇÃO");
console.log(
  relatorioCursoCsv(
    alunos,
    "Sistemas de Informação"
  )
);

console.log("RESUMO POR CURSO");
console.table(relatorioResumo(alunos));

let filtro = criarFiltro("media", 6);

console.log("ALUNOS COM MÉDIA MÍNIMA 6");
console.table(alunos.filter(filtro));

console.log("BUSCAR ALUNO");
console.log(cadastro.buscar("001"));

console.log("REMOVER ALUNO");
console.log(cadastro.remover("004"));

console.log("ALUNOS APÓS REMOÇÃO");
console.table(cadastro.listar());