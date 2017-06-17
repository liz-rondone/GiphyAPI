$(document).ready(function(){

	/*************** VARIABLES ***************/
	var characters = ["Tyrion Lannister", "Liz Lemon", "Bob Belcher", "Jessica Jones", "Walter White", "Ron Swanson", "Monica Geller", "Barney Stinson", "Mindy Lahiri"];



	clear('#gif-dump');
	generateButtons();



	/*************** FUNCTIONS ***************/

	/**** CREATES BUTTONS ****/
	function generateButtons() {
		// CLEAR DIV
		clear('#buttons-dump');

		// create buttons for pre-loaded characters
		for (var i = 0; i < characters.length; i++) {
			//var buttons = '<button name="button" class="btn btn-default">' + characters[i] + '</button>';
			//$('#gif-dump').append(buttons);
			var b = $('<button>');
			b.addClass('btn btn-info');
			b.attr('data-name', characters[i]);
			//b.attr('data-index', i.toString());
			b.text(characters[i]);
			$('#buttons-dump').append(b);
		}
	}



	/**** BUTTON CREATED WHEN ADD BUTTON CLICKED ****/
	$('#add-character').on("click", function(event) {
		// allows button to function without refreshing page
		event.preventDefault();

		// trim gets rid of extra spaces
		var userInput = ($('#user-input').val().trim());

		characters.push(userInput);
		console.log(characters);
		
		generateButtons();

		// CLEAR FORM
		$('#user-input').val("");
	});



	/**** BUTTON CLICKED GETS GIF ****/
	$( document ).on( "click", ".btn-info", function() {

		event.preventDefault();

		var char = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + char + "&limit=10&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			clear('#gif-dump');
			console.log('btn-info');

			for(i = 0; i < response.data.length; i++) {
				var gifObj = response.data[i]
				var gifDiv = $("<div class='panel panel-info col-md-4'>");
				var gifStill = gifObj.images.fixed_height_still.url;
				var gifAnimate = gifObj.images.fixed_height.url;

				var pRating = $("<p>").text("Rating: " + gifRating);
				pRating.addClass('panel-heading');
				gifDiv.append(pRating);

				// creating an element to hold the image
				var image = $('<img>').attr('src', gifStill);

				image.addClass('img-responsive');

				image.attr('data-state', "still");

				image.attr('data-still', gifStill);

				image.attr('data-animate', gifAnimate);

				// append to div
				gifDiv.append(image);

				// putting the entire gif above the previous gifs
				$("#gif-dump").prepend(gifDiv);
				

				var gifRating = gifObj.rating;

				
				//console.log(char);

				$("#gif-dump").prepend(gifDiv);
			}

		});

	})



	/**** GIF CLICKED TOGGLE STATES ****/
	$('#gif-dump').on("click", "img", function() {

		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
		//console.log(state);
	});



	/**** EMPTY ELEMENT ****/
	function clear(element) {
		$(element).empty();
	}


})