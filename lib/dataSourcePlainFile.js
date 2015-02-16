'usr strict';

var fs = require('fs');

module.exports = {
    saveJson: function (filename, jsonData, callback) {
        fs.writeFile(filename, JSON.stringify(jsonData), function (err) {
            if (err) {
                callback(err, 500, {msg: 'Internal server error'});
            }
            callback(null, 200, {msg: 'Successfully saved the post content'});
        });

    },

    deleteJson: function (filename, callback) {
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {
                        callback(err, 500, {msg: 'Internal server error'});
                    }
                    callback(null, 200, {msg: 'Your content has been deleted successfully'});
                });
            } else {
                callback(null, 403, {msg: 'Your request does not exist'});
            }
        });
    },

    putJson: function (filename, jsonData, callback) {
        var that = this;
        fs.exists(filename, function (exists) {
            if (!exists) {
                callback(null, 403, {msg: 'Your request does not exist'});
            } else {
                that.saveJson(filename, jsonData, function (err) {
                    if (err) {
                        callback(err, 500, {msg: 'Internal server error'});
                    }
                    callback(null, 200, {msg: 'Successfully saved the post content'});
                });
            }
        });

    }
};
