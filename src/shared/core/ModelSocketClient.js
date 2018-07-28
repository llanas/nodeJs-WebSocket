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