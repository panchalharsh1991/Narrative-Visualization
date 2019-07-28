function initializeVisualization() {
	d3.selectAll("#selection").style("visibility","hidden");
    loadcsvdata( dataloaded );
	d3.selectAll(".btn btn-outline-0").style("aria-pressed","true");
}

function dataloaded() {
    d3.selectAll("#selection").style("visibility","hidden");
	d3.select("#loading-message")
        .classed("invisible",true);
    d3.select("#chart-id")
        .classed("invisible",false);
}

