'usr strict';

var httpServer = require('./lib/httpServer');

module.exports = {
    addResources: function (resource) {
        httpServer.addResources(resource);
    },

    startServer: function (port) {
        httpServer.startServer(port);
    }
};
