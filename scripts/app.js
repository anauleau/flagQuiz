var flagQuiz = angular.module('flagQuiz', ['ngRoute']);

flagQuiz.controller('mainCtrl', function($scope, $route, $routeParams, $location, $http) {
    $http.get('data/countries.json').success(function(result){
        $scope.flags = result;
    });
});