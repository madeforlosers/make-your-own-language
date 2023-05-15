const fs = require("fs"); //for reading file
const prompt = require("prompt-sync")({sigint: true}); //for shell
var accepted_commands = [
	//put the words of your commands here!

  
	"print", // sample command. prints to console
	"repeat", // sample command. prints text to console that can be repeated a given amount of time
];
var commands = {
	/* put the code for your commands here! this is how it works:
 
  "sample_command": function(args){
    [your code here]
  },
  
*/
  
	"print": function(text) { //heres a sample command for you
		console.log(text == "" ? "Hello World!" : text); //if the text is empty then print "Hello World!"
	},
	"repeat": function(text, amount) { //heres a sample command for you
		console.log((text == "" ? "Hello World!" : text).repeat(amount));
	},
  
	/* 
	the syntax will be like this: (using the sample functions as an example)
  
	print text here
	repeat text here,10
  

	there is nothing telling the program if the text is a variable, list, text, or number. it just assumes its a string. (so you cant put commas in a string or else it will think that string is 2 seperate arguments)
	you can try to fix this if you want, please tell me if you do it
	*/
};

function get_command_name(fullcommand) { //get name of command
	return fullcommand.split(" ")[0];
}

function get_command_arguments(fullcommand) { //get arguments of command
	if(fullcommand.split(get_command_name(fullcommand) + " ")[1] == undefined) { //if there's no arguments
		return []; //return nothing
	}
	return fullcommand.split(get_command_name(fullcommand) + " ")[1].split(",");
}

if(process.argv.length > 2) { //if there is extra arguments in the node command
	var file = fs.readFileSync(process.argv[2], "utf8").split("\n"); //read file
	for(var i = 0; i < file.length; i++) { // i from 0 to file length
		if(accepted_commands.includes(get_command_name(file[i]))) { //if command is in accepted_commands
			try { //try
				commd = commands[get_command_name(file[i])](...get_command_arguments(file[i])); //run command, the ...get_command_arguments(file[i]) puts the contents of the list as seperate arguments for the function
			} catch(e) {
				if(!ignoreInternalError) {
					console.log("** INTERNAL ERROR AT LINE " + (i + 1) + ": " + e);
				}
			} //internal error
		} else {
			if(!ignoreCommandError) {
				console.log("** UNKNOWN COMMAND AT LINE " + (i + 1));
			} //unknown command
			continue;
		}
	}
} else { //shell
	console.log("welcome to shell");
	console.log("type .endprom to stop the program");
	var command = "";
	while(command != ".endprom") {
		command = prompt(">");
		try {
			commands[get_command_name(command)](...get_command_arguments(command)); //run command
		} catch(e) {
			console.log("syntax err");
		}
	}
}