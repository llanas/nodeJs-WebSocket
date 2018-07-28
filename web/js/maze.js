(function(){
"use strict";
function ModelSocketClient(socket) {

    this.socket     = socket;
    this.connect    = true;

    this.onMessage  = this.onMessage.bind(this);
    this.onClose    = this.onClose.bind(this);

    this.attachEvent();
}

ModelSocketClient.prototype.constructor = ModelSocketClient;

ModelSocketClient.prototype.attachEvent = function() {

    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('close', this.onClose);
}

ModelSocketClient.prototype.onMessage = function(e) {
    console.info('Message Received : ', JSON.parse(e.data));
}

ModelSocketClient.prototype.onClose = function(e) {
    this.connected = false;
    console.info('Socket closed');
}
function HomeController($scope) {
    
    this.$scope     = $scope;
}

HomeController.prototype.constructor = HomeController;
function MazeController($scope, client) {


    this.client     = client;
    this.$scope     = $scope;

    console.info('MazeController have been created');
}

MazeController.prototype.constructor = MazeController;
function SocketClient() {
    
    
    this.onOpen     = this.onOpen.bind(this);
    this.connected  = false

    var Socket      = window.MozWebSocket || window.WebSocket;

    ModelSocketClient.call(this, new Socket('ws://' + document.location.host + document.location.pathname, ['websocket']));

    this.socket.addEventListener('open', this.onOpen);
    
}

SocketClient.prototype = Object.create(ModelSocketClient.prototype);
SocketClient.prototype.constructor = SocketClient;

SocketClient.prototype.attachEvent = function() {

    this.socket.addEventListener('open', this.onOpen);
}

SocketClient.prototype.onOpen = function() {
    console.info('Socket open');
}
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
})();