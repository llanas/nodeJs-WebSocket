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