var qtdAluno = 0;
var qtdNota = 0;

window.onload = function () {
    qtdAluno = Number(document.querySelector("#inputRangeCtrl").value);
    qtdNota = Number(document.querySelector("#qtdNotas").value);
    iniciar();

    var inputRangeCtrl = document.querySelector("#inputRangeCtrl");
    var inputRangeValor = document.querySelector("#inputRangeValor");
    inputRangeCtrl.addEventListener("change", (event) => {
        HabilitarOrdenacao(false);
        var atual = Number(inputRangeCtrl.value);
        var qtdincl = 0;
        inputRangeValor.value = atual;
        if (atual > qtdAluno) {
            for (let i = Number(qtdAluno) + 1; i <= atual; i++)
                criarRowAluno(i);
            qtdAluno = atual;
            alertBootstrap(`A quantidade de alunos foi atualizado para ${atual} registro(s).`, 'info');
        }
        else {
            for (let i = Number(qtdAluno); i > atual; i--) {
                removerRowAluno();
            }
            qtdAluno = atual;
            alertBootstrap(`A quantidade de alunos foi atualizado para ${atual} registro(s).`, 'info');
        }
    });

}



function createTh2(referenceNode, titulo, align) {
    const th = document.createElement("th");
    th.innerText = titulo;
    th.setAttribute('scope', 'col');
    th.setAttribute('class', `text-${align} thNota`);
    insertAfter(referenceNode, th)
    qtdNota += 1;
}

function createNewTdNota(id) {
    let td = document.createElement("td");
    td.setAttribute("class", "tdNota");

    let element = criarElemento("input", "Number", id)
    td.appendChild(element);
    return td
}

function inserirNota() {
    var childrenHead = document.querySelectorAll(".thNota");
    let countNodes = childrenHead.length
    let notaId = countNodes + 1;
    let lastNode = countNodes - 1;
    //alert(children[lastNode].innerText);
    createTh2(childrenHead[lastNode], `Nota ${notaId}`, 'center');

    const tbody = document.querySelector('tbody')
    for (let i = 0; i < tbody.childNodes.length; i++) {
        let tr = tbody.childNodes[i];
        let tdNota = tr.childNodes[tr.childNodes.length - 3];
        let idInputNota = tdNota.childNodes[0].id.substring(0, 6) + notaId;
        let newTdNota = createNewTdNota(idInputNota);

        insertAfter(tdNota, newTdNota);
    }
}

function removerNota() {
    var childrenHead = document.querySelectorAll(".thNota");
    let countNodes = childrenHead.length

    let thNota = childrenHead[childrenHead.length - 1]

    thNota.parentNode.removeChild(thNota);

    const tbody = document.querySelector('tbody')
    for (let i = 0; i < tbody.childNodes.length; i++) {
        let tr = tbody.childNodes[i];
        let tdNota = tr.childNodes[tr.childNodes.length - 3];

        tr.removeChild(tdNota);
    }
    qtdNota -= 1;

}

function atualizarColunasNotas() {
    let qtdNotaNew = Number(document.querySelector("#qtdNotas").value);

    if (qtdNotaNew > qtdNota) {
        for (let i = qtdNota; i < qtdNotaNew; i++) {
            inserirNota();
        }
    }
    else if (qtdNotaNew < qtdNota) {

        for (let i = qtdNota; i > qtdNotaNew; i--) {

            removerNota();
        }
    }
}

function removerRowAluno() {
    const tbody = document.querySelector("tbody");

    tbody.removeChild(tbody.lastElementChild);
    //tbody.childElementCount
}


function formatarNumeroComZeroEsq(numero, qtdnumero) {
    var result = numero.toString();

    while (result.length < qtdnumero)
        result = + '0' + result;

    return result;
}


function createTh(tr, titulo, align, isThNota) {
    const th = document.createElement("th");
    th.innerText = titulo;
    th.setAttribute('scope', 'col');
    th.setAttribute('class', `text-${align}`);
    if (isThNota)
        th.setAttribute('class', `text-${align} thNota`);
    else
        th.setAttribute('class', `text-${align}`);

    tr.appendChild(th);
}


