$(document).ready(function() {
	var city = '';
	var key = '';
	var counter = -1;
	var apiKey = '476789b4ea7a5f8db7a7b4f6f0c734fb';
	var searchDiv = $('#searches');
	var aside = $('.col-sm-4');
	console.log(aside);

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

		addCity();

		// Put city variable in queryURL and send ajax request

		var queryURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city + '&appid=' + apiKey;

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(res) {
			// Console log response

			console.log(res);
		});
	});

	// Get text value from local storage
	addCity();

	function addCity() {
		searchDiv.empty();

		for (i = 0; i < localStorage.length; i++) {
			var cityValue = localStorage.getItem('city-' + i);
			var cityDiv = $('<div></div>');
			var cityP = $('<p></p>').attr('class', 'pastSearch').text(cityValue);
			cityDiv.append(cityP);
			// Prepend text value into div for past searches
			searchDiv.prepend(cityDiv);
			aside.append(searchDiv);
		}
	}

	// Create click events for past searches

	$('.pastSearch').on('click', function(e) {
		e.preventDefault();

		var pcity = $(this).text().trim();

		// Create query URL with text value from global variable and imperial value

		var queryURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + pcity + '&appid=' + apiKey;

		// Create ajax call

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(res) {
			// Console log response

			console.log(res);
			console.log(res.weather);
		});
	});

	// Get temperature, humidity, wind speed, uv index info from response

	// Get city, date, and icon to represent current weather condition

	/* Dynamically input city, date, icon, temp, humidity, wind speed, 
and uv index into city div */

	// Color code uv index

	// create 5-day forecast card with date, weather condition icon, temp, humidity
});
