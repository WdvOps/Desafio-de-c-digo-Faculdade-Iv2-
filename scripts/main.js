//------------ DECLARAÇÃO DE VARIÁVEI GLOBAIS ------------//

// REFERENCIA FORMU8LARIO
const infoDados = document.getElementById('dados');

// REFERENCIA TABELA DO HISTÓRICO
let tableH = document.getElementById('tableHist');

// RECEBE O VALOR DA MÉDIA INSERIDA NO INPUT MEDIA
let mediaKm = document.getElementById('media');

// RECEBE O VALOR DO COMBUSTÍVEL INSERIDO NO INPUT PREÇO
let precoComb = document.getElementById('preco');

// RECEBE O VALOR DA KILOMETRAGEM DIÁRIA INSERIDO NO INPUT QUILÔMETROS POR DIA
let usoKmDia = document.getElementById('quilometros_dia');

// RECEBE A QUANTIDADE DE DIAS DA SEMANA QUE O VEÍCULO É USADO INSERIDO NO INPUT DIAS_SEMANA
let diasSemana = document.getElementById('dias_semana');

// ARRAY DE OBJETOS
let gastosArray = [];

// VARIÁVEIS QUE RECEBERÃO OS VALORES CALCULADOS
let gastoDiario;
let gastoSemanal;
let gastoMensal;
let gastoAnual;
//------------- FIM DA DECLARAÇÃO DE VARIÁVEI GLOBAIS ------------//

//--------------FUNÇÕES------------//

// FUNÇÃO QUE LIMPA OS CAMPOS DO FORMULARIO
function limpaCampos() {
    document.getElementById('dados');
    mediaKm.value = '';
    precoComb.value = '';
    usoKmDia.value = '';
    diasSemana.value = '';
    document.getElementById('media').focus()
}

// VALIDAÇÃO DOS CAMPOS 
function validaCampos() {

    if (mediaKm.value == '') {
        alert('Você precisa informar a media de km/L')
        document.getElementById('media').focus();
    } else if (precoComb.value == '') {
        alert('Você precisa informar o preço atual do combustível')
        document.getElementById('preco').focus();

    } else if (usoKmDia.value == '') {
        alert('Você precisa informar a quantidade de quilômetros que percorre diariamente')
        document.getElementById('quilometros_dia').focus();

    } else if (diasSemana.value == '') {
        alert('Você precisa informar a quantidade de dias que você usa seu veículo semanalmente')
        document.getElementById('dias_semana').focus();

    } else {

        showModalRes();
    }
}

// FAZ OS CÁUCULOS COM BASE NAS INSFORMAÇÕES CAPTURADAS NOS INPUTS
function calcular() {
    gastoDiario = parseFloat((Number(usoKmDia.value) / Number(mediaKm.value) * Number(precoComb.value.replace(',', '.')))).toFixed(2);
    gastoSemanal = parseFloat(Number(diasSemana.value) * Number(gastoDiario)).toFixed(2);
    gastoMensal = (Number(gastoSemanal) * 4).toFixed(2);
    gastoAnual = (Number(gastoMensal) * 12).toFixed(2);
}

// GERA TABELA DE RESULTADO:
function geraTabelaRes() {
    let table = document.querySelector('#tableRC');
    table.innerHTML = '';
    table.innerHTML += `
            <tr>
                <td>R$ ${gastoDiario}</td>
                <td>R$ ${gastoSemanal}</td>
                <td>R$ ${gastoMensal}</td>
                <td>R$ ${gastoAnual}</td>
            </tr>
    `
}

// FUNÇAO PARA FORMATAÇÃO DA DATA ATUAL
let formatDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    return currentDate;
};

