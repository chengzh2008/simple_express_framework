'use strict';
var dataSource = require('./dataSourcePlainFile'),
    nextId = {},
    filename,
    key;
module.exports = {
    addResources: function (resource) {
        dataSource.addResources(resource);
    },
    POST: function (req, res, parsedInfo) {
        nextId[parsedInfo.resource] = nextId[parsedInfo.resource] || 0;
        filename = getFileName(parsedInfo.resource, nextId[parsedInfo.resource]++);
        parseJson(req, function (err, status, jsonData) {
            if (err) {
                sendResponse(res, status, jsonData);
            }
            dataSource.saveJson(filename, jsonData, function (err, status, message) {
                sendResponse(res, status, message);
            });
        });
    },
    GET: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        dataSource.getJson(filename, function (err, status, data) {
            sendResponse(res, status, data);
        });
    },

    PUT: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        parseJson(req, function (err, status, jsonData) {
            if (err) {
                sendResponse(res, status, jsonData);
            }
            dataSource.putJson(filename, jsonData, function (err, status, message) {
                sendResponse(res, status, message);
            });
        });
    },

    PATCH: function (req, res, parsedInfo) {
        filename = getFileName(parsedInfo.resource, parsedInfo.id);
        parseJson(req, function (err, status, jsonData) {
            if (err) {
                sendResponse(res, status, jsonData);
            }
            dataSource.getJson(filename, function (err, status, data) {
                for (key in jsonData) {
                    data.data[key] = jsonData[key];
                }
                dataSource.saveJson(filename, data.data, function (err, status, message) {
                    sendResponse(res, status, message);
                });
            });
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
    return './data/' + resource + '/' + id + '.json';
}

function parseJson(req, callback) {
    var input = '';
    req.on('data', function (data) {
        input += data.toString();
    });
    req.on('end', function () {
        input = JSON.parse(input);
        callback(null, null, input);
    });
    req.on('error', function (err) {
        callback(err, 500, {
            msg: 'Internal server error',
            data: null
        });
    });
}

