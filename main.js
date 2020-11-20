import TopBarGraph from './TopBarGraph.js';
import LineChart from './LineChart.js';
import RegionalMap from './RegionalMap.js'

var sortedOne;
var sortedTwo;
var currentSort;

var clickedDistrict = "";

d3.csv('life-expectancy-income_2019.csv', d3.autoType).then(data=>{
    console.log(data);
    
    //axes
    let domainLife = d3.extent(data, (d => d.lifeExp));
    let domainIncome = d3.extent(data, (d => d.incomePerCapita));

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
