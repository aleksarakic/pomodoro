var sessionInterval; // session int
var breakInterval; 
var secInMin = 3; // defining how much seconds in each 'minute'

var sessionTime = 1-1; // defining how much minutes
var sessionStarted = false; // first time its started, it becomes and stays true.
var sessionPaused = true; 
var sessionActive = false;

var breakTime = 1-1; 
var breakStarted = false; // first time its started, it becomes and stays true.
var breakPaused = true;
var breakActive = false;

var cycleFinished = false;

$('.counter').click(function sessionPausing(){ //kinda pauses counter by adding false 'start' class.
  $('.counter').toggleClass('start');
  sessionPaused = !sessionPaused; //toggling from true to false 
  breakPaused = !breakPaused;
  console.log(breakPaused);
});

$('.add-time').click(function addingSessionTime(){
	if(sessionPaused){ //change session time if session is paused
		$('.session-time').html(sessionTime += 1);
	}
});

$('.remove-time').click(function removingSessionTime(){
	if(sessionPaused){
		$('.session-time').html(sessionTime -= 1);
	}
});

$('.add-break').click(function addingBreakTime(){
	if(breakPaused){ // change break time if break is paused
		$('.break-time').html(breakTime += 1);
	}
});

$('.remove-break').click(function removingBreakTime(){
	if(breakPaused){
		$('.break-time').html(breakTime -= 1);
	}
});

$('.counter').click(function startingSession(){
	$('.starting').fadeOut();
	if(!sessionStarted){ // same thing
		sessionStarted = true;
		sessionActive = true;
		sessionInterval = setInterval(sessionCounter, 1000);
	}
});

function sessionCounter(){
	if($('.counter').hasClass('start')){ //if counter isnt paused
		if(secInMin < 10){ //formating: adding zero to numbers under 10. e.g. :09, :08, :07...
			$('.counter-paragraph').html(sessionTime + ':0' + secInMin--);
			$('.sess-or-bre-par').html('session');
		}else{
			$('.counter-paragraph').html(sessionTime + ':' + secInMin--);//numbers from 59 to 10.
			$('.sess-or-bre-par').html('session');
		}
		if(secInMin === -1){ //if minute is passed, if we've passed zero,
			secInMin = 3; // new seconds for new minute
			sessionTime-- // removing one minute.
		}
		if(sessionTime <= -1){ //if session time is below zero
			clearInterval(sessionInterval); // stop session 
		  $('.counter').addClass('break'); // class for break to start
			sessionActive = false; // sessionActive = false so break can be reseted
			breakInterval = setInterval(breakCounter, 1000); // starting break
			breakStarted = true;
			breakActive = true;
		}
  }
  sessionActive = true;
}

function breakCounter(){
	clearInterval(sessionInterval); // stoping session interval??????
	sessionActive = false; // break cant be resetd if sessionStarted is true;
	if($('.break').hasClass('start')){ //if .counter.break has false class start(if is active)
		if(secInMin < 10){ //seconds in minute
			$('.counter-paragraph').html(breakTime + ':0' + secInMin--); //removing sec for nums below 10.
			$('.sess-or-bre-par').html('break');
		}else{
			$('.counter-paragraph').html(breakTime + ':' + secInMin--); // removing sec for numbers 10-59.
			$('.sess-or-bre-par').html('break');
		}
		if(secInMin === -1){ //when one minute passes,
			secInMin = 3; //new minute in seconds
			breakTime--; //removing one minute
		}
		if(breakTime <= -1){ // if break time is over,
			clearInterval(breakInterval); // stopping break interval
			breakActive = false; // break active = false, so it can be reseted.
			cycleFinished = true;
		}
  }
  breakActive = true;
}

$('.reset').click(function reseting(){
	console.log($('.counter-paragraph').text())
	if(sessionActive){ //reset session
		clearInterval(sessionInterval);
		sessionTime = 25-1;
		secInMin = 59;
		sessionInterval = setInterval(sessionCounter, 1000);
	}else if(breakActive && !cycleFinished){ // reset break
		clearInterval(breakInterval);
		breakTime = 10-1;
		secInMin = 59;
		breakInterval = setInterval(breakCounter, 1000);
	}else if(cycleFinished){
		clearInterval(breakInterval);
		clearInterval(sessionInterval);
		sessionTime = 25-1;
		secInMin = 59;
		breakTime = 10-1;
		sessionInterval = setInterval(sessionCounter, 1000);
		sessionStarted = true;
		sessionActive = true;
	}
});