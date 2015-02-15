'use strict';
var fs = require('fs'),
    nextId = {};
module.exports = {
    resources: [],
    route: function (req, res) {
        nextId[req.parsedParam.resource] = nextId[req.parsedParam.resource] || 0;
        var filename,
            ws;

        function sendResponse(code, msg) {
            res.writeHead(code, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(msg));
        }

        function getFileName(resource, id) {
            return './data/' + resource + '-' + id + '.json';
        }

        if (req.method === 'POST') {
            filename = getFileName(req.parsedParam.resource, nextId[req.parsedParam.resource]);
            ws = fs.createWriteStream(filename);
            nextId[req.parsedParam.resource]++;
            req.pipe(ws);
            sendResponse(200, {msg: 'Successfully saved the post content'});
        }

        if (req.method === 'GET') {
            filename = getFileName(req.parsedParam.resource, req.parsedParam.id);
            fs.readFile(filename, function (err, data) {
                if (err) {
                    sendResponse({msg: 'Your request does not exist'});
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data.toString());
            });
        }

        if (req.method === 'PUT') {
            filename = getFileName(req.parsedParam.resource, req.parsedParam.id);
            fs.exists(filename, function (exists) {
                if (!exists) {
                    sendResponse(403, {msg: 'Your request does not exist'});
                } else {
                    ws = fs.createWriteStream(filename);
                    req.pipe(ws);
                    sendResponse(200, {msg: 'Successfully saved the post content'});
                }
            });
        }

        if (req.method === 'PATCH') {
            filename = getFileName(req.parsedParam.resource, req.parsedParam.id);
            fs.exists(filename, function (exists) {
                if (!exists) {
                    sendResponse(403, {msg: 'Your request does not exist'});
                } else {
                    var input = '';
                    req.on('data', function (data) {
                        input += data.toString();
                    });
                    req.on('end', function () {
                        input = JSON.parse(input);
                        fs.readFile(filename, function (err, data) {
                            if (err) {
                                sendResponse(503, {msg: 'Internal server error'});
                            }
                            var current = JSON.parse(data.toString());
                            for (var key in input) {
                                current[key] = input[key];
                            }
                            fs.writeFile(filename, JSON.stringify(current), function (err) {
                                if (err) {
                                    sendResponse(503, {msg: 'Internal server error'});
                                }
                                sendResponse(200, {msg: 'Successfully saved the post content'});
                            })
                        });

                    });
                }
            });
        }

        if (req.method === 'DELETE') {
            filename = getFileName(req.parsedParam.resource, req.parsedParam.id);
            fs.exists(filename, function (exists) {
                if (exists) {
                    fs.unlink(filename, function (err) {
                        if (err) {
                            sendResponse(503, {msg: 'Internal server error'});
                        }
                        sendResponse(200, {msg: 'Your content has been deleted successfully'});
                    });
                } else {
                    sendResponse(403, {msg: 'Your request does not exist'})
                }
            });
        }
    }

};


