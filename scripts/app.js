angular.module('chadsStockApp', [])
.controller('mainCtrl', function($scope, stockService) {
	$scope.helloConsole = function() {
		console.log('hello');
	}

	$scope.getQuote = function(stockName) {
		stockService.getQuote(function(response){
			var results = response.data.query.results.quote;
			var symbol = response.data.query.results.quote.symbol;
			var ask = response.data.query.results.quote.Ask
			var avgDaily = parseInt(results.AverageDailyVolume);
			var volume = parseInt(results.Volume);
			var fiftyDay = parseInt(results.FiftydayMovingAverage);
			var twoHundredDay = parseInt(results.TwoHundreddayMovingAverage);
			var volumePercentage = (((volume - avgDaily)/avgDaily) * 100).toFixed(2);
			var resultsList = $('#resultsList');
			function appendListPostive(metricString,metric,comparingMetric,comparingMetricString) {
					resultsList.append('<li class="valid"> The ' + metricString + ' of ' + metric + ' is greater than the current ' + comparingMetricString + ' of ' + comparingMetric + '</li>');			
				}
			function appendListNegative(metricString,metric,comparingMetric,comparingMetricString) {
				resultsList.append('<li class="invalid"> The ' + metricString + ' of ' + metric + ' is less than the current ' +  comparingMetricString + ' of ' + comparingMetric + '</li>');
				}			
		
			if(fiftyDay > ask || twoHundredDay > ask || volumePercentage > 30) {
				$scope.decision = "BUY!";
				console.log(twoHundredDay + " " + fiftyDay + " " + ask);
				if (fiftyDay > ask === true) {
					appendListPostive("Fifty Day Average",fiftyDay,ask,"asking price");
				} else {
					appendListNegative("Fifty Day Average",fiftyDay,ask,"asking price");

				}

				if (twoHundredDay > ask === true) {
					appendListPostive("Two-Hundred Day Average",twoHundredDay,ask,"asking price");
						console.log(twoHundredDay + " " + fiftyDay + " " + ask);
				} else {
					appendListNegative("Two-Hundred Day Average",twoHundredDay,ask,"asking price");
				}

				if (volumePercentage < 30 === true) {
					resultsList.append('<li>The volume percentage difference of ' + volumePercentage + '% is below the 30% threshold</li>');
				} else {
					resultsList.append('<li>The volume percentage difference of ' + volumePercentage + '% is greater than the 30% threshold</li>');
				} 
			} else { 
				$scope.decision = "Don't Buy!"
				if (fiftyDay > ask === true) {
					appendListPostive("Fifty Day Average",fiftyDay,ask, "asking price");
				} else {
					appendListNegative("Fifty Day Average",fiftyDay,ask,"asking price");

				}

				if (twoHundredDay > ask === true) {
					appendListPostive("Two-Hundred Day Average", twoHundredDay,ask,"asking price");
				} else {
					appendListNegative("Two-Hundred Day Average", twoHundredDay,ask, "asking price");
				}

				if (volumePercentage < 30 === true) {
					resultsList.append('<li class="valid">The volume percentage difference of ' + volumePercentage + '% is below the 30% threshold</li>');
				} else {
					resultsList.append('<li class=:invalid">The volume percentage difference of ' + volumePercentage + '% is greater than the 30% threshold</li>');
				} 
			}

			resultsList.append('<li> The current volume of ' + symbol + ' is ' + volume + ' compared to the average daily volume of ' + avgDaily + ' </li>')

		}, stockName)
	}


})
.service('stockService', function($http) {
	this.getQuote = function(callback, stockName) {
	$http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + stockName + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
	.then(callback)
	console.log(stockName);
	};

});