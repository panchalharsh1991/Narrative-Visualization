var dataSet;
var svg;

const canvas = {width: 900, height: 900};
const margin = {top: 150, bottom: 70, right: 150, left: 70};
const chart_dimensions = {
    width: canvas.width - (margin.right + margin.left),
    height: canvas.height - (margin.top + margin.bottom)
};

const offenseGroups = {};
const offensesByDay = {};
const offensesByHour = {};
const offensesByMonth = {};

const x_offenses = d3.scaleBand();
const y_offenseCount = d3.scaleLinear();
const y_offenseCount_axis = d3.scaleLinear();
const yAxis = d3.axisLeft();

const x_days = d3.scaleBand();
const y_offensesByDayCount = d3.scaleLinear();
const y_offensesByDayCount_axis = d3.scaleLinear();
const yAxis2 = d3.axisLeft();

const x_hours = d3.scaleBand();
const y_offensesByHourCount = d3.scaleLinear();
const y_offensesByHourCount_axis = d3.scaleLinear();
const yAxis3 = d3.axisLeft();

const x_months = d3.scaleBand();
const y_offensesByMonthCount = d3.scaleLinear();
const y_offensesByMonthCount_axis = d3.scaleLinear();
const yAxis4 = d3.axisLeft();

function calculateScales1(){
	d3.selectAll("#selection").style("visibility","hidden");
	const referenceData = d3.values(offenseGroups);
	console.log(referenceData);
	x_offenses.range([0, chart_dimensions.width])
        .domain(d3.keys(offenseGroups));
    y_offenseCount.domain([0, d3.max(referenceData, function(d) { return d.offenseCount; })])
        .range([0, chart_dimensions.height]);
	y_offenseCount_axis.domain([0, d3.max(referenceData, function(d) { return d.offenseCount; })])
        .range([chart_dimensions.height, 0]);
}

function calculateScales2(){
	d3.selectAll("#selection").style("visibility","hidden");
	const referenceData4 = d3.values(offensesByMonth);
	console.log(referenceData4);
	x_months.range([0, chart_dimensions.width])
        .domain(d3.keys(offensesByMonth));
    y_offensesByMonthCount.domain([0, d3.max(referenceData4, function(d) { return d.offenseCount; })])
        .range([0, chart_dimensions.height]);
	y_offensesByMonthCount_axis.domain([0, d3.max(referenceData4, function(d) { return d.offenseCount; })])
        .range([chart_dimensions.height, 0]);
}

function calculateScales3(){
	d3.selectAll("#selection").style("visibility","hidden");
	const referenceData2 = d3.values(offensesByDay);
	console.log(referenceData2);
	x_days.range([0, chart_dimensions.width])
        .domain(d3.keys(offensesByDay));
    y_offensesByDayCount.domain([0, d3.max(referenceData2, function(d) { return d.offenseCount; })])
        .range([0, chart_dimensions.height]);
	y_offensesByDayCount_axis.domain([0, d3.max(referenceData2, function(d) { return d.offenseCount; })])
        .range([chart_dimensions.height, 0]);
}

function calculateScales4(){
	d3.selectAll("#selection").style("visibility","hidden");
	const referenceData3 = d3.values(offensesByHour);
	console.log(referenceData3);
	
	x_hours.range([0, chart_dimensions.width])
        .domain(d3.keys(offensesByHour));
    y_offensesByHourCount.domain([0, d3.max(referenceData3, function(d) { return d.offenseCount; })])
        .range([0, chart_dimensions.height]);
	y_offensesByHourCount_axis.domain([0, d3.max(referenceData3, function(d) { return d.offenseCount; })])
        .range([chart_dimensions.height, 0]);
}

function initializeChartArea() {
	d3.select(".chart").selectAll("*").remove();
    var chart = d3.select(".chart")
        .attr("width", canvas.width)
        .attr("height", canvas.height);
}

function createOffenseCountBars() {
var div = d3.select("body").append("div");
	
    d3.select(".chart")
		.selectAll(".bar-offenseCount")
        .data(d3.values(offenseGroups))
        .enter()
        .append("g")
        .classed("bar-offenseCount",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left + (20 + x_offenses(d.offense)-x_offenses.bandwidth()/2)) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("rect-offenseCount",true)
        .attr("x", x_offenses.bandwidth()/2)
        .attr("y", chart_dimensions.height)
		.attr("width", x_offenses.bandwidth()/2 - 1)
        .attr("height",0)
		.on("mouseover", function (d) {
			//console.log(d3.event.pageX + ":" + d3.event.pageY);
			div.transition()
            .duration(200)
			.style("opacity", 0.5);
			div.html(d.offenseCount)
			.attr("fill", "white")
			.style("position","absolute")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
     })
		.on("mouseout", function (d) {
			div.transition()
            .duration(1000)
            .style("opacity", 0);
     });
}

