'use strict';
var fs = require('fs'),
    dataSource = require('./dataSourcePlainFile'),
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
        getJson(req, function (err, jsonData) {
            if (err) {
                sendResponse(res, 500, {msg: 'Internal server error'});
            }
            dataSource.putJson(filename, jsonData, function (err, status, message) {
                sendResponse(res, status, message);
            });
        });
    },

    PATCH: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        fs.exists(filename, function (exists) {
            if (!exists) {
                sendResponse(res, 403, {msg: 'Your request does not exist'});
            } else {
                getJson(req, function (err, input) {
                    fs.readFile(filename, function (err, data) {
                        if (err) {
                            sendResponse(res, 503, {msg: 'Internal server error'});
                        }
                        var current = JSON.parse(data.toString());
                        for (key in input) {
                            current[key] = input[key];
                        }
                        dataSource.saveJson(filename, current, function (err) {
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
        dataSource.deleteJson(filename, function (err, status, message) {
            sendResponse(res, status, message);
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

function getJson(req, callback) {
    var input = '';
    req.on('data', function (data) {
        input += data.toString();
    });
    req.on('end', function () {
        input = JSON.parse(input);
        callback(null, input);
    });
    req.on('error', function (err) {
        callback(err);
    });
}

