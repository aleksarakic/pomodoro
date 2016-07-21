var interval;
var session_time = 25;
var break_time = 15;
var secInMin = 2;
var started = false;
var paused = true;

$('.counter').click(function pausing(){
  $('.counter').toggleClass('start');
  paused = !paused;
});

$('.add-time').click(function addingTime(){
	if(paused){
		$('.session-time').html(session_time += 1);
	}
});

$('.remove-time').click(function removingTime(){
	if(paused){
		$('.session-time').html(session_time -= 1);
	}
});

$('.add-break').click(function addingTime(){
	if(paused){
		$('.break-time').html(break_time += 1);
	}
});

$('.remove-break').click(function removingTime(){
	if(paused){
		$('.break-time').html(break_time -= 1);
	}
});

function sessionCounter(){
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
			clearInterval(interval);
		}
  }
	started = true;
}

function breakCounter(){
	
}

$('.counter').click(function startingCounter(){
	if(!started){
		interval = setInterval(sessionCounter, 1000);
	}
});

$('.reset').click(function reseting(){
	clearInterval(interval);
	session_time = 25;
	secInMin = 2;
	interval = setInterval(sessionCounter, 1000);
});