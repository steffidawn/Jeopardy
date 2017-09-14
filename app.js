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
	// console.log(e.target.id);
	var squareID = e.target.id;
	var squareArr = squareID.split('-');
	console.log(squareArr);
	// console.log(clues[0][0].question);
	$('#gameBoard').hide();
	$('#clueScreen').show();
	$(this).off('click');
	$(this).remove('p')
	$('.clue').append('<p>' + clues[ squareArr[0] ][ squareArr[1] ].question + '</p>')
	$('#answerCheck').append('<p id="hiddenAnswer">' + clues[ squareArr[0] ][ squareArr[1] ].answer + '</p>');
	buzzerTimer();
	$('#submitAnswer').click(function(e){
	updateScore();
	})
	
});

$('#buzzer').click(function() {
	console.log('clicked the buzzer')
	$('.response').show();
	clearTimeout(timer);
}); 

function buzzerTimer () {
	timer = setTimeout(function(timer) {
		$('#buzzer').off('click');
		aiPlayer();
	 }, 5000);
}



$('#answerCheck').append($('#hiddenAnswer').val());


function aiPlayer() {
	var num = Math.random;
	if (num < 0.5) {
		// player = "ken";
		$('#answerCheck').append($('#hiddenAnswer').val());
		kenUpdate();
	}else{
		// AI = "sean";
		$('#answerCheck').append(seanArr[Math.floor(Math.random()*seanArr.length)]);
		seanUpdate();
	}
}


function updateScore() {
	if ($('#answerInput').val() === $('#hiddenAnswer').val()) {
		$('#hiddenAnswer').show();
		addScore();
	}else{
 		$('#hiddenAnswer').show();
	}	subtractScore();
}

function addScore () {
	$('.squares').click(function() {
    switch (true) {
      case $(this).hasClass('200clues'):
        humanScore + 200;
        break;
      case $(this).hasClass('400clues'):
        humanScore + 400;
        break;
      case $(this).hasClass('600clues'):
        humanScore + 600;
        break;
      case $(this).hasClass('800clues'):
        humanScore + 800;
        break;
      case $(this).hasClass('1000clues'):
        humanScore + 1000;
        break;
    }
}
)};


function subtractScore () {
	$('.squares').click(function() {
    switch (true) {
      case $(this).hasClass('200clues'):
        humanScore - 200;
        break;
      case $(this).hasClass('400clues'):
        humanScore - 400;
        break;
      case $(this).hasClass('600clues'):
        humanScore - 600;
        break;
      case $(this).hasClass('800clues'):
        humanScore - 800;
        break;
      case $(this).hasClass('1000clues'):
        humanScore - 1000;
        break;
    }
}
)};

function kenUpdate () {
	$('.squares').click(function() {
	    switch (true) {
	      case $(this).hasClass('200clues'):
	        kenScore + 200;
	        break;
	      case $(this).hasClass('400clues'):
	        kenScore + 400;
	        break;
	      case $(this).hasClass('600clues'):
	        kenScore + 600;
	        break;
	      case $(this).hasClass('800clues'):
	        kenScore + 800;
	        break;
	      case $(this).hasClass('1000clues'):
	        kenScore + 1000;
	        break;
	    }
	}
)};


function seanUpdate() {
	$('.squares').click(function() {
	    switch (true) {
	      case $(this).hasClass('200clues'):
	        seanScore - 200;
	        break;
	      case $(this).hasClass('400clues'):
	        seanScore - 400;
	        break;
	      case $(this).hasClass('600clues'):
	        seanScore - 600;
	        break;
	      case $(this).hasClass('800clues'):
	        seanScore - 800;
	        break;
	      case $(this).hasClass('1000clues'):
	        seanScore - 1000;
	        break;
	    }
	}
)};




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
