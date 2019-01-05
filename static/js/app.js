// var FusionCharts = require('fusioncharts');
// var Charts = require('fusioncharts/fusioncharts.charts');
// // var FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');
// Charts(FusionCharts);
// FusionTheme(FusionCharts);

// FusionCharts.ready(function() {
  var chartInstance = new FusionCharts({
    type: 'multilevelpie',
    renderAt: 'chart-container',
    // id: "myChart",
    width: '500',
    height: '500',
    dataFormat: 'jsonurl',
    dataSource: "test.json"

    });
    chartInstance.render();
