import TopBarGraph from './TopBarGraph.js';
import LineChart from './LineChart.js';
import RegionalMap from './RegionalMap.js'


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

    const lc = LineChart(".chart-container2");
    lc.update(data);

    const rm = RegionalMap(".chart-container3");
    rm.update(data);


});
