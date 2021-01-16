$(document).ready(function() {
	var city = '';
	var apiKey = '476789b4ea7a5f8db7a7b4f6f0c734fb';
	var searchDiv = $('#searches');
	var currentDiv = $('#weatherDiv');
	var fiveDayDiv = $('#forecastDiv');
	let currentDate = moment().format('l');

	// Create event listener for button click

	$('#searchBtn').on('click', function(e) {
		e.preventDefault();
		currentDiv.empty();
		fiveDayDiv.empty();

		// Get text value from input field and store in global variable
		city = $('#input').val().trim();

		// Call the addCity function with city as a parameter to create the past searches
		addCity(city);

		// Put city variable in queryURL and send ajax request

		var queryURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city + '&appid=' + apiKey;

		// Current weather call
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(res) {
			// Console log response

			// console.log(res);

			// Get temperature, humidity, wind speed, uv index info from response

			let cityV = res.name;
			let resDate = moment(res.dt * 1000).format('l');
			let temp = res.main.temp;
			let hum = res.main.humidity;
			let windSp = res.wind.speed;
			let lat = res.coord.lat;
			let lon = res.coord.lon;

			let weatherIcon = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '.png';

			/* Dynamically input city, date, icon, temp, humidity, wind speed, 
			and uv index into city div */

			var firstDiv = $('<div>').attr('id', 'firstRow');
			var inputCity = $('<h3>').text(cityV);
			var dateEl = $('<h3>').text(resDate);
			var wIcon = $('<img>').attr('src', weatherIcon).attr('alt', 'weather icon');
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
			var uvIndex = $('<h6>').text('UV Index: ');
			// var fifthRow = fifthDiv.append(uvIndex);

			var secondRow = secondDiv.append(tempDiv, humDiv, windSpeed, uvIndex);

			currentDiv.append(firstRow, secondRow);
		});

		// UV index call

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(r) {
			var lat = r.coord.lat;
			var lon = r.coord.lon;

			var queryURL2 =
				'https://api.openweathermap.org/data/2.5/uvi?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon;

			$.ajax({
				url: queryURL2,
				method: 'GET'
			}).then(function(r) {
				var uvIndex = r.value;

				if (uvIndex >= 0 && uvIndex < 3) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'green');
					uDiv.append(uText);
				} else if (uvIndex >= 3 && uvIndex < 6) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'yellow');
					uDiv.append(uText);
				} else if (uvIndex >= 6 && uvIndex < 8) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'orange');
					uDiv.append(uText);
				} else if (uvIndex >= 8 && uvIndex < 11) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'red');
					uDiv.append(uText);
				} else {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'purple');
					uDiv.append(uText);
				}
			});
		});

		// 5-day call
		var queryURL3 =
			'https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=' + city + '&appid=' + apiKey;

		$.ajax({
			url: queryURL3,
			method: 'GET'
		}).then(function(resp) {
			// Console log response

			// console.log(resp);

			// create 5-day forecast card with date, weather condition icon, temp, humidity
			for (i = 0; i < 5; i++) {
				var iconFor = 'https://openweathermap.org/img/wn/' + resp.list[i].weather[0].icon + '.png';
				var tempFor = resp.list[i].main.temp;
				var humFor = resp.list[i].main.humidity;

				var card = $('<div>').addClass('card').attr('style', 'width: 10rem;');

				var cardBody = $('<div>').addClass('card-body');

				var cardDate = $('<h6>').text(moment().add(i, 'd').format('l'));

				var cardIcon = $('<img>').attr('src', iconFor).attr('alt', 'weather icon');

				var cardTemp = $('<p>').text('Temp: ' + tempFor + ' °F');

				var cardHum = $('<p>').text('Humidity: ' + humFor + ' %');

				cardBody.append(cardDate, cardIcon, cardTemp, cardHum);

				card.append(cardBody);

				fiveDayDiv.append(card);
				// console.log(dateFor, iconFor, tempFor, humFor);
			}
		});
	});

	// Get text value from local storage
	// addCity();

	function addCity(searchValue) {
		// searchDiv.empty();

		var newLi = $('<li>');
		newLi.addClass('pastSearch');
		newLi.text(searchValue);
		searchDiv.prepend(newLi);

		// for (i = 0; i < localStorage.length; i++) {
		// 	var cityValue = localStorage.getItem('city-' + i);
		// 	var cityDiv = $('<div>');
		// 	var cityP = $('<p>').attr('class', 'pastSearch').text(cityValue);
		// 	cityDiv.prepend(cityP);
		// 	// Prepend text value into div for past searches
		// 	searchDiv.prepend(cityDiv);
		// 	aside.append(searchDiv);
		// }
	}

	// Create click events for past searches

	$(document).on('click', '.pastSearch', function(e) {
		e.preventDefault();
		currentDiv.empty();
		fiveDayDiv.empty();

		var pcity = $(this).text().trim();

		// Create query URL with text value from global variable and imperial value

		var queryURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + pcity + '&appid=' + apiKey;

		// Create ajax call for current weather

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(res) {
			// Console log response

			console.log(res);

			// Get city, date, and icon to represent current weather condition
			let cityV = res.name;
			let date = res.dt;

			// Get temperature, humidity, wind speed, uv index info from response
			let temp = res.main.temp;
			let hum = res.main.humidity;
			let windSp = res.wind.speed;

			let weatherIcon = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '.png';

			/* Dynamically input city, date, icon, temp, humidity, wind speed, 
			and uv index into city div */

			var firstDiv = $('<div>').attr('id', 'firstRow');
			var inputCity = $('<h3>').text(cityV);
			var dateEl = $('<h3>').text(currentDate);
			var wIcon = $('<img>').attr('src', weatherIcon).attr('alt', 'weather icon');
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
			var uvIndex = $('<h6>').text('UV Index: ');
			// var fifthRow = fifthDiv.append(uvIndex);

			var secondRow = secondDiv.append(tempDiv, humDiv, windSpeed, uvIndex);

			currentDiv.append(firstRow, secondRow);
		});

		// UV index call

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(r) {
			var lat = r.coord.lat;
			var lon = r.coord.lon;

			var queryURL2 =
				'https://api.openweathermap.org/data/2.5/uvi?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon;

			$.ajax({
				url: queryURL2,
				method: 'GET'
			}).then(function(r) {
				var uvIndex = r.value;

				if (uvIndex >= 0 && uvIndex < 3) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'green');
					uDiv.append(uText);
				} else if (uvIndex >= 3 && uvIndex < 6) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'yellow');
					uDiv.append(uText);
				} else if (uvIndex >= 6 && uvIndex < 8) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'orange');
					uDiv.append(uText);
				} else if (uvIndex >= 8 && uvIndex < 11) {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'red');
					uDiv.append(uText);
				} else {
					let uDiv = $('#secondRow h6').text('UV Index: ');
					let uText = $('<span>').text(uvIndex).css('backgroundColor', 'purple');
					uDiv.append(uText);
				}
			});
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

			// create 5-day forecast card with date, weather condition icon, temp, humidity
			for (i = 0; i < 5; i++) {
				var iconFor = 'https://openweathermap.org/img/wn/' + resp.list[i].weather[0].icon + '.png';

				var tempFor = resp.list[i].main.temp;
				var humFor = resp.list[i].main.humidity;

				var card = $('<div>').addClass('card').attr('style', 'width: 10rem;');

				var cardBody = $('<div>').addClass('card-body');

				var cardDate = $('<h6>').text(moment().add(i, 'd').format('l'));

				var cardIcon = $('<img>').attr('src', iconFor).attr('alt', 'weather icon');

				var cardTemp = $('<p>').text('Temp: ' + tempFor + ' °F');

				var cardHum = $('<p>').text('Humidity: ' + humFor + ' %');

				cardBody.append(cardDate, cardIcon, cardTemp, cardHum);

				card.append(cardBody);

				fiveDayDiv.append(card);
				// console.log(dateFor, iconFor, tempFor, humFor);
			}
		});
	});
});
