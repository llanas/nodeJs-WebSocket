var starterApp = angular.module('starterApp', ['ngRoute']);

starterApp.service('SocketClient', SocketClient);

starterApp.controller(
    'StarterController', 
    ['$scope', 'SocketClient', StarterController]
);

starterApp.controller(
    'HomeController',
    ['$scope', HomeController]
);

starterApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'js/views/home.html',
            controller: 'HomeController'
        })
}]);