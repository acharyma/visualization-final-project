const listeners = { clicked: null };

export default function barGraph(container){
    
    let margin = { top: 40, right: 20, bottom: 40, left: 90 },
    width =
        document.querySelector(container).clientWidth -
        margin.left -
        margin.right,
    height = 600 - margin.top - margin.bottom;
    

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
        // function (d){ return colorScale(d[colorColumn]); }
        .attr("fill", "#8B0000")
        .attr("height", function(d) {
          return height - y(returnInt(d.incomePerCapita));
        })
        .attr("width",x.bandwidth())
        .on("click", (event,d) => {
            console.log(d.district);
            clicked(d.district);
        });
        
        //DRAW AXIS
        xAxisGroup = svg
            .select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis").call(yAxis);

        svg.select("text.axis-title").remove();
        svg
            .append("text")
            .attr("class", "axis-title")
            .attr("x", 47)
            .attr("y", -15)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text("Income Per Capita");


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