function showOffenseCountBars() {

    d3.selectAll(".rect-offenseCount")
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
        .attr("id", "yAxis")
        .classed("y-axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height + margin.bottom) + ")")
        .call(yAxis);

    d3.select("svg").append("text")
        .attr("id", "yAxisLabel")
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height + margin.bottom + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Records");
}

function showOffenseCountAxis() {
    d3.select("#yAxis")
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

    d3.select("#yAxisLabel")
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
        .attr("id", "xAxis")
        .classed("x axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height) + ")")
        .call(xAxis)
        .selectAll("text")
		.call(wrap, x_offenses.bandwidth())
        .attr("x", -20)
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

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", -20).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", -20).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}

function createOffensesByDayCountBars() {
var div = d3.select("body").append("div");
	
    d3.select(".chart")
		.selectAll(".bar-offenseCount")
        .data(d3.values(offensesByDay))
        .enter()
        .append("g")
        .classed("bar-offenseCount",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left + (25 + x_days(d.day)-x_days.bandwidth()/2)) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("rect-offenseCount",true)
        .attr("x", x_days.bandwidth()/2)
        .attr("y", chart_dimensions.height)
		.attr("width", x_days.bandwidth()/2 - 1)
        .attr("height",0)
		.on("mouseover", function (d) {
			//console.log(d3.event.pageX + ":" + d3.event.pageY);
			div.transition()
            .duration(200)
            .style("opacity", .9);
			div.html(d.offenseCount)
			.style("position","absolute")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
     })
		.on("mouseout", function (d) {
			div.transition()
            .duration(1000)
            .style("opacity", 0);
     });
}

function showOffensesByDayCountBars() {

    d3.selectAll(".rect-offenseCount")
        .transition()
        .duration(1000)
        .attr("height", function (d) {
            return y_offensesByDayCount(d.offenseCount);
        })
        .attr("y", function (d) {
            return (chart_dimensions.height - y_offensesByDayCount(d.offenseCount));
        });
}

function createOffensesByDayCountAxis() {
    yAxis2.scale(y_offensesByDayCount_axis)
        .tickSize(10).ticks(20);

    d3.select(".chart").append("g")
        .attr("id", "yAxis")
        .classed("y-axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height + margin.bottom) + ")")
        .call(yAxis2);

    d3.select("svg").append("text")
        .attr("id", "yAxisLabel")
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height + margin.bottom + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Records");
}

function showOffensesByDayCountAxis() {
    d3.select("#yAxis")
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis2)
        .selectAll("text")
        .attr("x", -50)
        .attr("y", 0)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .style("text-anchor", "start");

    d3.select("#yAxisLabel")
        .transition()
        .duration(1000)
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)");
}

function showDaysAxis() {
    const xAxis = d3.axisBottom().scale(x_days)
        .ticks(d3.keys(offensesByDay));

    d3.select(".chart").append("g")
        .attr("id", "xAxis")
        .classed("x axis",true)
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top + chart_dimensions.height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", -20)
        .attr("y", 13)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");

    d3.select(".chart").append("text")
        .attr("transform",
            "translate(" + (margin.left + chart_dimensions.width / 2) + " ," +
            (margin.top + chart_dimensions.height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Days of Week");
}

function createOffensesByHourCountBars() {
var div = d3.select("body").append("div");
	
    d3.select(".chart")
		.selectAll(".bar-offenseCount")
        .data(d3.values(offensesByHour))
        .enter()
        .append("g")
        .classed("bar-offenseCount",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left + (8 + x_hours(d.hour)-x_hours.bandwidth()/2)) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("rect-offenseCount",true)
        .attr("x", x_hours.bandwidth()/2)
        .attr("y", chart_dimensions.height)
		.attr("width", x_hours.bandwidth()/2 - 1)
        .attr("height",0)
		.on("mouseover", function (d) {
			//console.log(d3.event.pageX + ":" + d3.event.pageY);
			div.transition()
            .duration(200)
            .style("opacity", .9);
			div.html(d.offenseCount)
			.style("position","absolute")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
     })
		.on("mouseout", function (d) {
			div.transition()
            .duration(1000)
            .style("opacity", 0);
     });
}

function showOffensesByHourCountBars() {

    d3.selectAll(".rect-offenseCount")
        .transition()
        .duration(1000)
        .attr("height", function (d) {
            return y_offensesByHourCount(d.offenseCount);
        })
        .attr("y", function (d) {
            return (chart_dimensions.height - y_offensesByHourCount(d.offenseCount));
        });
}

function createOffensesByHourCountAxis() {
    yAxis3.scale(y_offensesByHourCount_axis)
        .tickSize(10).ticks(20);

    d3.select(".chart").append("g")
        .attr("id", "yAxis")
        .classed("y-axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height + margin.bottom) + ")")
        .call(yAxis3);

    d3.select("svg").append("text")
        .attr("id", "yAxisLabel")
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height + margin.bottom + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Records");
}

function showOffensesByHourCountAxis() {
    d3.select("#yAxis")
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis3)
        .selectAll("text")
        .attr("x", -50)
        .attr("y", 0)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .style("text-anchor", "start");

    d3.select("#yAxisLabel")
        .transition()
        .duration(1000)
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)");
}

