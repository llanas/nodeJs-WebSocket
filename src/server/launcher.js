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
