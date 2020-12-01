export default function Legend(container){
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

    const svg = d3.select(container).append("svg")
            .attr("viewBox", [0,0,width,height]);

    

    function update() {
        var defs = svg.append("defs");
        var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");

        linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

        //Set the color for the start (0%)
        linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "red"); //light blue

        //Set the color for the end (100%)
        linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3d040a"); //dark blue

        //Draw the rectangle and fill with gradient
        svg.append("rect")
        .attr("width", 300)
        .attr("height", 20)
        .style("fill", "url(#linear-gradient)");

        svg
            .append("text")
            .attr("x", 20)
            .attr("y", 8)
            .style('fill', 'white')
            .style("text-anchor", "end")
            .style("font-size", "10px")
            .text("72.9");
        
        svg
            .append("text")
            .attr("x", 290)
            .attr("y", 8)
            .style('fill', 'white')
            .style("text-anchor", "end")
            .style("font-size", "10px")
            .text("61.2");
    }

    return {
        update, // ES6 shorthand for "update": update
	};

}