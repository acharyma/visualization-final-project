export default function RegionalMap(container){
    //TODO: create regional map
    var width = 960,
    height = 500;

    // var projection = d3.geo.albers()
    //     .center([86, 28])
    //     .rotate([4.4, 0])
    //     .parallels([27, 32]);

    // var path = d3.geo.path()
    //     .projection(projection);

    // var svg = d3.select("body").append("svg")
    //     .attr("width", width)
    //     .attr("height", height);

    function update(data) {
        console.log("update was called with " + data + " on container " + container);
    }

    return {
        update, // ES6 shorthand for "update": update
	};
}