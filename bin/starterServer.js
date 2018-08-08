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
var WebSocket = require('faye-websocket'),
    express = require('express'),
    http = require('http');
/**
 * Server constructor
 * 
 * @param {Object} config 
 */
function Server(config) {

    this.config = config;
    this.app = express();
    this.server = new http.Server(this.app);
    this.clients = [];

    this.onSocketConnection     = this.onSocketConnection.bind(this);
    this.authorizationHandler   = this.authorizationHandler.bind(this);
    this.onError                = this.onError.bind(this);

    this.app.use(express['static']('web'));

    this.server.on('error', this.onError);
    this.server.on('upgrade', this.authorizationHandler);
    this.server.listen(config.port);
    

    console.info('Listening on port %s', config.port);
}

Server.prototype.constructor = Server;

Server.prototype.authorizationHandler = function(request, socket, head) {
    // Si la socket n'est pas une socket web
    if(!WebSocket.isWebSocket(request)) {
        return socket.end();
    }

    var websocket = new WebSocket(request, socket, head, ['websocket']),
        ip = request.headers['x-real-ip'] || request.connection.remoteAdresse;

    return this.onSocketConnection(websocket, ip);
}

Server.prototype.onSocketConnection = function(socket, ip) {

    var client = new ServerSocketClient(socket, ip);
    client.id = this.clients.length;
    this.clients.push(client);

    console.info('Client %s connected', client.id);
}

/**
 * On Error
 * 
 * @param {Error} error 
 */
Server.prototype.onError = function(error) {

    console.error('Server error :', + error.stack);
}
function ServerSocketClient(socket, ip) {

    ModelSocketClient.call(this, socket);

    this.ip     = ip;
    this.id     = null;
}

ServerSocketClient.prototype = Object.create(ModelSocketClient.prototype);
ServerSocketClient.prototype.constructor = ServerSocketClient;
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
