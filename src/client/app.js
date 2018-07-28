var mazeApp = angular.module('mazeApp', ['ngRoute']);

mazeApp.service('SocketClient', SocketClient);

mazeApp.controller(
    'MazeController', 
    ['$scope', 'SocketClient', MazeController]
);

mazeApp.controller(
    'HomeController',
    ['$scope', HomeController]
);

mazeApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'js/views/home.html',
            controller: 'HomeController'
        })
}]);