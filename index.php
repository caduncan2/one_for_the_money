<!DOCTYPE html>
<html>
<head>
	<title>My Stock App</title>
</head>
<body>
<div ng-app="chadsStockApp">
	<h1>Chad's Stock APP</h1>
	<div ng-controller ="mainCtrl">
		<input  type="text" placeholder="Enter Your Stock Ticker Here">
		<button ng-click="helloConsole()">Submit</button>
	</div>
</div>
</body>
</html>