function formataNota(nota) {
    if (nota == 100)
        return nota

    return nota.toFixed(1)
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alertBootstrap = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


function limitaValor(ids, valorMax, msgAlerta) {
    var x = document.getElementById(ids);

    if (x.value > valorMax) {
        x.value = '';
        alertBootstrap(msgAlerta, 'danger');
    }
}

function criarElemento(typeElement, typeInput, id) {
    const element = document.createElement(typeElement);

    element.setAttribute('id', id);

    if (typeElement == "input") {
        element.setAttribute('type', typeInput)

        if (typeInput == "Number") {
            //element.setAttribute('onKeyPress','if(this.value.length==3) return false;');
            element.setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57 && this.value.length < 3 ;');
            element.setAttribute('onkeyup', `limitaValor("${id}",100,"A nota máxima é 100.");`);

            element.setAttribute('class', 'form-control nota input');
            element.setAttribute('min', '0');
            element.setAttribute('max', '100');
            element.setAttribute('maxlength', '3');
        }
        else {
            element.setAttribute('class', 'form-control');
            element.setAttribute('maxlength', '50');
        }
        element.setAttribute('onchange', 'HabilitarOrdenacao(false);');

    }
    else {
        element.setAttribute('class', 'w-100 h-100 text-center align-middle m-0 p-0');
        element.style.lineHeight = "50px"
    }

    return element
}

function createTrRow(row, typeInput, id, typeElement, innerText) {
    var td;

    if (innerText != null) {
        td = document.createElement("th");
        td.innerText = innerText;
        td.setAttribute("class", "text-center");
        td.style.width = "50px";
    }
    else {
        td = document.createElement("td");
    }

    if (typeElement != '') {
        const element = criarElemento(typeElement, typeInput, id)

        if (typeElement == "input") {
            if (typeInput == "Number") {
                // //td.style.width = "100px";
                td.setAttribute("class", "tdNota");
            }
        }
        else {
            td.setAttribute("class", "text-center h-100 p-0 m-0");
        }
        td.appendChild(element);
    }

    row.appendChild(td);
}

function iniciar() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    const thead = document.querySelector("thead");
    thead.innerHTML = "";

    const tr = document.createElement("tr");
    createTh(tr, "#", "center");
    createTh(tr, "Nome", "left");

    for (let notaIndex = 1; notaIndex <= qtdNota; notaIndex++)
        createTh(tr, `Nota ${notaIndex}`, "center", true);


    createTh(tr, "Média", "center", false);
    createTh(tr, "Situação", "center", false);
    thead.appendChild(tr);

    for (let alunoIndex = 1; alunoIndex <= qtdAluno; alunoIndex++) {
        criarRowAluno(alunoIndex)
    }
}

function criarRowAluno(alunoId) {
    alunoId = formatarNumeroComZeroEsq(alunoId, 2);
    const tbody = document.querySelector("tbody");
    const row = document.createElement("tr");

    createTrRow(row, '', '', '', alunoId);
    createTrRow(row, 'Text', `aluno${alunoId}`, 'input');

    for (let notaIndex = 1; notaIndex <= qtdNota; notaIndex++) {
        createTrRow(row, 'Number', `nota${alunoId}${notaIndex}`, 'input');
    }

    createTrRow(row, '', `media${alunoId}`, 'output');
    createTrRow(row, '', `situacao${alunoId}`, 'output');
    tbody.appendChild(row);
}