// CONSTRÓI ARRAY DE OBJETOS
function listaGastos() {
    const Gastos = {
        Data: formatDate(),
        PrecoCombustivel: Number(preco.value.replace(',', '.')).toFixed(2),
        MediaKmL: Number(media.value).toFixed(2),
        GastoDiario: Number(gastoDiario).toFixed(2),
        GastoSemanal: Number(gastoSemanal).toFixed(2),
        GastoMensal: Number(gastoMensal).toFixed(2),
        GastoAnual: Number(gastoAnual).toFixed(2),
        Acao: ''
    }

    // INSERE OBJETOS NO ARRAY
    gastosArray.unshift(Gastos);
}

// GERA TABELA DO HISTÓRICO
function geraTabelaHist(tableH, array) {
    // Inicia o contador do index para posicionamento do botão de ações
    let index = 0;

    //Faz a busca pelos objetos dentro do array
    for (let elementos of array) {

        //Insere as respectivas linhas da tabela 
        let row = tableH.insertRow();

        //Faz a busca pelas chaves dos objetos encontrados no array
        for (let key in elementos) {

            //Insere as respectivas células nas linhas da tabela
            let cell = row.insertCell()

            //Cria um nó de texto para inserção dos dados encontrados nos elementos em suas respectivas colunas(keys)
            let texto = document.createTextNode(elementos[key]);

            //Insere as propriedades dos objetos nas células da tabela HTML
            cell.appendChild(texto);

            //Verifica a existência da chave ações dentro do objeto ecaso true, faz a insersão do ícone de deleção de itens
            if (key == 'Acao') {

                //Atribui a classe excluir-item ao ícone de deleção de items
                cell.setAttribute('class', 'excluir-item')

                //Injeta o ícone na respectiva célula da tabela HTML
                cell.innerHTML = insereIcone(index)
            }
        }

        //Faz o incremento de loocalização de cada posição de objeto no array
        index++
    }

    //Invoca a função de limpeza dos campos do formulario
    limpaCampos()
}

// INSERE ÍCONE DE DELEÇÃO NAS LINHAS DA COLUNA DE AÇÃO NA TABELA DO HISTÓRICO
function insereIcone(index) {
    let deleteIcon = ' <span class="material-icons" onclick = "deleteItem(' + index + ')">delete</span>'
    return deleteIcon;
}

// ABRE MODAL RESULTADO
function showModalRes() {
    let element = document.getElementById('resultado');
    let fundoModal = document.getElementById('fundo-modal');
    fundoModal.style.visibility = "visible";
    element.style.display = "block";
}

// ABRE MODAL HISTÓRICO
function showModalHist() {
    let element = document.getElementById('historico');
    let fundoModal = document.getElementById('fundo-modal');

    // Faz uma verificação pelo conteúdo da tabela do histórico e a condição seja true
    //Retorna o modal de registros vazios e caso false evoca o modal da tabela do histórico
    if (gastosArray.length == 0) {
        modalRegisVazio()
    } else {
        fundoModal.style.visibility = "visible";
        element.style.display = "block";
    }
}

//FECHA O MODAL DE HISTÓRICO
function closeModalHist() {
    let element = document.getElementById('historico');
    let fundoModal = document.getElementById('fundo-modal');
    fundoModal.style.visibility = "hidden";
    element.style.display = "none";
};

// DESCARTA DADOS FECHA MODAL RESPOSTA E FOCA NO PRIMEIRO INPUT
//(ESTA FUNÇÃO ESTÁ SENDO CHAMADA NO DESCARTE E NO SALVAMENTO DOS DADOS NO MODAL RESPOSTA)
function closeModalRes() {
    let element = document.querySelector("#resultado");
    let fundoModal = document.querySelector("#fundo-modal");
    fundoModal.style.visibility = "hidden";
    element.style.display = "none";
}

// DELETA TODOS OS DADOS DO HISTÓRICO
function deleteAll() {
    document.getElementById('tableHist');
    gastosArray = [];
    document.getElementById('tableHist').innerHTML = '';
    modalRegisVazio()
}

