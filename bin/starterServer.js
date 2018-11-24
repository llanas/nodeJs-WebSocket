var EventEmitter = require('events').EventEmitter, 
    WebSocket = require('faye-websocket'),
    express = require('express'),
    http = require('http');
/**
 * Server constructor
 *
 * @param {Object} config
 */
class Server extends EventEmitter {
    constructor(config) {

        EventEmitter.call(this);

        this.config = config;
        this.app = express();
        this.server = new http.Server(this.app);
        this.clients = [];
        this.onSocketConnection = this.onSocketConnection.bind(this);
        this.authorizationHandler = this.authorizationHandler.bind(this);
        this.onError = this.onError.bind(this);
        this.app.use(express['static']('web'));
        this.server.on('error', this.onError);
        this.server.on('upgrade', this.authorizationHandler);
        this.server.on('start', this.onStart);
        this.server.listen(config.port);

        console.info('Listening on port %s', config.port);
    };

    authorizationHandler(request, socket, head) {
        // Si la socket n'est pas une socket web
        if(!WebSocket.isWebSocket(request)) {
            return socket.end();
        }
    
        var websocket = new WebSocket(request, socket, head, ['websocket']),
            ip = request.headers['x-real-ip'] || request.connection.remoteAdresse;
    
        return this.onSocketConnection(websocket, ip);
    };

    onSocketConnection(socket, ip) {

        var client = new ServerSocketClient(socket, ip);
        client.id = this.clients.length;
        this.clients.push(client);
        
        console.info('Client %s connected', client.id);
    };

    onStart(data) {
        console.info('Application démarré par le client avec les informations suivantes : ' + JSON.stringify(data));
    }

    /**
     * On Error
     * 
     * @param {Error} error 
     */
    onError(error) {

        console.error('Server error :', + error.stack);
    }
}


class ServerSocketClient extends ModelSocketClient {

    constructor(socket, ip) {
        super(socket);

        this.ip     = ip;
        this.id     = null;
    }
}
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
var config,
    packageInfo = require('../package.json'),
    config = {
        port: 8088,
        inspector: { enabled: false }
    };


var server = new Server({ port: config.port });

if (config.inspector.enabled) {
    try {
      new Inspector(server, config.inspector);
    } catch (error) {
        console.error('Inspector error:', error);
    }
}

module.exports = server;
