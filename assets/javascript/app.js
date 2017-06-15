$(document).ready(function(){

	/*************** VARIABLES ***************/
	var characters = ["Tyrion Lannister", "Bob Belcher", "Jessica Jones", "Walter White", "Ron Swanson", "Liz Lemon", "Erlich Bachman", "Mindy Lahiri"];



	clear('#gif-dump');
	generateButtons();



	/*************** FUNCTIONS ***************/
	function generateButtons() {
		// CLEAR DIV
		clear('#buttons-dump');

		// create buttons for pre-loaded characters
		for (var i = 0; i < characters.length; i++) {
			//var buttons = '<button name="button" class="btn btn-default">' + characters[i] + '</button>';
			//$('#gif-dump').append(buttons);
			var b = $('<button>');
			b.addClass('btn btn-default');
			b.attr('data-name', characters[i]);
			b.attr('data-index', i.toString());
			b.text(characters[i]);
			$('#buttons-dump').append(b);
		}
	}


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


	$( document ).on( "click", ".btn", function() {
	  event.preventDefault();
	  //console.log('sample');
	});


	$('#buttons-dump').on("click", function(character) {
		var char = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + char + "&limit=10&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			clear('#gif-dump');

			for(i = 0; i < response.data.length; i++) {
				var gifObj = response.data[i]
				var gifDiv = $("<div class='gif'>");

				// retrieving the URL for the image
				var imageURL = gifObj.images.fixed_height_still.url;

				// creating an element to hold the image
				var image = $('<img>').attr('src', imageURL);

				// append to div
				gifDiv.append(image);

				// putting the entire gif above the previous gifs
				$("#gif-dump").prepend(gifDiv);
				

				var gifRating = gifObj.rating.url;

				var pRating = $("<p>").text("Rating: " + gifRating);

				gifDiv.append(pRating);
				console.log(gifObj);

				$("#gif-dump").prepend(gifDiv);
			}

			// var gifDiv = $("<div class='gif-div'>");

			

			// var gifStill = response.data.images.fixed_height_still.url;

			// var gifImg = $("<img>").attr("src", gifStill);

			// gifDiv.append(gifImg);

			

			// $('#gif-dump').html(JSON.stringify(response));

			// var charRating = "<p class='rating'>" + response.Rating + "<p>"
			// $("#gif-dump").append(charRating);
			// $(".rating").html(response.Rating);

			// var charGif = "<img>" + response.Poster + "</>"
			// $('gif-dump').append(charGif);
			// $("<img>").attr('src', response.Poster);

			// for(i = 0; i < response.data.length; i++) {
			// 	var gifObj = response.data[i]
			// 	var gifDiv = $("<div class='gif'>");

			// 	// retrieving the URL for the image
			// 	var imageURL = gifObj.images.fixed_height.url;

			// 	// creating an element to hold the image
			// 	var image = $('<img>').attr('src', imageURL);

			// 	// append to div
			// 	gifDiv.append(image);

			// 	// putting the entire gif above the previous gifs
			// 	$("#gif-dump").prepend(gifDiv);
			// 	//console.log(response);
		});
	})


	function clear(element) {
		$(element).empty();
	}


})







// 	$('#giphyimage').attr('src', data.data[0].images.fixed_height.url);
//	fixed_height_still
//	$('#gif-dump').attr('src', response.data.images.fixed_height.url);
