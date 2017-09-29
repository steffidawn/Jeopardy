document.addEventListener('DOMContentLoaded', function() {

var categories = [];
var clues = [];
var properCategories = [];
var seanArr = ["You think you're pretty smart, don't you, Trebek? What with your Diego mustache and your greasy hair!", "Moo", "Febtober", "Potent Potables!", "Colors that end in -urple"];
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

$('#instructions').click(function(){
	$('#welcomeModal').show();
});


function showCategories(){
	$('#category1').append('<p>' + properCategories[0].title + '</p>');
	$('#category2').append('<p>' + properCategories[1].title + '</p>');
	$('#category3').append('<p>' + properCategories[2].title + '</p>');
	$('#category4').append('<p>' + properCategories[3].title + '</p>');
	$('#category5').append('<p>' + properCategories[4].title + '</p>');
	$('#category6').append('<p>' + properCategories[5].title + '</p>');
};

$('.start').click(function(){
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

$('#buzzer').click(function() {
	$('.response').show();
	clearTimeout(timer);
}); 

$('#submitAnswer').click(function(){
	updateScore();
});


function nextTurn() {
	if (turns === 3){
		endGame();
	}else{
		$('.clue').html('');
		$('#answerCheck').html('');
		$('#trebekReaction').html('');
		$('#answerInput').val('');
		$('.response').hide();

	}
};



function addScore() {
	if (clickedSquare.parent().hasClass('200clues')){
		humanScore = humanScore + 200;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='correctTrebekGif' src='correctTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('400clues')){
		humanScore = humanScore + 400;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='correctTrebekGif' src='correctTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('600clues')) {
		humanScore = humanScore + 600;
    	$('#humanDollars').html('$ ' + humanScore);
    	$('#trebekReaction').append("<img id='correctTrebekGif' src='correctTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('800clues')) {
		humanScore = humanScore + 800;
        $('#humanDollars').html('$ ' + humanScore);
        $('#trebekReaction').append("<img id='correctTrebekGif' src='correctTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		humanScore = humanScore + 1000;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='correctTrebekGif' src='correctTrebek.gif'>");
	}
};


function subtractScore () {
    if (clickedSquare.parent().hasClass('200clues')){
		humanScore = humanScore - 200;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='wrongTrebekGif' src='wrongTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('400clues')){
		humanScore = humanScore - 400;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='wrongTrebekGif' src='wrongTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('600clues')) {
		humanScore = humanScore - 600;
    	$('#humanDollars').html('$ ' + humanScore);
    	$('#trebekReaction').append("<img id='wrongTrebekGif' src='wrongTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('800clues')) {
		humanScore = humanScore - 800;
        $('#humanDollars').html('$ ' + humanScore);
        $('#trebekReaction').append("<img id='wrongTrebekGif' src='wrongTrebek.gif'>");
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		humanScore = humanScore - 1000;
		$('#humanDollars').html('$ ' + humanScore);
		$('#trebekReaction').append("<img id='wrongTrebekGif' src='wrongTrebek.gif'>");
	}
};


function updateScore() {
	if ($('#answerInput').val() === $('#hiddenAnswer').text()) {
		$('#answerCheck').append($('#answerInput').val());

		addScore();
		// $('#humanDollars').append('$ ' + humanScore);
	}else{
		$('#answerCheck').append($('#answerInput').val());
		subtractScore();
	}
};



function kenUpdate () {
	if (clickedSquare.parent().hasClass('200clues')){
		kenScore = kenScore + 200;
		$('#kenDollars').html('$ ' + kenScore);
		$('#trebekReaction').append("<img id='kenGif' src='croppedKenGif.gif'>");
	}else if (clickedSquare.parent().hasClass('400clues')){
		kenScore = kenScore + 400;
		$('#kenDollars').html('$ ' + kenScore);
		$('#trebekReaction').append("<img id='kenGif' src='croppedKenGif.gif'>");
	}else if (clickedSquare.parent().hasClass('600clues')) {
		kenScore = kenScore + 600;
    	$('#kenDollars').html('$ ' + kenScore);
    	$('#trebekReaction').append("<img id='kenGif' src='croppedKenGif.gif'>");
	}else if (clickedSquare.parent().hasClass('800clues')) {
		kenScore = kenScore + 800;
        $('#kenDollars').html('$ ' + kenScore);
        $('#trebekReaction').append("<img id='kenGif' src='croppedKenGif.gif'>");
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		kenScore = kenScore + 1000;
		$('#kenDollars').html('$ ' + kenScore);
		$('#trebekReaction').append("<img id='kenGif' src='croppedKenGif.gif'>");
	}
};


function seanUpdate() {
	if (clickedSquare.parent().hasClass('200clues')){
		seanScore = seanScore - 200;
		$('#seanDollars').html('$ ' + seanScore);
		$('#trebekReaction').append("<img id='seanGif' src='seanReaction.gif'>");
	}else if (clickedSquare.parent().hasClass('400clues')){
		seanScore = seanScore - 400;
		$('#seanDollars').html('$ ' + seanScore);
		$('#trebekReaction').append("<img id='seanGif' src='seanReaction.gif'>");
	}else if (clickedSquare.parent().hasClass('600clues')) {
		seanScore = seanScore - 600;
    	$('#seanDollars').html('$ ' + seanScore);
    	$('#trebekReaction').append("<img id='seanGif' src='seanReaction.gif'>");
	}else if (clickedSquare.parent().hasClass('800clues')) {
		seanScore = seanScore - 800;
        $('#seanDollars').html('$ ' + seanScore);
        $('#trebekReaction').append("<img id='seanGif' src='seanReaction.gif'>");
	}else if (clickedSquare.parent().hasClass('1000clues')) {
		seanScore = seanScore - 1000;
		$('#seanDollars').html('$ ' + seanScore);
		$('#trebekReaction').append("<img id='seanGif' src='seanReaction.gif'>");
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
		alert("You won!");
		location.reload();
		// $('#resultsModal').html('<p>You won!</p>');
		// $('#resultsModal').show();
	}else if (kenScore > humanScore && kenScore > seanScore){
		alert("Ken won!");
		location.reload();
		// $('#resultsModal').html('<p>Ken Jennings!</p>');
		// $('#resultsModal').show();
	}else if (seanScore > humanScore && seanScore > kenScore){
		alert("Sean won!");
		location.reload();
		// $('#resultsModal').html('<p>SeanConnery!</p>');
		// $('#resultsModal').show();
	}
	// $('#playAgain').click(function(){
	// 	location.reload();
	// })
};


});
