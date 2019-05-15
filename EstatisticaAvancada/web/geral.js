function init() {
    for (var i = 0; i < document.querySelectorAll('.accordion').length; i++) {
        document.querySelectorAll('.accordion')[i].addEventListener('click', abre);
    }
    geraGrafico();
    document.querySelector('#ident-var-valor').addEventListener('keyup', identificaVar);
    document.querySelector('#dadosAdicionar').addEventListener('click', addLinha);
    document.querySelector('#dadosPorcentagem').addEventListener('click', calculaPorcentagem);
    document.querySelector('#calc_td_freq').addEventListener('click', calcularTodasFreq)
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
    document.querySelector('#dadosTBody').innerHTML += '<tr><td contenteditable=\"true\"></td><td contenteditable=\"true\" id=\"dadosValor\"></td><td></td></tr>';
    tam = document.querySelectorAll("#dadosValor").length;

    for (i = 0; i < tam; i++) {
        document.querySelectorAll("#dadosValor")[i].addEventListener('blur', total);
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
    return tmp.sort();
    //retorno = ["", "", "", ""]
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

function calcularTodasFreq(){
    var valores = document.querySelector('.divi4').querySelector('.valores').value;
    var rep = repetidos(ordenarDados(valores,';'));
    debugger;
}

init();