export default function RegionalMap(container){
    //TODO: create regional map
    

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // const projection = d3.geoAlbers()
    // .fitExtent([[0,0], [width, height]], topology);

    
    // const path = d3.geoPath().projection(projection);
    // var width = 1500,
    // height = 1500;

    var projection = d3.geoAlbers()
        .center([86,28])
        .rotate([4.4,0])
        // .rotate([49.4,0])
        .translate([width/2.9, height/2.0])

    


    function update(map , listOfSelected, data) {
        console.log("update was called with " + map + " on container " + container);
        const topology = topojson.feature(map, map.objects.NPL_adm3);
        console.log(topology);

        const features = topology.features;
        console.log(features);

        var path = d3.geoPath()
        .projection(projection);
        var districts = features;

        console.log("list on regional map is " + listOfSelected);
        console.log(data);

    


    

        const svg = d3.select(container).append("svg")
            .attr("viewBox", [0,0,width,height]);
        
        svg.selectAll("path")
        .attr("class", "map-class")
        .data(features)
        .join("path")
        .attr("d", path)
        .attr("fill", "gray")
        .style("stroke", (d) => listOfSelected.includes(d.properties.VARNAME_3) ? "blue" : "none")
        .style("stroke-width", "0.47px")
        .on("mouseover", (l, d) => {
            d3.select(event.currentTarget).style("fill", "red");
            const pos = d3.pointer(event, window);
            d3
                .select(".tooltip")
                .style("position", "fixed")
                .style("left", 300 + "px")
                .style("top", 300 + "px")
                .style("padding", 5 + "px")
                .style("background", "darkgrey")
                .style("font-size", "9px")
                .style("display", "block").html(`
                    <div>
                    <span>
                    District:</span>
                    <span>
                    ${d.properties.VARNAME_3}</span>
                    </div>

                    <div>
                    <span>
                    Region:</span>
                    <span>
                    ${d.properties.NAME_1}</span>
                    </div>

                    
            `);
        })
        .on("mouseout", (l, d) => {
            d3.select(event.currentTarget).style("fill", "gray");
            d3.select(".tootltip").style("display", "none");
            document.querySelector(".tooltip").style = "none"
        })
        .on("click", (event,d) => {
            console.log(d);
            console.log(d.properties.VARNAME_3);
            d3.select(event.currentTarget).style("stroke", "red").style("stroke-width", "0.47px");

        });
        ;


        svg
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("transform", "translate(100,100) rotate(45) scale(2)" )
        .transition()
        .duration(50)
        .ease(d3.easeLinear);


    }

    return {
        update, // ES6 shorthand for "update": update
	};
}