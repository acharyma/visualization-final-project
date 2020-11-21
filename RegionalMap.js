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

    


    function update(map , listOfSelected) {
        console.log("update was called with " + map + " on container " + container);
        const topology = topojson.feature(map, map.objects.NPL_adm3);
        console.log(topology);

        const features = topology.features;
        console.log(features);

        var path = d3.geoPath()
        .projection(projection);
        var districts = features;

        console.log("list on regional map is " + listOfSelected);

    


    

        const svg = d3.select(container).append("svg")
            .attr("viewBox", [0,0,width,height]);
        
        svg.selectAll("path")
        .data(features)
        .join("path")
        .attr("d", path)
        .attr("fill", "gray")
        .style("stroke", (d) => listOfSelected.includes(d.properties.VARNAME_3) ? "blue" : "none")
        .style("stroke-width", "0.47px")
        .on("mouseover", (l, d) => {
            d3.select(event.currentTarget).style("fill", "red");
        })
        .on("mouseout", (l, d) => {
            d3.select(event.currentTarget).style("fill", "gray");
        })
        .on("click", (event,d) => {
            console.log(d);
            console.log(d.properties.VARNAME_3);
            d3.select(event.currentTarget).style("stroke", "blue").style("stroke-width", "0.47px");

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