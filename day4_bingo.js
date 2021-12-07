const fs = require('fsp');
const bingo_nums = [91,17,64,45,8,13,47,19,52,68,63,76,82,44,28,56,37,2,78,48,32,58,72,53,9,85,77,89,36,22,49,86,51,99,6,92,80,87,7,25,31,66,84,4,98,67,46,61,59,79,0,3,38,27,23,95,20,35,14,30,26,33,42,93,12,57,11,54,50,75,90,41,88,96,40,81,24,94,18,39,70,34,21,55,5,29,71,83,1,60,74,69,10,62,43,73,97,65,15,16];

//Checks to see if all values in array are 'X'
allEqualX = (arr) => arr.every( val => val === 'X' );

checkForColumnBingo = (card) => {
	//Could be better, not following DRY principle
	let col_1 = card.map(function(value,index) { return value[0]; });
	let col_2 = card.map(function(value,index) { return value[1]; });
	let col_3 = card.map(function(value,index) { return value[2]; });
	let col_4 = card.map(function(value,index) { return value[3]; });
	let col_5 = card.map(function(value,index) { return value[4]; });
	if(allEqualX(col_1) || allEqualX(col_2) || allEqualX(col_3) || allEqualX(col_4) || allEqualX(col_5)){
		return true;
	}
	return false;
}

openFile = () => {
    return  fs.readFileP("inputs/bingo_boards.txt", {encoding:'utf8'}).then(
        (text) => {
            return text;
        }, (err) => {
            console.log('Error occured reading file');
        }
    );
}

class BingoCard {
	constructor(card){
		this.card = card;
		this.numbers_called = [];
	}
	checkCardForNum(num){
		for(let row = 0; row < this.card.length; row++){
			let exists = this.card[row].indexOf(num);
			if(exists > -1){
				return [row, exists];
			}
			else continue;
		}
		return false;
	}
	markCard(nums){
		this.card[nums[0]][nums[1]] = 'X';

	}
	checkForBingo(){
		for(let i = 0; i < this.card.length; i++){
			if(allEqualX(this.card[i])){
				return true;
			}
			if(checkForColumnBingo(this.card)){
				 return true;
			}
		}
	}
	countRemainingNumbers(card){
		let flattened_card = card.flat();
		let int_array = flattened_card.filter(val => typeof(val) === 'number');
		let sum = int_array.reduce((acc, cur) => {
			return acc + cur
		}, 0);
		return sum;
	}
}

convertToBingoCardObjects = (bingo_cards_array) => {
	return bingo_cards_array.map(card => {
		return new BingoCard(card);
	});
}

convertToBingoCards = (text) => {
	let card_rows = 5;
	let bingoCards= [];
	let bingoRowArrays = text.replace( /\n/g, ',' ).split(',');
	bingoRowArrays = bingoRowArrays.map(nums => nums.split(' '));
	bingoRowArrays = bingoRowArrays.filter(nums_array => nums_array.length > 1);
	bingoRowArrays = bingoRowArrays.map(nums_array => nums_array.filter(nums => nums.length > 0));
	bingoRowArrays = bingoRowArrays.map(nums_array => nums_array.map(nums => parseInt(nums)));
	for (let i = 0; i < bingoRowArrays.length; i += card_rows) {
    	bingoCards.push(bingoRowArrays.slice(i, i + card_rows));
	}
	return convertToBingoCardObjects(bingoCards);
}


playBingo = (text, nums) => {
	let bingo_cards_object_array = convertToBingoCards(text);

	//Loop through bingo cars
	for(let i = 0; i < nums.length; i++){
		for(let cardIndex = 0; cardIndex < bingo_cards_object_array.length; cardIndex++){
			let current_card = bingo_cards_object_array[cardIndex];
			let hasNum = current_card.checkCardForNum(nums[i]);
			if(hasNum){
				current_card.markCard(hasNum);
				let bingo = current_card.checkForBingo();
				if(bingo){
					return current_card.countRemainingNumbers(current_card.card) * parseInt(nums[i]);
				}
			}
		}
	}
}

openFile().then((text) => {
	console.log(playBingo(text, bingo_nums));
});