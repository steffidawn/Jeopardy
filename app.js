document.addEventListener('DOMContentLoaded', function() {

var categories = [];
var clues = [];
var properCategories = [];
var seanArr = ["You think you're pretty smart, don't you, Trebek? What with your Diego mustache and your greasy hair!", "Moo", "Febtober", "Potent Potables!"];
var player = "";
var sean = "Sean";
var ken = "Ken";
var human = "";
var seanScore = 0;
var kenScore = 0;
var humanScore = 0;
var timer;
var clickedSquare;


$.get('http://jservice.io/api/categories?count=10', {
}).done(function(data) {
  	categories = data;
  	properCategories = categories.filter(function(item) {
  		console.log(properCategories);
  		if (item.clues_count > 5) {
  			return false;
  		} else {
  			return true;
  		}
  	});

  	console.log(properCategories);

	  for (let i = 0; i < properCategories.length; i++) {
	  	$.get('http://jservice.io/api/clues?category=' + properCategories[i].id,{
		}).done(function(foo) {
			console.log("second ajax call is done");
			// console.log(foo);
			clues[i] = foo;
		});
	  } 
	});

function showCategories(){
	$('#category1').append('<p>' + properCategories[0].title + '</p>');
	$('#category2').append('<p>' + properCategories[1].title + '</p>');
	$('#category3').append('<p>' + properCategories[2].title + '</p>');
	$('#category4').append('<p>' + properCategories[3].title + '</p>');
	$('#category5').append('<p>' + properCategories[4].title + '</p>');
	$('#category6').append('<p>' + properCategories[5].title + '</p>');
}

$('#submitName').click(function(){
	//add append name to textboxes
	$('#welcomeScreen').hide();
	$('#gameBoard').show();
	showCategories();
});

$('.squares').click(function(e){
	var squareID = e.target.id;
	clickedSquare = e.target;
	var squareArr = squareID.split('-');
	$('#gameBoard').hide();
	$('#clueScreen').show();
	$(this).off('click');
	$(this).remove('p')
	$('.clue').append('<p>' + clues[ squareArr[0] ][ squareArr[1] ].question + '</p>');
	$('.clue').append("<p id='hiddenAnswer'>" + clues[ squareArr[0] ][ squareArr[1] ].answer + '</p>');
	buzzerTimer();
	$('#submitAnswer').click(function(e){
		// console.log('submitted answer');
		updateScore();
	})
	
});

$('#buzzer').click(function() {
	$('.response').show();
	clearTimeout(timer);
}); 

function buzzerTimer () {
	timer = setTimeout(function(timer) {
		$('#buzzer').off('click');
		aiPlayer();
	 }, 5000);
}


function addScore (clickedSquare) {
	//$('.squares').click(function() {
	console.log('inside addScore')
	if ($('.square').hasClass('200clues')){
		humanScore = humanScore + 200;
    	$('#humanDollars').append('$ ' + humanScore);
	}else if ($('.square').hasClass('400clues')){
		humanScore = humanScore + 400;
		$('#humanDollars').append('$ ' + humanScore);
	}
    // switch (clickedSquare) {
    //   case $('.square').hasClass('200clues'):
    //     humanScore = humanScore + 200;
    //     console.log("human answers")
    //     $('#humanDollars').append('$ ' + humanScore);
    //     break;
    //   case $('.square').hasClass('400clues'):
    //     humanScore = humanScore + 400;
    //     console.log(humanScore);
    //     $('#humanDollars').append('$ ' + humanScore);
    //     break;
    //   case $('.square').hasClass('600clues'):
    //     humanScore = humanScore + 600;
    //     $('#humanDollars').append('$ ' + humanScore);
    //     break;
    //   case $('.square').hasClass('800clues'):
    //     humanScore = humanScore + 800;
    //     $('#humanDollars').append('$ ' + humanScore);
    //     break;
    //   case $('.square').hasClass('1000clues'):
    //     humanScore = humanScore + 1000;
    //     $('#humanDollars').append('$ ' + humanScore);
    //     break;
    // }


};


function subtractScore () {
	//$('.squares').click(function() {
    switch (clickedSquare) {
      case $('.square').hasClass('200clues'):
        humanScore = humanScore - 200;
        $('#humanDollars').append('$ ' + humanScore);
        break;
      case $('.square').hasClass('400clues'):
        humanScore = humanScore - 400;
        $('#humanDollars').append('$ ' + humanScore);
        break;
      case $('.square').hasClass('600clues'):
        humanScore = humanScore - 600;
        $('#humanDollars').append('$ ' + humanScore);
        break;
      case $('.square').hasClass('800clues'):
        humanScore = humanScore - 800;
        $('#humanDollars').append('$ ' + humanScore);
        break;
      case $('.square').hasClass('1000clues'):
        humanScore = humanScore - 1000;
        $('#humanDollars').append('$ ' + humanScore);
        break;
    }
};

function updateScore() {
	if ($('#answerInput').val() === $('#hiddenAnswer').text()) {
		$('#hiddenAnswer').show();
		///seperate show or append that will show the correct answer in the check answer box
		addScore();
		// $('#humanDollars').append('$ ' + humanScore);
	}else{
 		$('#hiddenAnswer').show();
		subtractScore();
		//$('#humanDollars').append('$ ' + humanScore);
	}
};




//$('#answerCheck').append($('#hiddenAnswer').val());

function kenUpdate () {
	//$('.squares').click(function() {
	    switch (clickedSquare) {
	      case $('.square').hasClass('200clues'):
	        kenScore = kenScore + 200;
	        $('#kenDollars').text('$ ' + kenScore);
	        break;
	      case $('.square').hasClass('400clues'):
	        kenScore = kenScore + 400;
	        $('#kenDollars').text('$ ' + kenScore);
	        break;
	      case $('.square').hasClass('600clues'):
	        kenScore = kenScore + 600;
	        $('#kenDollars').text('$ ' + kenScore);
	        break;
	      case $('.square').hasClass('800clues'):
	        kenScore = kenScore + 800;
	        $('#kenDollars').text('$ ' + kenScore);
	        break;
	      case $('.square').hasClass('1000clues'):
	        kenScore = kenScore + 1000;
	        $('#kenDollars').text('$ ' + kenScore);
	        break;
	    }
	};


function seanUpdate() {
	// $('.squares').click(function() {
	    switch (clickedSquare) {
	      case $('.square').hasClass('200clues'):
	        seanScore = seanScore - 200;
	        $('#seanDollars').text('$ ' + seanScore);
	        break;
	      case $('.square').hasClass('400clues'):
	        seanScore = seanScore - 400;
	        console.log("suck it trebek");
	        $('#seanDollars').text('$ ' + seanScore);
	        break;
	      case $('.square').hasClass('600clues'):
	        seanScore = seanScore - 600;
	        $('#seanDollars').text('$ ' + seanScore);
	        break;
	      case $('.square').hasClass('800clues'):
	        seanScore = seanScore - 800;
	        $('#seanDollars').text('$ ' + seanScore);
	        break;
	      case $('.square').hasClass('1000clues'):
	        seanScore = seanScore - 1000;
	        $('#seanDollars').text('$ ' + seanScore);
	        break;
	}
};

function aiPlayer() {
	var num = Math.random();
	if (num < 0.5) {
		// player = "ken";
		var hiddenAnswer = $('#hiddenAnswer').html();
		console.log(hiddenAnswer);
		$('#answerCheck').html(hiddenAnswer);
		kenUpdate();
		// $('#kenDollars').html('$ ' + kenScore);
	}else{
		// AI = "sean";
		$('#answerCheck').html(seanArr[Math.floor(Math.random()*seanArr.length)]);
		seanUpdate();
		// $('#seanDollars').html('$ ' + seanScore);
	}
};







//Welcome Screen
//#Input field for name that will fill in name in name text box in other screens
//#Click on submit name button will trigger the #gameBoard to show

//Game Board
//#
//#Click events for each square that randomly pull data out of api. 
	//#Human has XXX seconds to hit buzzer (space bar?), otherwise one of the to AIs will be randomly chosen. 
	//#Sean Connery will pick an answer out of a stupid answer array (always wrong) and Ken Jennings will pick out of a correct answer array (always right).
//#Clue would be displayed in clue screen, answer to be hidden until player has submitted an answer.
//#Text in square div emptied once a that square has been selected


//clueScreen
	//#Random clue from API will create a new <p> into the clue div displayed on the clueScreen.
	//#Answer input by human player will be compared to answer in API
});
