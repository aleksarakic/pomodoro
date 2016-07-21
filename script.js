var session_interval;
var break_interval;
var secInMin = 2;

var session_time = 2;
var session_started = false;
var session_paused = true;

var break_time = 1;
var break_started = false;
var break_paused = true;

$('.counter').click(function sessionPausing(){
  $('.counter').toggleClass('start');
  session_paused = !session_paused;
});

$('.break').click(function breakPausing(){
  $('.break').toggleClass('start');
  break_paused = !break_paused;
});


$('.add-time').click(function addingSessionTime(){
	if(session_paused){
		$('.session-time').html(session_time += 1);
	}
});

$('.remove-time').click(function removingSessionTime(){
	if(session_paused){
		$('.session-time').html(session_time -= 1);
	}
});

$('.add-break').click(function addingBreakTime(){
	if(session_paused){
		$('.break-time').html(break_time += 1);
	}
});

$('.remove-break').click(function removingBreakTime(){
	if(session_paused){
		$('.break-time').html(break_time -= 1);
	}
});

$('.break').click(function startingBreak(){
	if(!break_started){
		break_interval = setInterval(breakCounter, 1000);
	}
});

$('.counter').click(function startingSession(){
	if(!session_started){
		session_interval = setInterval(sessionCounter, 1000);
	}
});

function sessionCounter(){
	session_started = true;
	if($('.counter').hasClass('start')){
		if(secInMin < 10){
			$('.counter').html('Session:' + session_time + ':0' + secInMin--);
		}else{
			$('.counter').html('Session:' + session_time + ':' + secInMin--);
		}
		if(secInMin === -1){
			secInMin = 5;
			session_time--
		}
		if(session_time === -1){
			clearInterval(session_interval);
		  $('.counter').toggleClass('break');
			break_interval = setInterval(breakCounter, 1000);
			session_started = false;
		}
  }
}

function breakCounter(){
	if($('.break').hasClass('start')){
		if(secInMin < 10){
			$('.break').html('Break:' + break_time + ':0' + secInMin--);
		}else{
			$('.break').html('Break:' + break_time + ':' + secInMin--);
		}
		if(secInMin === -1){
			secInMin = 5;
			break_time--
		}
		if(break_time === -1){
			clearInterval(break_interval);
			break_started = false;
		}
  }
	break_started = true;
}

$('.reset').click(function reseting(){
	alert(session_started);
	if(session_started){
		clearInterval(session_interval);
		session_time = 1;
		secInMin = 2;
		session_interval = setInterval(sessionCounter, 1000);
	}else if(break_started){
		clearInterval(break_interval);
		break_time = 1;
		secInMin = 2;
		break_interval = setInterval(breakCounter, 1000);
	}
});