function showHoursAxis() {
    const xAxis = d3.axisBottom().scale(x_hours)
        .ticks(d3.keys(offensesByHour));

    d3.select(".chart").append("g")
        .attr("id", "xAxis")
        .classed("x axis",true)
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top + chart_dimensions.height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", -3)
        .attr("y", 13)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");

    d3.select(".chart").append("text")
        .attr("transform",
            "translate(" + (margin.left + chart_dimensions.width / 2) + " ," +
            (margin.top + chart_dimensions.height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Hours");
}

function createOffensesByMonthCountBars() {
var div = d3.select("body").append("div");
	
    d3.select(".chart")
		.selectAll(".bar-offenseCount")
        .data(d3.values(offensesByMonth))
        .enter()
        .append("g")
        .classed("bar-offenseCount",true)
        .attr("transform",
            function (d) {
                return "translate(" + (margin.left + (16 + x_months(d.month)-x_months.bandwidth()/2)) + ", " + margin.top + ")";
            })
        .append("rect")
        .classed("rect-offenseCount",true)
        .attr("x", x_months.bandwidth()/2)
        .attr("y", chart_dimensions.height)
		.attr("width", x_months.bandwidth()/2 - 1)
        .attr("height",0)
		.on("mouseover", function (d) {
			//console.log(d3.event.pageX + ":" + d3.event.pageY);
			div.transition()
            .duration(200)
            .style("opacity", .9);
			div.html(d.offenseCount)
			.style("position","absolute")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
     })
		.on("mouseout", function (d) {
			div.transition()
            .duration(1000)
            .style("opacity", 0);
     });
}

function showOffensesByMonthCountBars() {

    d3.selectAll(".rect-offenseCount")
        .transition()
        .duration(1000)
        .attr("height", function (d) {
            return y_offensesByMonthCount(d.offenseCount);
        })
        .attr("y", function (d) {
            return (chart_dimensions.height - y_offensesByMonthCount(d.offenseCount));
        });
}

function createOffensesByMonthCountAxis() {
    yAxis4.scale(y_offensesByMonthCount_axis)
        .tickSize(10).ticks(20);

    d3.select(".chart").append("g")
        .attr("id", "yAxis")
        .classed("y-axis",true)
        .attr("transform", "translate(" + margin.left + "," + (margin.top + chart_dimensions.height + margin.bottom) + ")")
        .call(yAxis4);

    d3.select("svg").append("text")
        .attr("id", "yAxisLabel")
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height + margin.bottom + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Records");
}

function showOffensesByMonthCountAxis() {
    d3.select("#yAxis")
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yAxis4)
        .selectAll("text")
        .attr("x", -50)
        .attr("y", 0)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .style("text-anchor", "start");

    d3.select("#yAxisLabel")
        .transition()
        .duration(1000)
        .attr("transform",
            "translate(8," + (margin.top + chart_dimensions.height / 2) + ")" +
            ", rotate(-90)");
}

function showMonthsAxis() {
    const xAxis = d3.axisBottom().scale(x_months)
        .ticks(d3.keys(offensesByMonth));

    d3.select(".chart").append("g")
        .attr("id", "xAxis")
        .classed("x axis",true)
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top + chart_dimensions.height) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("x", -15)
        .attr("y", 13)
        .attr("dx", 0)
        .attr("dy", "0.35em")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "start");

    d3.select(".chart").append("text")
        .attr("transform",
            "translate(" + (margin.left + chart_dimensions.width / 2) + " ," +
            (margin.top + chart_dimensions.height + 50) + ")")
        .style("text-anchor", "middle")
        .text("Months");
}