// DELETA LINHAS ESPECÍCAS DO HISTÓRORICO
//VINCULADO AO ÍCONE "DELETE" NAS LINHAS DA TABELA NA COLUNA DE ACÕES
function deleteItem(index) {

    //Remove a linha específica onde cada ícone de deleção se encontra n atabela do histórico
    gastosArray.splice(index, 1)

    // Faz uma verificação pelo conteúdo da tabela do histórico e a condição seja true após a exclusão de um item
    // faz a limpeza da tabela fecha o modal do histórico e retorna o modal de registros vazios 
    if (gastosArray.length <= 0) {
        document.getElementById('tableHist').innerHTML = '';
        closeModalHist()
        modalRegisVazio()
    } else {
        //e caso false, reseta e evoca o modal da tabela do histórico atualizada
        document.getElementById('tableHist').innerHTML = '';
        geraTabelaHist(tableH, gastosArray);
    }
}

// Mostra o modal de registros vazios
function modalRegisVazio() {
    let element = document.getElementById('zero-registros')
    let fundoModal = document.querySelector("#fundo-modal");

    fundoModal.style.visibility = "visible";
    element.style.display = "block";
}

// Fecha o modal de registros vazios
function closeModalRegisVazio() {
    let element = document.getElementById('zero-registros')
    let fundoModal = document.querySelector("#fundo-modal");

    fundoModal.style.visibility = "hidden";
    element.style.display = "none";
    document.getElementById('media').focus();

}
//------------- FIM DAS FUNÇÕES ------------//


//----------- EVENT LISTENERS / ASSISTINDO AS CHAMADAS DE EVENTOS ------------//

// ASSISTE A CHAMADA DA FUNÇÃO DE CÁLCULO E ABERTURA DO MODAL RESULTADO
document.getElementById('btn_calcula').addEventListener('click', function (evento) {
    evento.preventDefault();
    validaCampos();
    calcular();
    geraTabelaRes();

})

// ASSISTE A CHAMADA DA FUNÇÃO DE SALVAR DADOS NO HISTÓRICO
document.getElementById('salvar').addEventListener('click', function (evento) {
    evento.preventDefault();
    listaGastos();
    document.getElementById('tableHist').innerHTML = '';
    geraTabelaHist(tableH, gastosArray);
    closeModalRes();
    limpaCampos()
})

// ASSISTE A CHAMADA DA FUNÇÃO DE MOSTRAR HISTÓRICO
document.getElementById('ver-historico').addEventListener('click', function (evento) {
    evento.preventDefault();

    showModalHist();
})

// ASSISTE A CHAMADA DA FUNÇÃO DE FECHAMENTO DO MODAL HISTÓRICO
document.getElementById('closeModal').addEventListener('click', function (evento) {
    evento.preventDefault();
    closeModalHist();
})

// DESCARTA OS DADOS DO FORMULARIO DE RESULTADOS E LIMPA TODOS OS CAMPOS
document.querySelector('#descartar').addEventListener('click', function (evento) {
    evento.preventDefault();
    closeModalRes()
    limpaCampos()
})

// ASSISTE A CHAMADA DA FUNÇÃO DE EXCLUSÃO DOS REGISTROS E DISPARA AS FUNÇÕES DE FECHAMENTO DO MODAL DE HISTÓRICO E
//EVOCAÇÃO DO MODAL DE REGISTROS VAZIOS
document.getElementById('excluir-registros').addEventListener('click', function (evento) {
    evento.preventDefault();
    deleteAll();
    closeModalHist();
    modalRegisVazio()
})

// ASSISTE A CHAMADA DA FUNÇÃO QUE FECHA O MODAL DE REGISTROS VAZIOS
document.getElementById('closeModalRegVazio').addEventListener('click', function (evento) {
    evento.preventDefault();
    closeModalRegisVazio()
})
//------------FIM DAS INSTRUÇÕES ------------//





