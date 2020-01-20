// Assign values
var dropdown = d3.select("#correlogramForm");

// Create the graph area
var margin = {top: 50, right: 50, bottom: 30, left: 25},
    width = 540 - margin.left - margin.right,  // 465
    height = 530 - margin.top - margin.bottom  // 450

var svg = d3.select("#correlogramChart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "chart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = d3.select("#chart");

// Change chart upon dropdown event
function changeChart() {

    // Reset the year
    var year = d3.select("#correlogramForm").property("value");
    var url = `data/cleaned_data/correlation_${year}.csv`;

    // Clear the previous chart
    chart.html("");

    // Create the (new) correlogram
    d3.csv(url).then(function(rows) {
        // Going from wide to long format
        var data = [];
        rows.forEach(function(d) {
            var x = d[""];
            delete d[""];
            for (prop in d) {
                var y = prop,
                    value = d[prop];
                data.push({
                    x: x,
                    y: y,
                    value: +value
                });
            }
        });

        // List of all variables and number of them
        var domain = d3.set(data.map(function(d) { return d.x })).values();

        // Create a color scale
        var color = d3.scaleLinear()
            .domain([-1, 0, 1])
            .range(["#1C6683", "#F6Bf0D", "#F2A011"]); 
            // first color is negative number, second number is the small numbers, third color is positive number
            // teal, yellow, orange

        // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
        var size = d3.scaleSqrt()
            .domain([0, 1])
            .range([0, 9]);

        // X scale
        var x = d3.scalePoint()
            .range([0, width])
            .domain(domain);

        // Y scale
        var y = d3.scalePoint()
            .range([0, height])
            .domain(domain);     

        // Create one 'g' element for each cell of the correlogram
        var cor = svg.selectAll(".cor")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "cor")
            .attr("transform", function(d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        // Add circles
        cor
        .filter(function(d){
            var ypos = domain.indexOf(d.y);
            var xpos = domain.indexOf(d.x);
            return xpos != ypos;
        })
            .append("circle")
            .attr("r", function(d){ return size(Math.abs(d.value*3)) })
            .style("fill", function(d){
                if ((d.value > 0.7) && (d.value <= 1)) {
                    return "#F28C0F"    // dark orange - strong
                } else if ((d.value > 0.5) && (d.value <= 0.7)) {
                    return "#F2A011"    // light orange - moderate
                } else if ((d.value > 0.3) && (d.value <= 0.5)) {
                    return "#F6Bf0D"    // yellow - moderate
                } else if ((d.value > 0.0) && (d.value <= 0.3)) {
                    return "#A9BF5A"    // green - weak
                } else {
                    return "#008089"    // teal - none or negative
                }
                // if (d.x == d.y) {
                //     return "#F2A011"
                // } else {
                //     return color(d.value);
                // }
            })
            .style("opacity", 1.0);       

        // Add text
        cor
        .append("text")
        .attr("x", function(d) {
            if (d.x === d.y) {
                return -25;
            } else {
                return -15;
            }
        })
        .attr("y", function(d) {
            if (d.x === d.y) {
                return 5;
            } else {
                return -17;
            }
        })
        // .attr("y", -15)
        .text(function(d) {
            if (d.x === d.y) {
                if (d.x === "Dystopia_Residual") {
                    return "Residual"
                } else {
                    return d.x;
                }
            } else {
                return d.value.toFixed(2);
            }
        })
        .style("font-size", 14)
        .style("font-weight", "bold")
        .style("fill", function(d){
            if (d.x === d.y) {
                return "#254466";
            } else {
                return color(d.value);
            }
        });        

    });
};

// First chart on page load
changeChart();

// Change chart upon dropdown change
dropdown.on("change", changeChart);
