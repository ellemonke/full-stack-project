// Define dimensions for svg container 
var svgWidth = 500;
var svgHeight = 368;

var margin = {
    top: 40,
    bottom: 100,
    left: 100,
    right: 20
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
function renderCircles(circlesGroup, newXScale, xAxis, newYScale, yAxis) {
    console.log("render circles");

    circlesGroup.selectAll("circle").transition()
        .duration(1000)
        .attr("cx", d => {
            //console.log("cx", d, xAxis)
            return newXScale(d[xAxis])
        })
        .attr("cy", d => newYScale(d[yAxis]));

    circlesGroup.selectAll("text").transition()
        .duration(1000)
        .attr("x", d => newXScale(d[xAxis]))
        .attr("y", d => newYScale(d[yAxis]));

    return circlesGroup;
}

// Function for updating circles group with new tooltip
function updateToolTip(xAxis, yAxis, circlesGroup) {

    var xLabel = xAxis;

    var yLabel = yAxis

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.Country}<br>${xLabel}: ${d[xAxis]}<br>${yLabel}: ${d[yAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });


    return circlesGroup;
}

// Reset the year
// var year = d3.select("#bubbleyear").property("value");
// var url = `data/cleaned_data/${year}.csv`;

// Retrieve data from the CSV file and execute everything below
d3.csv("../data/cleaned_data/2015.csv").then(function (data, err) {
    if (err) throw err;

    console.log('loaded country data', data);

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

    // xLinearScale function 
    var xLinearScale = xScale(data, xAxis);

    // yLinearScale function
    var yLinearScale = yScale(data, yAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    console.log(bottomAxis);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .attr("transform", `translate(0, 0)`)
        .call(leftAxis);

    // Create color scale for bubbles
    var circleColor = d3.scaleOrdinal()
        .domain(["Australia & New Zealand", "Central & Europe", "Eastern Asia", "Latin America & Caribbean",
            "Middle East & North Africa", "North America", "Southeastern Asia", "Southern Asia", "Sub-Saharan Africa", "Western Europe"])
        .range(d3.schemeSet1);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("g");

    circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d[xAxis]))
        .attr("cy", d => yLinearScale(d[yAxis]))
        .attr("r", d => d.Happiness_Score * 2)
        .attr("opacity", "0.75")
        .style("fill", d => circleColor(d.Region))
        .classed("countryCircle", true);

    // Create X & Y Axes Label Groups
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${-margin.left}, ${height / 2}) rotate(-90)`);

    var xAxisLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 25)
        .text("Default X Text");

    var yAxisLabel = yLabelsGroup.append("text")
        .attr("y", 5)
        .attr("x", 0)
        .attr("dy", "1em")
        .text("Default Y Text");

    // Update ToolTip function above csv import
    var circlesGroup = updateToolTip(xAxis, yAxis, circlesGroup);

    // Axis labels event listener
    d3.selectAll(".happiness-factor")
        .on("change", function () {

            // Get value of selection
            var xValue = d3.select("#factor1").node().value;
            var yValue = d3.select("#factor2").node().value;

            console.log("factor changed", xValue, "v.", yValue);

            // Update scales for new factors
            xLinearScale = xScale(data, xValue);
            yLinearScale = yScale(data, yValue);

            // Update axes with transition
            renderXAxes(xLinearScale, xAxis);
            renderYAxes(yLinearScale, yAxis);

            // Update label
            xAxisLabel.text(xValue);
            yAxisLabel.text(yValue);

            // Updates circles with new values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, xValue, yLinearScale, yValue);

            // Updates tooltips with new data
            circlesGroup = updateToolTip(xValue, yValue, circlesGroup);

        });

}).catch(function (error) {
    console.log(error);
});