'usr strict';

var fs = require('fs'),
    info = {
        serverError: 'Internal server error',
        success: 'Successful',
        invalid: 'Invalid request'
    },
    resources = [],
    fileDir;

module.exports = {
    addResources: function (resource) {
        if (resources.indexOf(resource) === -1) {
            resources.push(resource);
            fileDir = './data/' + resource;
            fs.mkdir(fileDir, function (err) {
                if (err) {
                    console.log('Internal server error!');
                }
                console.log("file directory has been created", fileDir);
            });
        }
    },

    saveJson: function (filename, jsonData, callback) {
        fs.writeFile(filename, JSON.stringify(jsonData), function (err) {
            if (err) {
                serverErrorCallback(err, callback);
            }
            successCallback(jsonData, callback);
        });

    },

    deleteJson: function (filename, callback) {
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {
                        serverErrorCallback(err, callback);
                    }
                    successCallback(null, callback);
                });
            } else {
                invalidCallback(null, callback);
            }
        });
    },

    putJson: function (filename, jsonData, callback) {
        //var that = this;
        fs.exists(filename, function (exists) {
            if (!exists) {
                invalidCallback(err, callback);
            } else {
                this.saveJson(filename, jsonData, function (err) {
                    if (err) {
                        serverErrorCallback(err, callback);
                    }
                    successCallback(jsonData, callback);
                });
            }
        }.bind(this));

    },

    getJson: function (filename, callback) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                callback(err, 403, {
                    msg: info.invalid,
                    data: null
                });
            }
            successCallback(JSON.parse(data.toString()), callback);
        });
    }
};

function successCallback(jsonData, callback) {
    callback(null, 200, {msg: info.success, data: jsonData});
}

function invalidCallback(err, callback) {
    callback(err, 403, {msg: info.invalid, data: null});
}

function serverErrorCallback(err, callback) {
    callback(err, 500, {msg: info.serverError, data: null});
}

