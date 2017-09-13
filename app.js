document.addEventListener('DOMContentLoaded', function() {

var categories = [];
var clues = [];
var properCategories = [];
var seanArr = [];
var AI = "";


$.get('http://jservice.io/api/categories?count=10', {
}).done(function(data) {
  	categories = data;
  	properCategories = categories.filter(function(item) {
  		if (item.clues_count > 5) {
  			return false;
  		} else {
  			return true;
  		}
  	});

  	console.log(properCategories);

	  for (let i = 0; i < properCategories.length; i++) {
	  	$.get('http://jservice.io/api/clues?category=' + categories[i].id,{
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
	$('.clue').append('<p>' + clues[ squareArr[0] ][ squareArr[1] ].question + '</p>')
	if 
	//insert timer // if statement - if buzz in time, show submit answer window. if not buzzed in time, choose random player (create celebrity function?). 
	$('#submitAnswer').click(function(e){
		$('.clue').append('<p id="hiddenAnswer">' + clues[ squareArr[0] ][ squareArr[1] ].answer + '</p>');
	})
	//grab clues div and append question from clues array
});


function updateScore() {
	if ($('#answerInput').val() === $('#hiddenAnswer')) {
		//$('#hiddenAnswer').show();
		//some kind of identify that question was answered correctly 

	}else{
		//$('#hiddenAnswer').show();
	}
}
//make a hidden <p> and then compare input value to text value of <p> to get correct answer
//if correct, increase score by dollar value associated with square, else decrease dollar value


function AIs(){
	if(Math.random() < 0.5) {
    AI = "ken";
    $('#message').append('Harry is chasing after the Snitch!');
    }else{
    AI = "sean";
    $('#message').append('Draco is chasing after the Snitch!');
  }
}



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
