function initializeVisualization() {
	animateScene0();
	d3.select("#b0").classed("active",true);
	d3.selectAll("#selection").style("visibility","hidden");
    loadcsvdata( dataloaded );
}

function dataloaded() {
    d3.selectAll("#selection").style("visibility","hidden");
	d3.select("#loading-message")
        .classed("invisible",true);
    d3.select("#chart-id")
        .classed("invisible",false);
}