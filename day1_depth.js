const fs = require('fsp');

function openFile(){

    return fs.readFileP("inputs/depths.txt", {encoding:'utf8'}).then(
        function(text){
            // console.log(text.replace( /\n/g, ',' ).split(','));
            return text.replace( /\n/g, ',' ).split(',');
        }, function(err){
            console.log('Error occured reading file');
        }
    );
}

function convertToIntArray(strArray){
	let numArray = [];
	for (var i = 0; i < strArray.length; i++) {
		numArray.push(parseInt(strArray[i]))
	}
	return numArray;
}

// Part 1

function countDepthChanges(depths){
	let depths_ints = convertToIntArray(depths);
	let diff_counter = 0;
	for(let i = 0; i < depths_ints.length; i++) {
		if(depths_ints[i] < depths_ints[i + 1]){
			diff_counter += 1;
		}
	}
	return diff_counter;
};

openFile().then(function(depth_readings){
	console.log("Depth Changes: " + countDepthChanges(depth_readings));
});

// Part 2

function countDepthChangeGroups(depths){
	let depths_ints = convertToIntArray(depths);
	let diff_counter = 0;
	for(let i = 0; i < depths_ints.length; i++) {
		let aGroup = depths_ints[i] + depths_ints[i + 1] + depths_ints[i + 2]
		let bGroup = depths_ints[i + 1] + depths_ints[i + 2] + depths_ints[i + 3]
		if(aGroup < bGroup){
			diff_counter += 1;
		}
	}
	return diff_counter;
};

openFile().then(function(depth_readings){
	console.log("Depth Changes Using Groups: " + countDepthChangeGroups(depth_readings));
});
