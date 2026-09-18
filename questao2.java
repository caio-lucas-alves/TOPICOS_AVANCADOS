const cursos = [];

function inserirCurso(codigo, nome, cargaHoraria, ativo) {
    cursos.push({
        codigo: codigo,
        nome: nome,
        cargaHoraria: cargaHoraria,
        ativo: ativo
    });
}

function listarCursos() {
    cursos.map(function(curso) {
        console.log(curso.codigo + " - " + curso.nome + " - " + curso.cargaHoraria + " horas - Ativo: " + curso.ativo);
    });
}

function filtrarCursosAtivos() {
    return cursos.filter(function(curso) {
        return curso.ativo == true;
    });
}

function calcularMediaCargaHoraria(cursosAtivos) {
    const total = cursosAtivos.reduce(function(soma, curso) {
        return soma + curso.cargaHoraria;
    }, 0);

    return total / cursosAtivos.length;
}

inserirCurso("001", "JavaScript", 40, true);
inserirCurso("002", "HTML e CSS", 30, true);
inserirCurso("003", "Python", 50, false);
inserirCurso("004", "Banco de Dados", 40, true);

console.log("=== TODOS OS CURSOS ===");
listarCursos();

const cursosAtivos = filtrarCursosAtivos();

console.log("=== RELATÓRIO ===");
console.log("Total de cursos: " + cursos.length);
console.log("Total de cursos ativos: " + cursosAtivos.length);
console.log("Média da carga horária: " + calcularMediaCargaHoraria(cursosAtivos));