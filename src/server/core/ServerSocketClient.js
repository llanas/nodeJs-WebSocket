class ServerSocketClient extends ModelSocketClient {

    constructor(socket, ip) {
        super(socket);

        this.ip     = ip;
        this.id     = null;
    }
}