$(document).ready(function() {
	var city = '';
	var key = '';
	var counter = -1;
	var apiKey = '476789b4ea7a5f8db7a7b4f6f0c734fb';
	var searchDiv = $('#searches');
	var aside = $('.col-sm-4');
	var currentDiv = $('#weatherDiv');
	var fiveDayDiv = $('#forecastDiv');
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

		// Create ajax call for current weather

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(res) {
			// Console log response

			// console.log(res);

			// Get city, date, and icon to represent current weather condition
			let cityV = res.name;
			let date = res.dt;
			// let dateString = date.toUTCString();
			// console.log(dateString);

			// Get temperature, humidity, wind speed, uv index info from response
			let temp = res.main.temp;
			let hum = res.main.humidity;
			let windSp = res.wind.speed;
			// let uv = res.
			let weatherIcon = res.weather[0].icon;
			var icon = '';

			// console.log(cityV, date, temp, hum, windSp, weatherIcon);

			/* Dynamically input city, date, icon, temp, humidity, wind speed, 
			and uv index into city div */

			var firstDiv = $('<div>').attr('id', 'firstRow');
			var inputCity = $('<h3>').text(cityV);
			var dateEl = $('<h3>').text('date');
			var wIcon = $('<p>').text(weatherIcon);
			var firstRow = firstDiv.append(inputCity, dateEl, wIcon);

			var secondDiv = $('<div>').attr('id', 'secondRow');
			var tempDiv = $('<p>').text('Temperature: ' + temp + ' °F');

			var thirdDiv = $('<div>').addClass('rows');
			var humDiv = $('<p>').text('Humidity: ' + hum + ' %');
			// var thirdRow = thirdDiv.append(humDiv);

			var fourthDiv = $('<div>').addClass('rows');
			var windSpeed = $('<p>').text('Wind Speed: ' + windSp + ' MPH');
			// var fourthRow = fourthDiv.append(windSpeed);

			var fifthDiv = $('<div>').addClass('rows');
			var uvIndex = $('<span><p></p></span>').text('UV Index: ' + 'object w/ temp');
			// var fifthRow = fifthDiv.append(uvIndex);

			var secondRow = secondDiv.append(tempDiv, humDiv, windSpeed, uvIndex);

			currentDiv.append(firstRow, secondRow);
		});

		// Create query URL with text value from global variable and imperial value

		var queryURL =
			'https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=' + pcity + '&appid=' + apiKey;

		// Create ajax call for 5 day forecast

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(resp) {
			// Console log response

			console.log(resp);

			for (i = 0; i < 6; i++) {
				var dateFor = resp.list[i].dt;
				var iconFor = resp.list[i].weather.icon;
				var tempFor = resp.list[i].main.temp;
				var humFor = resp.list[i].main.humidity;

				console.log(dateFor, iconFor, tempFor, humFor);
			}
		});
	});

	// Color code uv index

	// create 5-day forecast card with date, weather condition icon, temp, humidity
});
