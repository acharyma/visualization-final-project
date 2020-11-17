export default function barGraph(container){
    //TODO: create bar graph

    function update(data) {
        console.log("update was called with " + data + " on container " + container);
    }

    return {
        update, // ES6 shorthand for "update": update
	};
}