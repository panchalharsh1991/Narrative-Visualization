var dataSet;
var svg;

const canvas = {width: 900, height: 900};
const margin = {top: 150, bottom: 70, right: 150, left: 70};
const chart_dimensions = {
    width: canvas.width - (margin.right + margin.left),
    height: canvas.height - (margin.top + margin.bottom)
};

let brush;

var frame = -1;	

var animateFunctions = [
    [animateScene0, null],
    [animateScene1, deanimateScene1],
    [animateScene2,deanimateScene2],
    [animateScene3,deanimateScene3],
    [animateScene4,deanimateScene4]
];

const offenseGroups = {};
let chart;

const x_offenses = d3.scaleBand();
const x_year = d3.scaleBand();

const y_offenseCount = d3.scaleLinear();
const y_offenseCount_axis = d3.scaleLinear();
const yAxis = d3.axisLeft();


function calculateScales() {
    const referenceData = d3.values(offenseGroups);
	console.log(referenceData);
	x_offenses.range([0, chart_dimensions.width])
        .domain(d3.keys(offenseGroups));

    y_offenseCount.domain([0, d3.max(referenceData, function(d) { return d.offenseCount; })])
        .range([0, chart_dimensions.height]);
	y_offenseCount_axis.domain([0, d3.max(referenceData, function(d) { return d.offenseCount; })])
        .range([chart_dimensions.height, 0]);
}

function initializeChartArea() {
    chart = d3.select(".chart")
        .attr("width", canvas.width)
        .attr("height", canvas.height);
}
function createOffenseCountBars() {
    d3.select(".chart")
		.selectAll(".bar-papers-group")
        .data(d3.values(offenseGroups))
        .enter()
        .append("g")
        .classed("bar-papers-group",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left + (20 + x_offenses(d.offense)-x_offenses.bandwidth()/2)) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("bar-papers-rect",true)
        .attr("x", x_offenses.bandwidth()/2)
        .attr("y", chart_dimensions.height)
		.attr("width", x_offenses.bandwidth()/2 - 1)
        .attr("height",0);
}

function showOffenseCountBars() {

    d3.selectAll(".bar-papers-rect")
        .transition()
        .duration(1000)
        .attr("height", function (d) {
            return y_offenseCount(d.offenseCount);
        })
        .attr("y", function (d) {
            return (chart_dimensions.height - y_offenseCount(d.offenseCount));
        });
}

function createOffenseCountAxis() {
    yAxis.scale(y_offenseCount_axis)
        .tickSize(10).ticks(20);

    d3.select(".chart").append("g")
        .attr("id", "yAxisPapersG")
        .classed("y-axis-papers",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height + margin.bottom) + ")")
        .call(yAxis);

    d3.select("svg").append("text")
        .attr("id", "yAxisPapersLabel")
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height + margin.bottom + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Records");
}

function showOffenseCountAxis() {
    d3.select("#yAxisPapersG")
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis)
        .selectAll("text")
        .attr("x", -50)
        .attr("y", 0)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .style("text-anchor", "start");

    d3.select("#yAxisPapersLabel")
        .transition()
        .duration(1000)
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)");
}

function showOffenseAxis() {
    const xAxis = d3.axisBottom().scale(x_offenses)
        .ticks(d3.keys(offenseGroups));

    d3.select(".chart").append("g")
        .attr("id", "xAxisG")
        .classed("x axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", -40)
        .attr("y", 20)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");

    d3.select(".chart").append("text")
        .attr("transform",
            "translate(" + (margin.left + chart_dimensions.width / 2) + " ," +
            (margin.top + chart_dimensions.height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Offense Group");
}

function animateScene( forward ) {
    if (frame > (animateFunctions.length-1)) return;

    const animateFunction = animateFunctions[frame][(forward?0:1)];
    if (animateFunction)
        animateFunction();
}

function animateScene0() {

    initializeChartArea();
    calculateScales();

    createOffenseCountBars();
	showOffenseCountBars();
	createOffenseCountAxis();
	showOffenseCountAxis();
	showOffenseAxis();
}

function animateScene1() {
}

function animateScene2() {
}

function animateScene3() {
}

function animateScene4() {
}

function deanimateScene1() {
}

function deanimateScene2() {
}

function deanimateScene3() {
}

function deanimateScene4() {
}	