function prepareAggData(){

d3.csv("../agg_crime.csv").then(d => chart(d))

function chart(csv) {
	var keys = csv.columns.slice(1);

	var offenses = [...new Set(csv.map(d => d.Offense_Code_Group))];

	var options = d3.select("#offense").selectAll("option")
		.data(offenses)
		.enter().append("option")
		.text(d => d);

	var svg = d3.select(".chart"),
		margin = {top: 150, bottom: 70, right: 150, left: 70},
		width =  canvas.width - (margin.right + margin.left),
		height = canvas.height - (margin.top + margin.bottom);
		//width = +svg.attr("width") - margin.left - margin.right,
		//height = +svg.attr("height") - margin.top - margin.bottom;
	
	d3.selectAll("#selection").style("visibility","visible");

	var x = d3.scaleBand()
		.range([0, chart_dimensions.width])
		//.range([margin.left, width - margin.right])
		.padding(0.1);

	var y = d3.scaleLinear()
		.rangeRound([chart_dimensions.height, 0]);
		//.rangeRound([height - margin.bottom, margin.top]);

	var xAxis = svg.append("g")
		.attr("transform", "translate(" + (margin.left) + "," + (margin.top + chart_dimensions.height) + ")")
		//.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxis = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		//.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	var z = d3.scaleOrdinal()
		.range(["steelblue"])
		.domain(keys);

	update(d3.select("#offense").property("value"), 0)

	function update(input, speed) {

		var data = csv.filter(f => f.Offense_Code_Group == input)

		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		});
		
		y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]);

		svg.selectAll(".y-axis").transition().duration(1000)
			//.call(d3.axisLeft(y).ticks(null, "s"))
			.call(d3.axisLeft(y).tickSize(10).ticks(20))
			.selectAll("text")
			.attr("x", -40)
			.attr("y", 0)
			.attr("dx", 0)
			.attr("dy", "0.35em")
			.style("text-anchor", "start");
			
		x.domain(data.map(d => d.Hour));

		svg.selectAll(".x-axis").transition().duration(1000)
			.call(d3.axisBottom(x).tickSizeOuter(0))
			.selectAll("text")
			.attr("x", -3)
			.attr("y", 13)
			.attr("dx", 0)
			.attr("dy", "0.35em")
			.style("text-anchor", "start");

		var group = svg.selectAll("g.layer")
			.data(d3.stack().keys(keys)(data), d => d.key)
			
		console.log(group);

		group.exit().remove()

		group.enter().append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Hour);

		bars.exit().remove();
		
		bars.enter().append("rect")
			.classed("bar-offenses",true)
			//.transition().duration(speed)
			.attr("transform", "translate(" + (6+margin.left) + "," + (margin.top) + ")")
			.attr("width", x.bandwidth()/2 - 1)
			.merge(bars)
			.transition().duration(speed)		
			.attr("x", d => x(d.data.Hour))
			.attr("y", d => y(d[1]))
			.attr("height", d => y(d[0]) - y(d[1]));
		
			//.transition().duration(speed)
			//.attr("transform", "translate(" + (6+margin.left) + "," + margin.top + ")")
			//.attr("width", x.bandwidth()/2 - 1)
			//.merge(bars)
			//.transition().duration(1000)		
			//.attr("x", d => x(d.data.Hour))
			//.attr("y", d => y(d[1]))
			//.attr("height", d => y(d[0]) - y(d[1]))
	}

	var select = d3.select("#offense")
		.on("change", function() {
			update(this.value, 1000)
		})
}
}


function animateScene0() {
	initializeChartArea();
	showIntroduction();
}

function animateScene1() {
	initializeChartArea();
    calculateScales1();

    createOffenseCountBars();
	showOffenseCountBars();
	createOffenseCountAxis();
	showOffenseCountAxis();
	showOffenseAxis();
}

function animateScene2() {
	initializeChartArea();
    calculateScales2();

    createOffensesByMonthCountBars();
	showOffensesByMonthCountBars();
	createOffensesByMonthCountAxis();
	showOffensesByMonthCountAxis();
	showMonthsAxis();
}

function animateScene3() {
	initializeChartArea();
    calculateScales3();

    createOffensesByDayCountBars();
	showOffensesByDayCountBars();
	createOffensesByDayCountAxis();
	showOffensesByDayCountAxis();
	showDaysAxis();
}

function animateScene4() {
	initializeChartArea();
    calculateScales4();

    createOffensesByHourCountBars();
	showOffensesByHourCountBars();
	createOffensesByHourCountAxis();
	showOffensesByHourCountAxis();
	showHoursAxis();
}

function animateScene5() {
	initializeChartArea();
	prepareAggData();
}

function deanimateScene1() {
}

function deanimateScene2() {
}

function deanimateScene3() {
}

function deanimateScene4() {
}	