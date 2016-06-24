angular.module('chadsStockApp', [])
.controller('mainCtrl', function($scope, stockService) {
	$scope.helloConsole = function() {
		console.log('hello');
	}

	$scope.getQuote = function(stockName) {
		stockService.getQuote(function(response){
			var results = response.data.query.results;
			var symbol = response.data.query.results.quote.symbol;
			var ask = response.data.query.results.quote.Ask;
			console.log(response.data);
			$scope.quote = symbol;
			$scope.ask = ask;
			$scope.results = results
			if(ask<100) {
				$scope.decision = "BUY!"
			} else {
				$scope.decision = "SELL!"
			}

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