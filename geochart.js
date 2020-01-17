var yearDropdown = d3.select("#year");
var factorDropdown = d3.select("#factor");
var chart = d3.select("#chart");



// var color = ['white',  'blue'];
// // if (factorDropdown = 'Total Happiness') {
// //     color = ['white',  'blue'];
// // }
// if (factorDropdown = 'Family') {
//     color = ['white',  'green'];
// }
// else if (factorDropdown = 'Health') {
//     color = ['white',  'yellow'];
// }
// else if (factorDropdown = 'Freedom') {
//     color = ['white',  'red'];
// }
// else if (factorDropdown = 'Trust') {
//     color = ['white',  'orange'];
// }
// else if (factorDropdown = 'Generosity') {
//     color = ['white',  'teal'];
// }
// else if (factorDropdown = 'Dystopia') {
//   color = ['white',  'black'];
// }


function changeMap() {
  var year = d3.select("#year").property("value");
  var factor = d3.select("#factor").property("value");
  var url = `data/GeoChart_Data/${factor}_${year}.csv`;

  chart.html("");

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyDGrZ9Qus4dlPeBjdDkDR35OincWwPutmw',
    callback: function () {
      $.get(url, function (csvString) {
  
        var arrayData = $.csv.toArrays(csvString, { onParseValue: $.csv.hooks.castToScalar });
        var data = new google.visualization.arrayToDataTable(arrayData);
        var options = {colorAxis: {colors: ['white',  'blue']},}
        var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));
  
        chart.draw(data, options);
      })
    }
  })


}
changeMap();

yearDropdown.on("change", changeMap);
factorDropdown.on("change", changeMap);



// var options = {}
//   colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
//   backgroundColor: '#81d4fa',
//   datalessRegionColor: '#f8bbd0',
//   defaultColor: '#f5f5f5',
