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