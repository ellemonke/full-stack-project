// Define dimensions for svg container 
var svgWidth = 1000;
var svgHeight = 400;

var margin = {
    top: 40,
    bottom: 100,
    left: 50,
    right: 300
};

// Define dimensions for chart
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append SVG group to page:
var svg = d3
    .select("#bubble")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append SVG group:
var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create color scale for bubbles    
var allRegions = ["Australia and New Zealand", "Central and Eastern Europe", "Eastern Asia", "Latin America and Caribbean",
"Middle East and Northern Africa", "North America", "Southeastern Asia", "Southern Asia", "Sub-Saharan Africa", "Western Europe"]
var circleColor = d3.scaleOrdinal()
    .domain(allRegions)
    .range(d3.schemeCategory10);

// What to do when one group is hovered over
var highlight = function (d) {
    console.log(d);
    // reduce opacity of all groups
    d3.selectAll(".countryCircle").style("opacity", .05);
    // except the one that is hovered
    var classString = regionToClass(d);
    d3.selectAll("." + classString).style("opacity", 1);
    console.log ("." + classString);
}
// And when it is not hovered anymore
var noHighlight = function (d) {
    d3.selectAll(".countryCircle").style("opacity", 1)
}
function regionToClass(region) {
    switch(region) {
        case "Australia and New Zealand": return "bubble-aus";
        case "Central and Eastern Europe": return "bubble-cent";
        case "Eastern Asia" : return "bubble-east";
        case "Latin America and Caribbean" : return "bubble-lat";
        case "Middle East and Northern Africa" : return "bubble-mid";
        case "North America": return "bubble-north";
        case "Southeastern Asia": return "bubble-sea";
        case "Southern Asia": return "bubbles-sa";
        case "Sub-Saharan Africa": return "bubble-sub";
        case "Western Europe": return "bubble-west";
        default: 
            console.log("region not found", region);
    }
}
// Add circles to legend for each name.
var size = 20

svg.selectAll("myrect")
    .data(allRegions)
    .enter()
    .append("circle")
    .attr("cx", 775)
    .attr("cy", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .attr("class", (d) => regionToClass(d))
    .style("fill", d => circleColor(d))
    .on("mouseover", highlight)
    .on("mouseout", noHighlight)

// Add labels beside legend dots
svg.selectAll("mylabels")
    .data(allRegions)
    .enter()
    .append("text")
    .attr("x", 775 + size * .8)
    .attr("y", function (d, i) { return i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", d => circleColor(d))
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseout", noHighlight)

// Function for updating X axis scale 
function xScale(data, xAxis) {
    // Create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[xAxis]),
        d3.max(data, d => d[xAxis])
        ])
        .range([0, width]);

    return xLinearScale;
}

// Function for updating Y axis scale 
function yScale(data, yAxis) {
    // Create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.max(data, d => d[yAxis]),
        d3.min(data, d => d[yAxis])
        ])
        .range([0, height]);

    return yLinearScale;
}

// Function for updating X-axis factor
function renderXAxes(newXScale, newXAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    newXAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return newXAxis;

}

// Function for updating Y-axis factor
function renderYAxes(newYScale, newYAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    newYAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return newYAxis;

}

// Function for updating circles group during transition
function renderCircles(newXScale, xAxis, newYScale, yAxis) {
    console.log("render circles", arguments);

    var circlesGroup = chartGroup.selectAll(".countryCircle")

    circlesGroup.selectAll("circle").transition()
        .duration(1000)
        .attr("cx", d => {
            return newXScale(d[xAxis])
        })
        .attr("cy", d => newYScale(d[yAxis]));

    circlesGroup.selectAll("text").transition()
        .duration(1000)
        .attr("x", function (d) {
            console.log(d)
            return newXScale(d[xAxis])
        })
        .attr("y", d => newYScale(d[yAxis]));
}

// Function for updating circles group with new tooltip
function updateToolTip(xAxis, yAxis) {

    var circlesGroup = chartGroup.selectAll(".countryCircle")
    var xLabel = xAxis;
    var yLabel = yAxis
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.Country}<br>${xLabel}: ${d[xAxis].toFixed(2)}<br>${yLabel}: ${d[yAxis].toFixed(2)}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return chartGroup;
}

// Function to initialize chart
function initChart(data) {
    // Remove previous
    chartGroup.selectAll(".x-axis, .y-axis, .countryCircle, .x-label, .y-label")
        .remove();

    // Create X & Y scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, height]);

    // Create left & bottom axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes & circles
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("id", "xAxis")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .attr("id", "yAxis")
        .attr("transform", `translate(0, 0)`)
        .call(leftAxis);
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("g")
        // Put class on group itself
        .attr("class", (d) => regionToClass(d.Region))
        .classed("countryCircle", true);
       
    circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d[xAxis]))
        .attr("cy", d => yLinearScale(d[yAxis]))
        .attr("r", d => d.Happiness_Score * 2)
        .style("fill", d => circleColor(d.Region));

    // Create X & Y Axes Label Groups
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`)
        .classed("x-label", true);
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${-margin.left}, ${height / 2}) rotate(-90)`)
        .classed("y-label", true);

    // Append label text to chart
    xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 25)
        .attr("id", "xAxisLabel");
    yLabelsGroup.append("text")
        .attr("y", 5)
        .attr("x", 0)
        .attr("id", "yAxisLabel")
        .attr("dy", "1em");

    // Update ToolTip function above csv import
    updateToolTip(xAxis, yAxis);
}
// Function to update chart
function updateChart() {
    var data = chartGroup.selectAll("circle")
        .data();

    // Get value of selection
    var xValue = "Happiness_Score"
    var yValue = d3.select("#factor2").node().value;
    console.log("factor changed: Happiness v.", yValue);

    // Update scales for new factors
    var xLinearScale = xScale(data, xValue);
    var yLinearScale = yScale(data, yValue);

    // Select axes from init function, transition axes based on selected factor
    var xAxis = d3.select("#xAxis")
    var yAxis = d3.select("#yAxis")

    renderXAxes(xLinearScale, xAxis);
    renderYAxes(yLinearScale, yAxis);

    // Update label
    d3.select("#xAxisLabel").text(xValue);
    d3.select("#yAxisLabel").text(yValue);

    // Select circles/chartGroup from init function, update based on selected factor
    renderCircles(xLinearScale, xValue, yLinearScale, yValue);

    // Updates tooltips with new data
    updateToolTip(xValue, yValue);
}
// When HTML loads, run the rest 
document.addEventListener("DOMContentLoaded", function (e) {
    loadYear()
});
// Function to update year
function loadYear() {
    var yearValue = d3.select("#year").node().value

    // Retrieve data from the CSV file and execute everything below
    var url = `data/cleaned_data/${yearValue}.csv`

    d3.csv(url).then(function (data, err) {
        if (err) throw err;

        // Coerce string to integers 
        data.forEach(function (data) {
            data.Happiness_Rank = +data.Happiness_Rank;
            data.Happiness_Score = +data.Happiness_Score;
            data.Economy = +data.Economy;
            data.Family = +data.Family;
            data.Health = +data.Health;
            data.Freedom = +data.Freedom;
            data.Trust = +data.Trust;
            data.Generosity = +data.Generosity;
            data.Dystopia_Residual = +data.Dystopia_Residual;
        })
        initChart(data);
        updateChart();

    }).catch(function (error) {
        console.log(error);
    });
}

// Axis labels event listener
d3.selectAll(".happiness-factor")
    .on("change", updateChart)
d3.selectAll(".bubbleyear")
    .on("change", loadYear)