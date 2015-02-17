'use strict';

var http = require('http'),
    router = require('./Router'),
    path,
    parsedInfo;

module.exports = {
    addResources: function (resource) {
        router.addResources(resource);
    },

    startServer: function (port) {
        http.createServer(function (req, res) {
            var pathParam = getPathParam(req);
            parsedInfo = {
                resource: pathParam[0],
                id: pathParam[1]
            };

            if (typeof router[req.method] === 'function') {
                router[req.method](req, res, parsedInfo);
            } else {
                res.writeHead(403, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({msg: 'request method not supported!'}));
            }
        }).listen(process.env.port || port, function () {
            console.log('server listening');
        });
    }
};

// return an array contains the path info
// such as, "/posts/id" will return ['posts', 'id']
// "/posts" will return ['posts', undefined]
function getPathParam(req) {
    var regex = /^\/(\w+)(?:\/)?(\w+)?/g;
    path = regex.exec(req.url).slice(1);
    return path;
}
