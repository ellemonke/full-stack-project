
      // google.charts.load('current', {
      //   'packages':['geochart'],
      //   // Note: you will need to get a mapsApiKey for your project.
      //   // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      //   'mapsApiKey': 'AIzaSyDGrZ9Qus4dlPeBjdDkDR35OincWwPutmw'
      // });
      // google.charts.setOnLoadCallback(drawRegionsMap);
      // d3.csv("/data/cleaned_data/2015.csv", function(data) {
      //   console.log(data);
      //   console.log(data[1].Health)
      // });
      // var csv = require('./jquery-3.3.1.js');
      // csvString="data/cleaned_data/2015.csv"
      // google.charts.load('current', {
      //   callback: function () {
      //     $.get("data/cleaned_data/2015.csv", function(csvString) {
      //       var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
      
      //       var data = new google.visualization.arrayToDataTable(arrayData);

      //       var options = {}

      //       var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));
      //       chart.draw(data, options);
      //     });
      //   },
      //   packages: ['corechart']
      // });
      // var URL = "https://docs.google.com/spreadsheets/d/1qBKJyEyz9Pgrs91JC2qDoZ_tjJ0KEKuy1go02im-shI/edit#gid=0"
      // function drawChart() {
      //   var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1qBKJyEyz9Pgrs91JC2qDoZ_tjJ0KEKuy1go02im-shI/edit#gid=0", headers=1);
      //   query.send(handleQueryResponse);
      // }
      
      // function handleQueryResponse(response) {
      //   var data = response.getDataTable();
      //   console.log(data)
      //   var chart = new google.visualization.ColumnChart(document.getElementById('columnchart'));
      //   chart.draw(data, null);
      // }
      google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyDGrZ9Qus4dlPeBjdDkDR35OincWwPutmw',
        callback: function () {
          $.get("data/cleaned_data/test_data.csv", function(csvString) {
            
            var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
            var data = new google.visualization.arrayToDataTable(arrayData);
            console.log(arrayData)
            var options = {}
            var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));

        chart.draw(data, options);
          })
        }
      })
      // google.charts.load('current', {
      //   'packages':['geochart'],
      //   // Note: you will need to get a mapsApiKey for your project.
      //   // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      //   'mapsApiKey': 'AIzaSyDGrZ9Qus4dlPeBjdDkDR35OincWwPutmw'
      // });
      // google.charts.setOnLoadCallback(drawRegionsMap);
      
      // d3.csv("/data/cleaned_data/2015.csv", function(data) {
      //   console.log(data);
      //   console.log(data[1,2,3,4,5].Health)
      //   console.log(Object.values(data))
      // });
      // function drawRegionsMap() {
          //  var data = new google.visualization.arrayToDataTable(arrayData);
        // var data = google.visualization.arrayToDataTable([
        //   ["Country", 'Popularity'],
        //   ['Germany', 200],
        //   ['United States', 300],
        //   ['Brazil', 400],
        //   ['Canada', 500],
        //   ['France', 600],
        //   ['RU', 700]
          
        // ]);
        // var options = {}
        //   colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
        //   backgroundColor: '#81d4fa',
        //   datalessRegionColor: '#f8bbd0',
        //   defaultColor: '#f5f5f5',
        // var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));

        // chart.draw(data, options);
      // }
