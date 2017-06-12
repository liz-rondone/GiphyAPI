/*************** VARIABLES ***************/
var characters = ["Bob Belcher", "Daenerys Targaryen", "Dev Shaw", "Ron Swanson", "Liz Lemon", "Nelson Bighetti", "Mindy Lahiri"];
//var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + characters + "&limit=10&api_key=dc6zaTOxFJmzC";

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
	url: "http://api.giphy.com/v1/gifs/search?q=funny+cat&limit=1&api_key=dc6zaTOxFJmzC",
	method: "GET"
}).done(function(response) {
	// $('#gif-dump').html(JSON.stringify(response));
	$('#gif-dump').attr('src', data.data.images.fixed_height.url);
	// var gifDiv = $("<div class='gif'>");
	// var imageURL = data.data[0].images.fixed_height.url;
	// var image = $('<img>').attr('src', url);
	console.log(data.data.images.fixed_height.url);
	// gifDiv.append(image);


});


generateButtons();


// 	$('#giphyimage').attr('src', data.data[0].images.fixed_height.url);
//	fixed_height_still
