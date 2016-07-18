var userInput = 30;
var minInSec = 60; 
var secondInterval = setInterval(countDownTimer, 1000);

function countDownTimer(){
	if(minInSec < 10){
		console.log(userInput + ':0' + minInSec--);
	}else{
		console.log(userInput + ':' + minInSec--);
	}
	if(minInSec === -1){
		minInSec = 12;
		userInput--
	}
	if(userInput === -1){
		clearInterval(secondInterval);
	}
}