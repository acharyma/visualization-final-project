export default function LineChart(container){
    //TODO: create line chart

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1100 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    function update(data, districtSet) {   
        var selectedDistrict = districtSet ?? "Kathmandu"




        console.log("update was called with " + data + " on container " + container);
        var lineData = data.filter(d => d.district == selectedDistrict);
        console.log(lineData);

        var grades = []
        grades.push(lineData[0].grade1);
        grades.push(lineData[0].grade2);
        grades.push(lineData[0].grade3);
        grades.push(lineData[0].grade4);
        grades.push(lineData[0].grade5);
        grades.push(lineData[0].grade6);
        grades.push(lineData[0].grade7);
        grades.push(lineData[0].grade8);
        grades.push(lineData[0].grade9);
        grades.push(lineData[0].grade10);

        var gradeNumber = [1,2,3,4,5,6,7,8,9,10];

        console.log(grades);
        console.log(gradeNumber);
        var formattedData = []

        var i;
        for (i=0; i<10;i++){
            formattedData.push({gradeNumber:(gradeNumber[i]), grades:(grades[i]) })
        }

        console.log(formattedData);

        // Add X axis
        var xScale = d3.scaleLinear()
            .domain(d3.extent(gradeNumber))
            .range([ 0, width ]);
        console.log(d3.extent(gradeNumber))

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // Add Y axis
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(grades)])
            .range([ height, 0 ]);
        console.log([0,d3.max(grades)]);

        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Add the line
        svg.append("path")
        .datum(formattedData)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 5)
        .attr("d", d3.line()
            .x(d => xScale(d.gradeNumber))
            .y(d => yScale(d.grades))
        )

        


        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y",8)
            .attr("dy", "6px")
            .attr("transform", "rotate(-90)")
            .text("Drop-out Rate")
            .style("font-size", "13px");

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .text("Grade")
            .style("font-size", "13px");

        

    }

    return {
        update, // ES6 shorthand for "update": update
	};
}