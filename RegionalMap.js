const listeners = { clicked: null };

// CREATE THE NEW GRADIENT SCALE - https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient

export default function RegionalMap(container){
    //TODO: create regional map
    

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select(container).append("svg")
            .attr("viewBox", [0,0,width,height]);

    // const projection = d3.geoAlbers()
    // .fitExtent([[0,0], [width, height]], topology);

    
    // const path = d3.geoPath().projection(projection);
    // var width = 1500,
    // height = 1500;

    var projection = d3.geoAlbers()
        .center([86,28])
        .rotate([4.4,0])
        .translate([width/2.9, height/2.0]);
    
    function clicked(value) {
        console.log("clicked ", value);
        listeners["clicked"](value);
    }
    

    function newOn(event, listener){
        listeners[event] = listener
    }


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

        var domain = d3.extent(data, d => d.lifeExp)
        console.log(domain)

        const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateRgb("#3d040a", "red"))
        .domain(domain)

        


    


    

        
        
        svg.selectAll("path")
        .attr("class", "map-class")
        .data(features)
        .join("path")
        .attr("d", path)
        .attr("fill", (d) => myColor(returnColor(data, d.properties.VARNAME_3)))
        .style("stroke", (d) => listOfSelected.includes(d.properties.VARNAME_3) ? "#fcb628" : "none")
        .style("stroke-width", "0.47px")
        .on("mouseover", (l, d) => {
            d3.select(event.currentTarget).style("fill", "#fcb628");
            const pos = d3.pointer(event, window);
            d3
                .select(".tooltip")
                .style("position", "fixed")
                .style("left", 950 + "px")
                .style("top", 250 + "px")
                .style("padding", 5 + "px")
                .style("background", "red")
                .style("color", "black")
                .style("font-size", "15px")
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

                    <div>
                    <span>
                    Income Per Capita:</span>
                    <span>
                    ${returnIncome(data, d.properties.VARNAME_3)}
                    </span>
                    </div>

                    <div>
                    <span>
                    Life Expectancy:</span>
                    <span>
                    ${returnLifeExp(data, d.properties.VARNAME_3)}
                    </span>
                    </div>

                    
            `);
        })
        .on("mouseout", (l, d) => {
            d3.select(event.currentTarget).style("fill", myColor(returnColor(data,d.properties.VARNAME_3)));
            d3.select(".tootltip").style("display", "none");
            // document.querySelector(".tooltip").style = "none"
        })
        .on("click", (event,d) => {
            console.log(d);
            console.log(d.properties.VARNAME_3);
            clicked(d.properties.VARNAME_3);
            d3.select(event.currentTarget).style("stroke", "#fcb628").style("stroke-width", "0.47px");

        });
        ;

        function returnIncome(data, district) {
            let d1 = data.map((l => (l.district == district) ? l.incomePerCapita : ","))
            let val = ""
            d1.map(s => s != "," ? val += s : console.log("not it"))
            return val
        }

        function returnLifeExp(data, district) {
            let d1 = data.map((l => (l.district == district) ? l.lifeExp : ","))
            let val = ""
            d1.map(s => s != "," ? val += s : console.log("not it"))
            return val
        }

        function returnColor(data, district) {
            let d1 = data.map((l => (l.district == district) ? l.lifeExp : ","))
            let val = 0
            d1.map(s => s != "," ? val += Number(s) : console.log("not it"))
            console.log(val)
            return val
        }


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
        newOn,
	};
}