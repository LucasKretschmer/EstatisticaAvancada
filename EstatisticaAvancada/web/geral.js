function init() {
    for (var i = 0; i < document.querySelectorAll(".accordion").length; i++) {
        document.querySelectorAll(".accordion")[i].addEventListener("click", abre);
    }
    geraGrafico();
}

function abre(e) {
    var acordeon = document.querySelectorAll(".accordion");
    if (document.querySelector('.' + e.target.dataset.abre).classList.contains("visivel")) {
        document.querySelector('.' + e.target.dataset.abre).classList.remove('visivel');
        acordeon.classList.remove("");
    } else {
        document.querySelector('.' + e.target.dataset.abre).classList.add('visivel');
        acordeon.classList.add("");
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





init();