function init() {
    for (var i = 0; i < document.querySelectorAll('.accordion').length; i++) {
        document.querySelectorAll('.accordion')[i].addEventListener('click', abre);
    }
    geraGrafico();
    document.querySelector('#ident-var-valor').addEventListener('keyup', identificaVar);
    document.querySelector('#dadosAdicionar').addEventListener('click', addLinha);
    document.querySelector('#dadosRemover').addEventListener('click', removeLinha);
    document.querySelector('#dadosPorcentagem').addEventListener('click', calculaPorcentagem);
    document.querySelector('#calc_td_freq').addEventListener('click', calcularTodasFreq)

    for (var i = 0; i < document.querySelectorAll('.aba').length; i++) {
        document.querySelectorAll('.aba')[i].addEventListener('click', abreAba);
    }
    $('.agrupado').hide();
    $('.nagroup').hide();
    $('input[name="dados"]').change(function () {
        if ($('input[name="dados"]:checked').val() === "agrupados") {
            $('.agrupado').show();
            $('.nagroup').hide();
        } else {
            $('.agrupado').hide();
            $('.nagroup').show();
        }
    });
}
var ret;
function identificaVar() {
    var valor = this.value;
    var campo = document.querySelector('#ident-var-result');
    if (valor !== '' && valor.length > 2) {
        ret = retornaValor('IDENTVAR', 'variavel', '', valor.toUpperCase(), function (e) {
            if (e.valor !== undefined) {
                campo.value = e.valor;
            } else {
                campo.value = e;
            }
        });
    } else {
        campo.value = '';
    }

}

function abre(e) {
    var acordeon = document.querySelectorAll('.accordion');
    if (document.querySelector('.' + e.target.dataset.abre).classList.contains('visivel')) {
        document.querySelector('.' + e.target.dataset.abre).classList.remove('visivel');
        acordeon.classList.remove('');
    } else {
        document.querySelector('.' + e.target.dataset.abre).classList.add('visivel');
        acordeon.classList.add('');
    }
}

function geraGrafico() {
    pieData = [
        {name: 'imposto', y: 40},
        {name: 'salarios', y: 43},
        {name: 'escritório', y: 12},
        {name: 'outros', y: 5}
    ];

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Despesas da Empresa'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
                name: 'Brands',
                colorByPoint: true,
                data: pieData
            }]
    });
}

function addLinha() {
    var tam, i;
    document.querySelector('#dadosTBody').innerHTML += '<tr><td contenteditable=\"true\"></td><td contenteditable=\"true\" id=\"dadosValor\"></td>\n\
<td id=\"porcentagem\"></td></tr>';
    tam = document.querySelectorAll('#dadosValor').length;

    for (i = 0; i < tam; i++) {
        document.querySelectorAll('#dadosValor')[i].addEventListener('blur', total);
        document.querySelectorAll('#dadosValor')[i].addEventListener('click', selecionaLinha);
    }
}

function selecionaLinha(e) {
    if (e.target.parentNode.getAttribute('class') !== 'dadosSelecionada') {
        var tam = document.querySelectorAll('#dadosValor').length;

        for (var i = 0; i < tam; i++) {
            if (document.querySelectorAll('#dadosValor')[i].parentNode.getAttribute('class') === 'dadosSelecionada') {
                document.querySelectorAll('#dadosValor')[i].parentNode.setAttribute('class', '');
            }
        }
        e.target.parentNode.setAttribute('class', 'dadosSelecionada');
    }
}

function total(e) {
    if (e.target.innerText.trim()) {
        if (!isNaN(e.target.innerText.trim()) && e.target.innerText.trim() !== '') {
            var campos = document.querySelectorAll("#dadosValor"), i, total = 0;
            for (i = 0; i < campos.length; i++) {
                total += parseFloat(campos[i].innerText === '' ? 0 : campos[i].innerText);
            }
            document.querySelector('#dadosTotal').innerText = total;
        }
    }
}

function ordenarDados(dados, split) {
    var tmp = dados.split(split);
    return tmp.sort(sortfunction);
    //retorno = ["", "", "", ""]
}

function sortfunction(a, b) {
    return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
}

function repetidos(object) {
    //a = ["Mike", "Matt", "Nancy", "Adam", "Jenny", "Nancy", "Carl"];
    a = object;
    b = {};
    var json = '{"new":[';
    var z = 0;
    for (var i = 0; i < a.length; i++) {

        if (b[a[i]] === a[i]) {
            jsontmp = json + ']}';
            jsontmp = JSON.parse(jsontmp);
            jsonnew = jsontmp.new;
            for (var v = 0; v < jsonnew.length; v++) {
                if (jsonnew[v].VAR === a[i]) {
                    jsonnew[v].QTDE = jsonnew[v].QTDE + 1;
                }
            }
            json = JSON.stringify(jsontmp).replace(']}', '');
        } else {
            b[a[i]] = a[i];
            if (z !== 0) {
                json += ',';
            }
            z++;
            json += '{"VAR":"' + a[i] + '","QTDE":1}';
        }
    }
    json += ']}';
    return JSON.stringify(JSON.parse(json).new);
    //retorno Json
}
function trunc(valor, casas) {
    var og = Math.pow(10, casas);
    return Math.floor(valor * og) / og;
}

function removeLinha() {
    var tabela = document.querySelector('#dadosTBody'),
            linha = document.querySelector('.dadosSelecionada');

    tabela.removeChild(linha);
}

function calculaPorcentagem() {
    var total = document.querySelector('#dadosTotal').innerText, valores, porcentagens;

    if (total) {
        valores = document.querySelectorAll('#dadosValor');
        porcentagens = document.querySelectorAll('#porcentagem');

        for (var i = 0; i < valores.length; i++) {
            porcentagens[i].innerText = ((parseFloat(valores[i].innerText) * 100) / total) + '%';
        }
    }
}

function abreAba(e) {
    var id = e.target.getAttribute("class").split("aba")[1].trim();
    
    for(var i = 0; i < document.querySelectorAll('.conteudo1').length; i++){
        document.querySelectorAll('.conteudo1')[i].setAttribute("class", "conteudo");
    }
    
    document.querySelector('#' + id).setAttribute("class", "conteudo1");
}
function calcularTodasFreq() {
    var valores = document.querySelector('.divi4').querySelector('.valores').value;
    if (valores !== '' && valores !== undefined) {
        var rep = repetidos(ordenarDados(valores, ';'));
        var intervalo = 1 + 3.33 * Math.log(JSON.parse(rep).length);//ignora decimais
        //primeiro valor que ele tem na poisção 0 do rep + o intervalo 
        // Ex: 1,2,4,5 
        // qtde4,2,3,11
        // Intervalo = 3
        //     1|--3 = 6
        //     3|--6 = 14
        var tabela = criarTabela(rep);
        document.querySelector('.tab_frequencia').innerHTML = tabela;
    } else {
        alert('Favor informar os valores separados por ;');
    }

}

function criarTabela(jsonDados) {
    var dados = JSON.parse(jsonDados);
    var tabela = '<table>';
    tabela += '<thead><tr><td></td><td>Frequência</td></tr></thead>';
    for (var i = 0; i < dados.length; i++) {
        tabela += '<tr><td>' + dados[i].VAR + '</td><td>' + dados[i].QTDE + '</td></tr>';
    }
    tabela += '</table>'
    return tabela;
}

init();
