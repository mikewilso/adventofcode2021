const fs = require('fsp');

const bingo_nums = [91,17,64,45,8,13,47,19,52,68,63,76,82,44,28,56,37,2,78,48,32,58,72,53,9,85,77,89,36,22,49,86,51,99,6,92,80,87,7,25,31,66,84,4,98,67,46,61,59,79,0,3,38,27,23,95,20,35,14,30,26,33,42,93,12,57,11,54,50,75,90,41,88,96,40,81,24,94,18,39,70,34,21,55,5,29,71,83,1,60,74,69,10,62,43,73,97,65,15,16];

openFile = () => {

    return  fs.readFileP("inputs/bingo_boards.txt", {encoding:'utf8'}).then(
        (text) => {
            return text;
        }, (err) => {
            console.log('Error occured reading file');
        }
    );
}

convertToBingoCardArrays = (text) => {
	let size = 5;
	let bingoCards= [];
	let bingoArrays = text.replace( /\n/g, ',' ).split(',');
	bingoArrays = bingoArrays.map(nums => nums.split(' '));
	bingoArrays = bingoArrays.filter(nums_array => nums_array.length > 1);
	bingoArrays = bingoArrays.map(nums_array => nums_array.filter(nums => nums.length > 0));
	for (let i = 0; i < bingoArrays.length; i += size) {
    	bingoCards.push(bingoArrays.slice(i, i + size));
	}
	console.log(bingoCards[0]);
}

//Ingest bingo boards, arrays of arrays or arrays?
[[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]]

//Loop through with each bingo number
//Check for number in each set of arrays
//If found, mark number as X, add to bingo board number tally
//Check to see if all in small array are 'X' or if all [n] position in array of arrays is 'X'
	//If returns true, return tally of that board and multiply by final winning number.

openFile().then((text) => {
	convertToBingoCardArrays(text);
});