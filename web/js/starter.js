(function(){
"use strict";
class ModelSocketClient extends EventEmitter {

    constructor(socket) {
        super();

        this.socket     = socket;
        this.connect    = true;

        this.attachEvent();
    }

    attachEvent() {
    
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('close', this.onClose);
    }

    onMessage(e) {
        console.info('Message Received : ', JSON.parse(e.data));
    }

    onClose(e) {
        this.connected = false;
        console.info('Socket closed');
    }

    sendEvent(event) {
        this.socket.send(JSON.stringify(event));
    }
}
class AbstractController extends EventEmitter {
    
    constructor($scope) {
        super();    
        this.$scope = $scope;
    }
}
class StarterController extends AbstractController {

    constructor($scope, client) {
        super($scope);

        this.client     = client;
        this.$scope     = $scope;

        console.info('StarterController have been created');
    }
}
class SocketClient extends ModelSocketClient {
    
    constructor() {
        super();

        this.onOpen     = this.onOpen.bind(this);
        this.connected  = false

        var Socket      = window.MozWebSocket || window.WebSocket;

        super.call(new Socket('ws://' + document.location.host + document.location.pathname, ['websocket']));

        this.socket.addEventListener('open', this.onOpen);
        this.socket.addEventListener('start', this.onStart);
    }

    attachEvent() {
        this.socket.addEventListener('open', this.onOpen);
    }

    onOpen() {
        console.info('Socket open');
        this.sendEvent('start');
    }

    onStart() {
        console.info('Application lancé : ' + JSON.stringify(data));
    }
}
var starterApp = angular.module('starterApp', ['ngRoute']);

starterApp.service('SocketClient', SocketClient);

starterApp.controller(
    'StarterController', 
    ['$scope', 'SocketClient', StarterController]
);
})();