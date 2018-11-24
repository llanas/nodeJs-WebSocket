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