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