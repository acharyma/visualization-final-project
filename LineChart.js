export default function LineChart(container){
    //TODO: create line chart

    function update(data) {
        console.log("update was called with " + data + " on container " + container);
    }

    return {
        update, // ES6 shorthand for "update": update
	};
}