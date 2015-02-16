'usr strict';

var fs = require('fs'),
    info = {
        serverError: 'Internal server error',
        success: 'Successful',
        invalid: 'Invalid request'
    };

module.exports = {
    saveJson: function (filename, jsonData, callback) {
        fs.writeFile(filename, JSON.stringify(jsonData), function (err) {
            if (err) {
                callback(err, 500, {msg: info.serverError,
                                    data: null
                });
            }
            callback(null, 200, {msg: info.success,
                                data: jsonData
            });
        });

    },

    deleteJson: function (filename, callback) {
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {
                        callback(err, 500, {msg: info.serverError,
                                            data: null
                        });
                    }
                    callback(null, 200, {msg: info.success,
                                        data: null
                    });
                });
            } else {
                callback(null, 403, {msg: info.invalid,
                                    data: null
                });
            }
        });
    },

    putJson: function (filename, jsonData, callback) {
        //var that = this;
        fs.exists(filename, function (exists) {
            if (!exists) {
                callback(null, 403, {msg: info.invalid,
                                    data: null
                });
            } else {
                this.saveJson(filename, jsonData, function (err) {
                    if (err) {
                        callback(err, 500, {msg: info.serverError,
                                            data: null
                        });
                    }
                    callback(null, 200, {msg: info.success,
                                        data: jsonData
                    });
                });
            }
        }.bind(this));

    },

    getJson: function (filename, callback) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                callback(err, 403, {msg: info.invalid,
                                    data: null
                });
            }
            callback(null, 200, {msg: info.success,
                            data: JSON.parse(data.toString())
            });
        });
    }
};
