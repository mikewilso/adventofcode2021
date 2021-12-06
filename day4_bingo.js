//Ingest bingo boards, arrays of arrays or arrays? DONE
// [[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]]

//Loop through with each bingo number

//Check for number in each set of arrays
//If found, mark number as X, add to bingo board number tally
//Check to see if all in small array are 'X' or if all [n] position in array of arrays is 'X'
	//If returns true, return tally of that board and multiply by final winning number.



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
	let card_rows = 5;
	let bingoCards= [];
	let bingoRowArrays = text.replace( /\n/g, ',' ).split(',');
	bingoRowArrays = bingoRowArrays.map(nums => nums.split(' '));
	bingoRowArrays = bingoRowArrays.filter(nums_array => nums_array.length > 1);
	bingoRowArrays = bingoRowArrays.map(nums_array => nums_array.filter(nums => nums.length > 0));
	for (let i = 0; i < bingoRowArrays.length; i += card_rows) {
    	bingoCards.push(bingoRowArrays.slice(i, i + card_rows));
	}
	return bingoCards;
}

playBingo = (text, nums) => {
	let bingo_cards_array = convertToBingoCardArrays(text);
	const bingo_card_count_array = Array(bingo_cards_array.length).fill(0);
	//Loop through bingo numbers
	for(let i = 0; i < nums.length; i++){
		//Check each bingo number on each card
		for(let j = 0; j < bingo_cards_array.length; j++){
			let current_bingo_card = bingo_cards_array[j];
			let itIsThere = checkBingoCardForNumber(current_bingo_card, nums[i]);
			if (!itIsThere){
				//Make these functions
				addToBingoCardTally()
				replaceBingoNumberWithX()
			}
			else continue;
		}
	}
}

checkBingoCardForNumber = (bingo_card, number) => {
	for(let row = 0; row < bingo_card.length; row++){
		let isItThere = bingo_card[row].indexOf(number);
		if(isItThere > -1){
			return [isItThere, row];
		}
		else continue;
	}
	return false;
}


addToBingoCardTally = (card_number) => {

}

replaceBingoNumberWithX = (card_number, index) => {

}



openFile().then((text) => {
	console.log(convertToBingoCardArrays(text));
});