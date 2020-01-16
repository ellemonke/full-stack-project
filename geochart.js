
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyDGrZ9Qus4dlPeBjdDkDR35OincWwPutmw'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
      d3.csv("/data/cleaned_data/2015.csv", function(data) {
        console.log(data);
        console.log(data[1].Health)
      });
      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]
        ]);

        var options = {}
        //   colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
        //   backgroundColor: '#81d4fa',
        //   datalessRegionColor: '#f8bbd0',
        //   defaultColor: '#f5f5f5',
        // };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart_div'));

        chart.draw(data, options);
      }