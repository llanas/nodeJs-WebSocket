class SocketClient extends ModelSocketClient {
    
    constructor() {
        var Socket = window.MozWebSocket || window.WebSocket;
        var socketBuilder = new Socket('ws://' + document.location.host + document.location.pathname, ['websocket']);
       
        super(socketBuilder);

        this.onOpen     = this.onOpen.bind(this);
        this.connected  = false
        
        this.socket.addEventListener('open', this.onOpen);
        this.socket.addEventListener('start', this.onStart);
    }

    onOpen() {
        console.info('Socket open');
        this.sendEvent('start');
    }

    onStart() {
        console.info('Application lancé : ' + JSON.stringify(data));
    }
}