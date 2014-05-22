var flagQuiz = angular.module('flagQuiz', ['ngRoute']);

flagQuiz.controller('mainCtrl', function($scope, $route, $routeParams, $location, $http, gameService) {
    var masterCountryList;
    gameService.getCountries().then(function(result){
        masterCountryList = result;
        console.log(masterCountryList);
    });

});