function calcularMedia() {
    let somaNotaGeral = 0.0;
    let alunoSemRegistroNome = 0;
    let qtdAlunoComMedia = 0;
    let alunoSemMediaCalc = 0;

    for (let alunoIndex = 1; alunoIndex <= qtdAluno; alunoIndex++) {

        let somaNota = 0.0;
        let alunoIndexFtm = formatarNumeroComZeroEsq(alunoIndex, 2);
        document.querySelector("#situacao" + alunoIndexFtm).value = '';
        let nomeAluno = document.querySelector("#aluno" + alunoIndexFtm).value;
        if (nomeAluno == '' || nomeAluno.length == 0)
            alunoSemRegistroNome++;

        let semNota = 0;
        for (let notaIndex = 1; notaIndex <= qtdNota; notaIndex++) {
            let idNota = "nota" + alunoIndexFtm + notaIndex;
            let nota = document.querySelector("#" + idNota).value;
            if (nota == '' || nota.length == 0)
                semNota++;
            somaNota += Number(nota);
        }

        if (semNota == 0) {
            qtdAlunoComMedia++;

            let media = somaNota / qtdNota;

            somaNotaGeral += media;

            document.querySelector("#media" + alunoIndexFtm).value = formataNota(media);
            document.querySelector("#situacao" + alunoIndexFtm).style.color = 'black';
            document.querySelector("#situacao" + alunoIndexFtm).style.fontWeight = '500';

            if (media >= 50) {
                document.querySelector("#situacao" + alunoIndexFtm).value = 'Aprovado';
                document.querySelector("#situacao" + alunoIndexFtm).style.backgroundColor = 'lime';
            }
            else if (media >= 45) {
                document.querySelector("#situacao" + alunoIndexFtm).value = 'Recuperação';
                document.querySelector("#situacao" + alunoIndexFtm).style.backgroundColor = 'yellow';
            }
            else {
                document.querySelector("#situacao" + alunoIndexFtm).value = 'Reprovado';
                document.querySelector("#situacao" + alunoIndexFtm).style.backgroundColor = 'red';
            }
        }
        else {
            document.querySelector("#media" + alunoIndexFtm).value = "";
            document.querySelector("#situacao" + alunoIndexFtm).value = 'SEM NOTA';
            document.querySelector("#situacao" + alunoIndexFtm).style.backgroundColor = 'firebrick';
            document.querySelector("#situacao" + alunoIndexFtm).style.color = 'white';
            document.querySelector("#situacao" + alunoIndexFtm).style.fontWeight = '700';

            alunoSemMediaCalc++;
            alertBootstrap(`Aluno ${nomeAluno.length > 0 ? nomeAluno : '(registro #' + alunoIndexFtm + ')'} sem registro de nota.`, "danger");
        }

    }

    let outputmediageral = document.querySelector("#outputmediageral");
    if (qtdAlunoComMedia > 0) {
        let mediaGeral = qtdAlunoComMedia > 0 ? somaNotaGeral / qtdAlunoComMedia : 0;
        outputmediageral.value = formataNota(mediaGeral);
    }
    else
        outputmediageral.value = '--';

    if (alunoSemRegistroNome > 0) {
        alertBootstrap(`Há ${alunoSemRegistroNome} aluno${alunoSemRegistroNome > 1 ? 's' : ''} sem registro de nome.`, "warning");
        HabilitarOrdenacao(false);
    }

    if (alunoSemMediaCalc > 0) {
        alertBootstrap(`Há ${alunoSemMediaCalc} aluno${alunoSemMediaCalc > 1 ? 's' : ''} sem média calculada.`, "warning");
        HabilitarOrdenacao(false);
    }

    if (alunoSemRegistroNome == 0 && alunoSemMediaCalc == 0) {
        HabilitarOrdenacao(true);
        alertBootstrap(`Médias dos alunos calculadas com sucesso.`, "success");
    }
}

function HabilitarOrdenacao(habilitar) {
    const colunmOrder = document.querySelector('#colunmOrder');
    const typeOrder = document.querySelector('#typeOrder');
    const btnOrder = document.querySelector('#btnOrder');
    if (habilitar) {
        colunmOrder.removeAttribute('disabled');
        typeOrder.removeAttribute('disabled');
        btnOrder.removeAttribute('disabled');
    }
    else {
        colunmOrder.setAttribute('disabled', true);
        typeOrder.setAttribute('disabled', true);
        btnOrder.setAttribute('disabled', true);
    }
}


