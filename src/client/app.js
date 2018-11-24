var starterApp = angular.module('starterApp', ['ngRoute']);

starterApp.service('SocketClient', SocketClient);

starterApp.controller(
    'StarterController', 
    ['$scope', 'SocketClient', StarterController]
);