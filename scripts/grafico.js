
function exibirGrafico() {

    let objetivos = ''
    let _separador = '';
    let qtdAlunosSemRegNota =0;
    let qtdNotasSemReg =0;
    let qtdMediasSemReg =0; 

    for (let i = 1; i <= qtdAluno; i++) {
        let alunoIndex = formatarNumeroComZeroEsq(i, 2);
        let nomealuno = document.querySelector(`#aluno${alunoIndex}`).value;

        if (nomealuno.length==0){
            qtdAlunosSemRegNota++;
        }

        objetivos += _separador + nomealuno;
        _separador = ","
    }

    let expressaoNota='';
   
    for (let i= 1; i <= qtdNota;i++ ){
        expressaoNota += `&etapa${i}=`;
        _separador = '';
        for (let j = 1; j <= qtdAluno; j++) {
            let alunoIndex = formatarNumeroComZeroEsq(j, 2);
            let nota =  document.querySelector(`#nota${alunoIndex}${i}`).value;
            if (nota.length ==0 || nota ==''){
                qtdNotasSemReg++;
            }

            expressaoNota += _separador + nota;
            _separador = ","
        }
    }

    _separador = "";
    let expressaoMedia = `&media=`;
    
    for (let j = 1; j <= qtdAluno; j++) {
        let alunoIndex = formatarNumeroComZeroEsq(j, 2);
        let media =  document.querySelector(`#media${alunoIndex}`).value;
        if (media.length ==0 || media ==''){
            qtdMediasSemReg++;
        }

        expressaoMedia += _separador + media;
        _separador = ","
    }
   
    if (qtdAlunosSemRegNota==0 && qtdNotasSemReg == 0){
        let exibirMedia = false;
        if (qtdMediasSemReg == 0 ){
            expressaoNota  += expressaoMedia;
            exibirMedia = true;
        }
          
        NewWindow(`chartBarra.html?exibirMedia=${exibirMedia}&qtdNota=${qtdNota}&objetivos=${objetivos}${expressaoNota}`, 'pagename', '650', '300', 'no', 'center');
    }
    else{
        if (qtdAlunosSemRegNota> 0)
           alertBootstrap(`Existe ${qtdAlunosSemRegNota} aluno${qtdAlunosSemRegNota>1?'s':''} sem registro de nome.`, 'danger');
        if (qtdNotasSemReg >0)
           alertBootstrap(`Existe ${qtdNotasSemReg} nota${qtdNotasSemReg>1?'s':''} sem registro de valor.`, 'danger');       
    }
        
    return false
};

function NewWindow(mypage, myname, w, h, scroll, pos) {
    if (pos == "center") {
        LeftPosition = (screen.width) ? (screen.width - w) / 2 : 350;
        TopPosition = (screen.height) ? (screen.height - h) / 2 : 500;
    } else {
        LeftPosition = 0;
        TopPosition = 20
    }
    settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
    let win = window.open(mypage, myname, settings);
}