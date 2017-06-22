var myNinjaApp = angular.module("myNinjaApp", ["ngRoute", "ngAnimate"]);


// FIXING ANGULAR 1.6 ROUTING ISSUE
myNinjaApp.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);




//we do routing in config, to tell ng-view what to display
myNinjaApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

	//$locationProvider.html5Mode(true);   // for pretty URLs, so we can use just /home in the URL, instead of having ugly # stuff   DOESNT WORK WITH NEW ANGULAR
	
	$routeProvider
		.when("/home", {
			templateUrl: "views/home.html",
			controller: "NinjaController"
		})
		.when("/contact", {
			templateUrl: "views/contact.html",
			controller: "ContactController"
		})
		.when("/contact-success", {
			templateUrl: "views/contact-success.html",
			controller: "ContactController"
		})
		.when("/directory", {
			templateUrl: "views/directory.html",
			controller: "NinjaController"
		})
		.otherwise({
			redirect: "/home"
		});
		

}]);



myNinjaApp.directive("randomNinja", [function(){

	return {
		restrict: "E",
		scope: {            //different scope than outside this directive
			ninjas: "=",
			title: "="
		},
		templateUrl: "views/random.html",
		transclude: true,
		replace: true,
		controller: function($scope){
			$scope.random = Math.floor(Math.random()*4);
		}
	};

}]);


myNinjaApp.controller("NinjaController", ["$scope", "$http", function($scope, $http){

	$scope.removeNinja = function(ninja){
		var removedNinja = $scope.ninjas.indexOf(ninja);
		$scope.ninjas.splice(removedNinja, 1);
	};

	$scope.addNinja = function(){
		$scope.ninjas.push({
			name: $scope.newninja.name,
			belt: $scope.newninja.belt,
			rate: parseInt($scope.newninja.rate),
			available: true
		});
		$scope.newninja.name = "";
		$scope.newninja.belt = "";
		$scope.newninja.rate = "";
	};


	$scope.removeAll = function() {
		$scope.ninjas = [];
	}


	$http.get("data/ninjas.json")                     // .success IS NO LONGER SUPPORTED ON 1.6
		.then(function (response) {
			$scope.ninjas = response.data;
		},function (error){
			console.log(error, 'cant get data.');
		});

}]);




myNinjaApp.controller("ContactController", ["$scope", "$location", function($scope, $location){

	$scope.sendMessage = function(){
		$location.path("/contact-success");
	};



}]);