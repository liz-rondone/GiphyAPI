/*************** VARIABLES ***************/
var characters = ["Bob Belcher", "Daenerys Targaryen", "Dev Shaw", "Ron Swanson", "Liz Lemon", "Nelson Bighetti", "Mindy Lahiri"];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + characters + "&limit=10&api_key=dc6zaTOxFJmzC";

/*************** FUNCTIONS ***************/
function generateButtons() {
	// CLEAR DIV
	$('#buttons-dump').empty();

	// create buttons for pre-loaded characters
	for (var i = 0; i < characters.length; i++) {
		//var buttons = '<button name="button" class="btn btn-default">' + characters[i] + '</button>';
		//$('#gif-dump').append(buttons);
		var b = $('<button>');
		b.addClass('btn btn-default');
		b.attr('data-name', characters[i]);
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
	//alert(characters);
	
	generateButtons();

	// CLEAR FORM
	$('#user-input').val("");
});


$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
	$('#gif-dump').html(JSON.stringify(response));
	
	var gifDiv = $("<div class='gif'>");
	// retrieving the URL for the image
	var imageURL = response.data[0].images.fixed_height.url;
	// creating an element to hold the image
	var image = $('<img>').attr('src', imgURL);
	// append to div
	gifDiv.append(image);
	// putting the entire gif above the previous gifs
	$("#gif-dump").prepend(gifDiv);
	console.log(response.data.images.fixed_height.url);
	


});


generateButtons();


// 	$('#giphyimage').attr('src', data.data[0].images.fixed_height.url);
//	fixed_height_still
//	$('#gif-dump').attr('src', response.data.images.fixed_height.url);
