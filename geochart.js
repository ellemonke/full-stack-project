var yearDropdown = d3.select("#year");
var factorDropdown = d3.select("#factor");
var chart = d3.select("#chart");

function colorChange(factor) {
  if (factor == 'Happiness') {
    return ['white',  '#F26938'];
  }
  else if (factor == 'Family') {
    return ['white',  '#F6BF0D'];
}
  else if (factor == 'Economy') {
      return ['white',  '#F28C0F'];
  }
  else if (factor == 'Health') {
      return ['white',  '#A9BF5A'];
  }
  else if (factor == 'Freedom') {
      return ['white',  '#008089'];
  }
  else if (factor == 'Trust') {
    return ['white',  '#1C6683'];
  }
  else if (factor == 'Generosity') {
    return ['white',  '#164C8E'];
  }
  else if (factor == 'Dystopia') {
    return ['white',  '#A45B5B'];
  }
}

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
        
        color = colorChange(factor)
        
        var options = {colorAxis: {colors: color}, datalessRegionColor: 'silver'}
        
        var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));
  
        chart.draw(data, options);
      })
    }
  })
}

changeMap();

factorDropdown.on("change", changeMap, colorChange);
yearDropdown.on("change", changeMap);


// var options = {}
//   colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
//   backgroundColor: '#81d4fa',
//   datalessRegionColor: '#f8bbd0',
//   defaultColor: '#f5f5f5',

