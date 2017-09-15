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
var turns = 0;


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
};

$('#submitName').click(function(){
	//add append name to textboxes
	$('#welcomeScreen').hide();
	$('#gameBoard').show();
	showCategories();
});


$('.squares').click(function(e){
	turns++
	console.log(turns);
	clickedSquare = $('#' + e.target.id);
	var squareArr = e.target.id.split('-');
	$('#gameBoard').hide();
	$('#clueScreen').show();
	$('.clue').append('<p>' + clues[ squareArr[0] ][ squareArr[1] ].question + '</p>');
	$('.clue').append("<p id='hiddenAnswer'>" + clues[ squareArr[0] ][ squareArr[1] ].answer + '</p>');
	buzzerTimer();
});




function buzzerTimer () {
	timer = setTimeout(function(timer) {
		$('#buzzer').off('click');
		aiPlayer();
	 }, 5000);
};


$('#buzzer').click(function() {
	$('.response').show();
	clearTimeout(timer);
}); 


$('#submitAnswer').click(function(){
	updateScore();
});


function nextTurn() {
	if (turns === 2){
		endGame();
	}else{
		$('.clue').html('');
		$('.answerCheck').html('');
	}
};



function addScore() {
	if (clickedSquare.parent().hasClass('200clues')){
		humanScore = humanScore + 200;
		$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('400clues')){
		humanScore = humanScore + 400;
		$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('600clues')) {
		humanScore = humanScore + 600;
    	$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('800clues')) {
		humanScore = humanScore + 800;
        $('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		humanScore = humanScore + 1000;
		$('#humanDollars').html('$ ' + humanScore);
	}
};


function subtractScore () {
    if (clickedSquare.parent().hasClass('200clues')){
		humanScore = humanScore - 200;
		$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('400clues')){
		humanScore = humanScore - 400;
		$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('600clues')) {
		humanScore = humanScore - 600;
    	$('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('800clues')) {
		humanScore = humanScore - 800;
        $('#humanDollars').html('$ ' + humanScore);
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		humanScore = humanScore - 1000;
		$('#humanDollars').html('$ ' + humanScore);
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



function kenUpdate () {
	if (clickedSquare.parent().hasClass('200clues')){
		kenScore = kenScore + 200;
		$('#kenDollars').html('$ ' + kenScore);
	}else if (clickedSquare.parent().hasClass('400clues')){
		kenScore = kenScore + 400;
		$('#kenDollars').html('$ ' + kenScore);
	}else if (clickedSquare.parent().hasClass('600clues')) {
		kenScore = kenScore + 600;
    	$('#kenDollars').html('$ ' + kenScore);
	}else if (clickedSquare.parent().hasClass('800clues')) {
		kenScore = kenScore + 800;
        $('#kenDollars').html('$ ' + kenScore);
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		kenScore = kenScore + 1000;
		$('#kenDollars').html('$ ' + kenScore);
	}
};


function seanUpdate() {
	if (clickedSquare.parent().hasClass('200clues')){
		seanScore = seanScore - 200;
		$('#seanDollars').html('$ ' + seanScore);
	}else if (clickedSquare.parent().hasClass('400clues')){
		seanScore = seanScore - 400;
		$('#seanDollars').html('$ ' + seanScore);
	}else if (clickedSquare.parent().hasClass('600clues')) {
		seanScore = seanScore - 600;
    	$('#seanDollars').html('$ ' + seanScore);
	}else if (clickedSquare.parent().hasClass('800clues')) {
		seanScore = seanScore - 800;
        $('#seanDollars').html('$ ' + seanScore);
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		seanScore = seanScore - 1000;
		$('#seanDollars').html('$ ' + seanScore);
	}
};

function aiPlayer() {
	var num = Math.random();
	if (num < 0.5) {
		var hiddenAnswer = $('#hiddenAnswer').html();
		console.log(hiddenAnswer);
		$('#answerCheck').html(hiddenAnswer);
		kenUpdate();
	}else{
		$('#answerCheck').html(seanArr[Math.floor(Math.random()*seanArr.length)]);
		seanUpdate();
	}
};

$('#back').click(function(){
	$('#clueScreen').hide();
	$('#gameBoard').show();
	clickedSquare.off('click');
	clickedSquare.html('');
	nextTurn();
});


function endGame(){
	if (humanScore > kenScore && humanScore > seanScore) {
		alert('You win!');
	}else if (kenScore > humanScore && kenScore > seanScore){
		alert('Ken won!');
	}else if (seanScore > humanScore && seanScore > kenScore){
		alert ('Sean won!');
	}
	location.reload();
};



//To create sound effects:
//#Download sound clip
//#Create variable: var = new Audio ('');
//#var.play();

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
