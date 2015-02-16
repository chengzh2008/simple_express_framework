'use strict';
var fs = require('fs'),
    nextId = {},
    filename,
    ws,
    key;
module.exports = {
    resources: [],
    POST: function (req, res, parsedInfo) {
        nextId[parsedInfo.resource] = nextId[parsedInfo.resource] || 0;
        filename = getFileName(parsedInfo.resource, nextId[parsedInfo.resource]++);
        ws = fs.createWriteStream(filename);
        req.pipe(ws);
        sendResponse(res, 200, {msg: 'Successfully saved the post content'});
    },
    GET: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        fs.readFile(filename, function (err, data) {
            if (err) {
                sendResponse(res, 403, {msg: 'Your request does not exist'});
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data.toString());
        });
    },

    PUT: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        fs.exists(filename, function (exists) {
            if (!exists) {
                sendResponse(res, 403, {msg: 'Your request does not exist'});
            } else {
                ws = fs.createWriteStream(filename);
                req.pipe(ws);
                sendResponse(res, 200, {msg: 'Successfully saved the post content'});
            }
        });
    },

    PATCH: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        fs.exists(filename, function (exists) {
            if (!exists) {
                sendResponse(res, 403, {msg: 'Your request does not exist'});
            } else {
                var input = '';
                req.on('data', function (data) {
                    input += data.toString();
                });
                req.on('end', function () {
                    input = JSON.parse(input);
                    fs.readFile(filename, function (err, data) {
                        if (err) {
                            sendResponse(res, 503, {msg: 'Internal server error'});
                        }
                        var current = JSON.parse(data.toString());
                        for (key in input) {
                            current[key] = input[key];
                        }
                        fs.writeFile(filename, JSON.stringify(current), function (err) {
                            if (err) {
                                sendResponse(res, 503, {msg: 'Internal server error'});
                            }
                            sendResponse(res, 200, {msg: 'Successfully saved the post content'});
                        });
                    });

                });
            }
        });
    },

    DELETE: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {
                        sendResponse(res, 503, {msg: 'Internal server error'});
                    }
                    sendResponse(res, 200, {msg: 'Your content has been deleted successfully'});
                });
            } else {
                sendResponse(res, 403, {msg: 'Your request does not exist'});
            }
        });
    }

};

function sendResponse(res, code, msg) {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(msg));
}

function getFileName(resource, id) {
    return './data/' + resource + '-' + id + '.json';
}
