function ServerSocketClient(socket, ip) {

    ModelSocketClient.call(this, socket);

    this.ip     = ip;
    this.id     = null;
}

ServerSocketClient.prototype = Object.create(ModelSocketClient.prototype);
ServerSocketClient.prototype.constructor = ServerSocketClient;