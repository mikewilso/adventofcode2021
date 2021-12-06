const fs = require('fsp');

function openFile(){
    return fs.readFileP("inputs/binary_codes.txt", {encoding:'utf8'}).then(
        function(text){
            // console.log(text.replace( /\n/g, ',' ).split(','));
            return text.replace( /\n/g, ',' ).split(',');
        }, function(err){
            console.log('Error occured reading file');
        }
    );  
}

//Part 1
function calculateGammaOrEpsilonRate(bit_array, type) {
    let gammaBitArray = [];
    for(let i = 0; i < bit_array[0].length; i++){
        let bit_sum = bit_array.reduce((sum, currentValue) => {
            return sum + parseInt(currentValue[i]);
        }, 0);
        if(type === 'gamma'){
            gammaBitArray[i] = bit_sum > bit_array.length/2 ? 1 : 0;
        }
        if(type === 'epsilon'){
            gammaBitArray[i] = bit_sum < bit_array.length/2 ? 1 : 0;
        }
    }
    return parseInt(parseInt(gammaBitArray.join(''), 2));
}


openFile().then(function(bit_array){
    console.log(calculateGammaOrEpsilonRate(bit_array, 'gamma') * calculateGammaOrEpsilonRate(bit_array, 'epsilon'));
});

//Part 2

function calculateOxygenOrCarbonRating(bit_array, type){
    let current_bit_array = bit_array;
    while (current_bit_array.length > 1){
        for(let i = 0; i < bit_array[0].length; i++){

            //Calculate sum of 1s and 0s in position[i]
            let bit_sum = current_bit_array.reduce((sum, currentValue) => {
                return sum + parseInt(currentValue[i]);
            }, 0);

            //Determine if 1 or 0 is more prevalent and assign 1 or 0 to current_bit depending on rating type
            let current_bit;
            if(type === 'oxygen'){
                current_bit = bit_sum >= current_bit_array.length/2 ? 1 : 0;
            }
            else current_bit = bit_sum >= current_bit_array.length/2 ? 0 : 1;

            //Filter out bit strings where position [i] does not equal current bit
            current_bit_array = current_bit_array.filter(bit_string => bit_string[i] == current_bit);

            //Check for one remaining value, return the decimal version if
            if(current_bit_array.length === 1){
                return parseInt(current_bit_array.join(''), 2);
            };
        };
    };
}

openFile().then(function(bit_array){
    console.log(calculateOxygenOrCarbonRating(bit_array, 'oxygen') * calculateOxygenOrCarbonRating(bit_array, 'carbon'));
});
