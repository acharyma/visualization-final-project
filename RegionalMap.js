export default function RegionalMap(container){
    //TODO: create regional map
    

    function update(data) {
        console.log("update was called with " + data + " on container " + container);
    }

    return {
        update, // ES6 shorthand for "update": update
	};
}