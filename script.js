$(document).ready(function() {
	var city = '';
	var key = '';
	var counter = -1;
	var apiKey = '476789b4ea7a5f8db7a7b4f6f0c734fb';

	// Create event listener for button click

	$('#searchBtn').on('click', function(e) {
		e.preventDefault();

		// Increase counter with every click
		counter++;

		// Get text value from input field and store in global variable

		city = $('#input').val().trim();

		// Create key for local storage -- use counter as part of key

		key = 'city-' + counter;

		// Store text value in local storage

		localStorage.setItem(key, city);

		console.log({ city, key });

		addCity();
	});

	// Get text value from local storage

	function addCity() {
		for (i = 0; i < localStorage.length; i++) {
			var cityPrepend = $('<div></div>');
			var cityP = $('<p></p>').attr('class', 'pastSearch').val(localStorage.getItem(localStorage.key(i)));
			cityPrepend.append(cityP);
			// Prepend text value into div for past searches
			console.log(localStorage.length);
			console.log(localStorage.key(i));
			console.log(cityP);
			$('#searches').prepend(cityPrepend);
		}
	}

	// Create click events for past searches

	// Create query URL with text value from global variable and imperial value

	// Create ajax call

	// Console log response

	// Get temperature, humidity, wind speed, uv index info from respone

	// Get city, date, and icon to represent current weather condition

	/* Dynamically input city, date, icon, temp, humidity, wind speed, 
and uv index into city div */

	// Color code uv index

	// create 5-day forecast card with date, weather condition icon, temp, humidity
});
