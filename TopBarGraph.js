const listeners = { clicked: null };

export default function barGraph(container){
    
    let margin = { top: 40, right: 20, bottom: 40, left: 90 },
    width =
        1000 -
        margin.left -
        margin.right,
    height = 300 - margin.top - margin.bottom;
    var districts = []
    

    width = width > 1500 ? 1500 : width;

    let svg = d3
        .select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + margin.bottom + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3
        .scaleBand()
        .range([0, width])
        .paddingInner(0.1);
    let y = d3.scaleLinear().range([height, 0]);


    let xAxis = d3
        .axisBottom()
        .scale(x)
        .tickFormat(function(d) {
            return (d);
        });

            
    let yAxis = d3.axisLeft().scale(y);

    let xAxisGroup = svg.append("g").attr("class", "x-axis axis");

    let yAxisGroup = svg.append("g").attr("class", "y-axis axis");


    function returnInt(notInt){
        let income = notInt
            if (typeof notInt === "string"){
                income = parseFloat(notInt.split(",").join(""));
            }
          return (parseInt(income,10));
    }

    function clicked(value) {
        console.log("clicked ", value);
        listeners["clicked"](value);
    }
    

    function newOn(event, listener){
        listeners[event] = listener
    }



    function update(data) {
        x.domain(
            data.map(function(d) {
              return d.district;
            })
          );
          y.domain([
            0,
            d3.max(data, function(d) {
              return returnInt(d.incomePerCapita);
            })
        ]);

         // ---- DRAW BARS ----
        let bars = svg
        .selectAll(".bar")
        .remove()
        .exit()
        .data(data);

        bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return x(d.district);
        })
        .attr("y", function(d) {
          return y(returnInt(d.incomePerCapita));
        })
        .attr("fill", "#40048d")
        .attr("height", function(d) {
          return height - y(returnInt(d.incomePerCapita));
        })
        .attr("width",x.bandwidth())
        .style("stroke", (d) => (districts.includes(d.district)) ? "#fcb628" : "none")
        .style("stroke-width", "1.0px")
        .on("click", (event,d) => {
            console.log(d.district);
            clicked(d.district);
            districts.push(d.district)
            d3.select(event.currentTarget).style("stroke", "#fcb628").style("stroke-width", "2.0px");
        });
        
        //DRAW AXIS
        xAxisGroup = svg
            .select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis").call(yAxis);

        svg.select("text.axis-title").remove();
        
        svg.append("text")
        .attr("text-anchor", "end")
        .attr("y",8)
        .attr("dy", "6px")
        .attr("transform", "rotate(-90)")
        .text("Income Per Capita")
        .style("font-weight", "bold")
        .style("font-size", "15px");

        svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width - 10)
        .attr("y", height - 6)
        .text("District")
        .style("fill", "black")
        .style("font-weight", "bold")
        .style("font-size", "18px");


    }

    function returnDistrict(district){
        console.log("return discrict was called");
        return district;
    }

    function axis(){
        svg.select('.x-axis')
             .attr("text-anchor", "end")
             .selectAll("text")
             .style("font-size", "12px")
             .attr("transform", "rotate(-90)")
             .attr("dy", "-0.7em")
             .attr("dx", "-1em");
    }

    return {
        update, // ES6 shorthand for "update": update
        newOn,
        axis
	};
}