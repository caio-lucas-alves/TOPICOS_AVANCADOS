function calcularMedia(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

function classificarSituacao(media, frequencia) {
    if (media >= 70 && frequencia >= 75) {
        return "Aprovado";
    } else if (media >= 40 && frequencia >= 75) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

let quantidade = Number(prompt("Quantos alunos serão cadastrados?"));

let aprovados = 0;
let recuperacao = 0;
let reprovados = 0;

for (let i = 1; i <= quantidade; i++) {

    let nome = prompt("Digite o nome do aluno:");
    let matricula = prompt("Digite a matrícula:");

    let nota1 = Number(prompt("Digite a primeira nota:"));
    let nota2 = Number(prompt("Digite a segunda nota:"));
    let nota3 = Number(prompt("Digite a terceira nota:"));

    let frequencia = Number(prompt("Digite a frequência do aluno:"));

    let media = calcularMedia(nota1, nota2, nota3);

    let situacao = classificarSituacao(media, frequencia);

    console.log("Nome: " + nome);
    console.log("Matrícula: " + matricula);
    console.log("Média: " + media.toFixed(2));
    console.log("Situação: " + situacao);

    if (situacao == "Aprovado") {
        aprovados++;
    } else if (situacao == "Recuperação") {
        recuperacao++;
    } else {
        reprovados++;
    }
}

console.log("Total de aprovados: " + aprovados);
console.log("Total em recuperação: " + recuperacao);
console.log("Total de reprovados: " + reprovados);