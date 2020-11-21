import TopBarGraph from './TopBarGraph.js';
import LineChart from './LineChart.js';
import RegionalMap from './RegionalMap.js'

var sortedOne;
var sortedTwo;
var currentSort;

var clickedDistrict = "";

Promise.all([d3.json("nepal.json"),
d3.csv('life-expectancy-income_2019.csv', d3.autoType)]).then(([map, data])=>{
    console.log(data);
    
    //axes
    let domainLife = d3.extent(data, (d => d.lifeExp));
    let domainIncome = d3.extent(data, (d => d.incomePerCapita));

    //MAP STUFF

    
    const topology = topojson.feature(map, map.objects.NPL_adm3);
    console.log(topology);

    const features = topology.features;
    console.log(features);

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // const projection = d3.geoAlbers()
    // .fitExtent([[0,0], [width, height]], topology);

    
    // const path = d3.geoPath().projection(projection);
    // var width = 1500,
    // height = 1500;

    var projection = d3.geoAlbers()
        // .center([86, 28])
        // .rotate([4.4, 0])
        // .parallels([27, 32]);
        .center([86,28])
        .rotate([4.4,0])
        .translate([width/2.9, height/2.0])
        // .scale(k)

    var path = d3.geoPath()
        .projection(projection);
    var districts = features;

    


    

    const svg = d3.select(".chart-container3").append("svg")
        .attr("viewBox", [0,0,width,height]);
    
    svg.selectAll("path")
    .data(features)
    .join("path")
    .attr("d", path)
    .attr("fill", "gray")
    .on("mouseover", (l, d) => {
        console.log("enterred");
        d3.select(event.currentTarget).style("fill", "red");
    })
    .on("mouseout", (l, d) => {
        console.log("left");
        d3.select(event.currentTarget).style("fill", "gray");
    })
    .on("click", (event,d) => {
        console.log(d);
        d3.select(event.currentTarget).style("stroke", "blue").style("stroke-width", "0.47px");

    });
    ;

    svg
    .transition()
    .duration(3000)
    .ease(d3.easeLinear)
    // .attr("transform", "scale(2)")
    .attr("transform", "translate(100,100) rotate(45) scale(2)" )
    .transition()
    .duration(3000)
    .ease(d3.easeLinear);



    //END OF MAP STUFF


    console.log(domainLife);
    console.log(domainIncome);

    //Not sure if we will use this yet
    

    const bg = TopBarGraph(".chart-container1");
    bg.update(data);
    bg.axis(); //THIS SETS the axis to rotate after render

    

    d3.csv("dropout_rates_2011-012.csv", d3.autoType).then(data2=>{
        console.log(data2);
        const lc = LineChart(".chart-container2");
        lc.update(data2);

        bg.newOn("clicked", (clicked) => {
            clickedDistrict = clicked;
            console.log("clickedDistrict on main!! " + clicked);
            lc.update(data2, clicked);
        })
        
    });

    console.log(map);


    sortedOne = data.sort((a, b) => (returnInt(a.incomePerCapita) > returnInt(b.incomePerCapita)) ? 1 : -1).reverse();
    // sortedTwo = data.sort((a, b) => (returnInt(a.incomePerCapita) > returnInt(b.incomePerCapita)) ? 1 : -1);
    currentSort = sortedOne;

    document.getElementById("sort").addEventListener("click", function() {
        currentSort.reverse();
        document.getElementById("sort").innerHTML = "Sort Toggle"
        bg.update(currentSort);
    });


    const rm = RegionalMap(".chart-container3");
    rm.update(data);


});



function returnInt(notInt){
    let income = notInt
        if (typeof notInt === "string"){
            income = parseFloat(notInt.split(",").join(""));
        }
      return (parseInt(income,10));
}
