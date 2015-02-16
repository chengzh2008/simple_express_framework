'use strict';

var http = require('http'),
    router = require('./Router'),
    path,
    parsedInfo;

module.exports = {
    addResources: function (resource) {
        router.resources.push(resource);
    },

    startServer: function (port) {
        http.createServer(function (req, res) {
            var pathParam = getPathParam(req);
            parsedInfo = {
                resource: pathParam[0],
                id: pathParam[1]
            };

            if (router.resources.indexOf(parsedInfo.resource) !== -1) {
                router[req.method](req, res, parsedInfo);
            } else {
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });

                res.write(JSON.stringify({msg: 'page not found'}));
                res.end();
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
