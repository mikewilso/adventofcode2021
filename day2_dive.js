const fs = require('fsp');

function openFile(){

    return  fs.readFileP("inputs/submarine_inputs.txt", {encoding:'utf8'}).then(
        function(text){
            // console.log(text.replace( /\n/g, ',' ).split(','));
            return text.replace( /\n/g, ',' ).split(',');
        }, function(err){
            console.log('Error occured reading file');
        }
    );
}

// Part 1
function calculateDirections(commands){
    let horizontal_position = 0;
    let depth = 0;
    for(let i = 0; i < commands.length; i++){
        let current_command = commands[i].split(' ');
        let num = parseInt(current_command[1]);
        switch(current_command[0]) {
            case 'forward':
                horizontal_position += num;
                break;
            case 'up':
                depth -= num;
                break;
            case 'down':
                depth += num;
                break;
            default:
                continue;
        }
    }
    return horizontal_position * depth;
}

openFile().then(function(command_array){
    console.log(calculateDirections(command_array));
});


// Part 2
function calculateDirectionsWithAim(commands){
    let horizontal_position = 0;
    let depth = 0;
    let aim = 0;
    for(let i = 0; i < commands.length; i++){
        let current_command = commands[i].split(' ');
        let num = parseInt(current_command[1]);
        switch(current_command[0]) {
            case 'up':
                aim -= num;
                break;
            case 'down':
                aim += num;
                break;
            case 'forward':
                horizontal_position += num;
                depth += aim * num;
                break;
            default:
                continue;
        }
    }
    return horizontal_position * depth;
}

openFile().then(function(command_array){
    console.log(calculateDirectionsWithAim(command_array));
});