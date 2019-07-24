var dataSet;
var svg;

const canvas = {width: 900, height: 500};
const margin = {top: 50, bottom: 70, right: 70, left: 50};
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

const y_offenceCount = d3.scaleLinear();
const y_offenceCount_axis = d3.scaleLinear();
let chart;

const yAxisOffences = d3.axisLeft();
const x_offences = d3.scaleBand();


function calculateScales() {
    const referenceData = d3.values(offenseGroups);
	console.log(referenceData);
    x_offences.range([0, chart_dimensions.width])
        .domain(d3.keys(offenseGroups));

    x_offences.invert = (
        function(){
            const domain = x_offences.domain();
            const range = x_offences.range();
            const scale = d3.scaleQuantize().domain(range).range(domain);

            return function(x){
                return scale(x)
            }
        }
    )();

    y_offenceCount.domain([0, d3.max(referenceData, function(d) { return d.offenceCount; })])
        .range([0, chart_dimensions.height]);

    y_offenceCount.domain([0, d3.max(referenceData, function(d) { return d.offenceCount; })])
        .range([chart_dimensions.height, 0]);

}

function initializeChartArea() {
    chart = d3.select(".chart")
        .attr("width", canvas.width)
        .attr("height", canvas.height);
}
function createPaperBars() {
    d3.select(".chart").selectAll(".bar-papers-group")
        .data(d3.values(offenseGroups))
        .enter()
        .append("g")
        .classed("bar-papers-group",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("bar-papers-rect",true)
        .attr("width", x_offences.bandwidth() / 2 - 1)
        .attr("height", 0)
        .attr("x", x_offences.bandwidth() / 2)
        .attr("y", chart_dimensions.height);
}

function showPaperBars() {

    d3.selectAll(".bar-papers-rect")
        .transition()
        .duration(1000)
        .attr("height", function (d) {
            return y_offenceCount(d.offenceCount);
        })
        .attr("y", function (d) {
            return (chart_dimensions.height - y_offenceCount(d.offenceCount));
        });
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

    createPaperBars();
    showPaperBars();
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