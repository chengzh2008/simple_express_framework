'use strict';

var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('time'),
    expect = chai.expect,
    Chance = require('chance'),
    chance = new Chance(),
    serverUrl = 'localhost:4000',
    info = {
        serverError: 'Internal server error',
        success: 'Successful',
        invalid: 'Invalid request'
    };

require('../myApp');

chai.use(chaihttp);

function getRandomJsonObject() {
    return {
        author: chance.string(10),
        message: chance.string(100)
    };
}

describe('unicorns resource http request tests', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject(),
        c = getRandomJsonObject(),
        e = getRandomJsonObject();


    // the following five it's for test post and get request method
    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/unicorns')
            .send(a)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/unicorns')
            .send(b)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/unicorns')
            .send(c)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should get the first post', function (done) {
        chai.request(serverUrl)
            .get('/unicorns/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(a);
                done();
            });
    });

    it('should get the second post', function (done) {
        chai.request(serverUrl)
            .get('/unicorns/1')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(b);
                done();
            });
    });

    // the following two it's for test put request method
    it('should put the first post', function (done) {
        chai.request(serverUrl)
            .put('/unicorns/0')
            .send(e)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should get the modified content by previous put method', function (done) {
        chai.request(serverUrl)
            .get('/unicorns/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(e);
                done();
            });
    });

    // the following two it's for test delete request method
    it('should respond a delete request', function (done) {
        chai.request(serverUrl)
            .delete('/unicorns/1')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should respond a non-exist delete request', function (done) {
        chai.request(serverUrl)
            .delete('/unicorns/1')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.invalid);
                done();
            });
    });

    // the following three it's for test patch request method
    it('should respond a patch request', function (done) {
        chai.request(serverUrl)
            .put('/unicorns/2')
            .send({author: 'java', message: 'original message'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });
    it('should respond a patch request', function (done) {
        chai.request(serverUrl)
            .patch('/unicorns/2')
            .send({author: 'java patched', key: 'added value'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });


    it('should return a content modified by a patch request', function (done) {
        chai.request(serverUrl)
            .get('/unicorns/2')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data)
                    .to.deep.eql({  author: 'java patched',
                        key: 'added value',
                        message: 'original message'});
                done();
            });

    });
});


describe('footballs resource http request tests', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject(),
        c = getRandomJsonObject(),
        e = getRandomJsonObject();


    // the following five it's for test post and get request method
    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/footballs')
            .send(a)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/footballs')
            .send(b)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request(serverUrl)
            .post('/footballs')
            .send(c)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should get the first post', function (done) {
        chai.request(serverUrl)
            .get('/footballs/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(a);
                done();
            });
    });

    it('should get the second post', function (done) {
        chai.request(serverUrl)
            .get('/footballs/1')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(b);
                done();
            });
    });

    // the following two it's for test put request method
    it('should put the first post', function (done) {
        chai.request(serverUrl)
            .put('/footballs/0')
            .send(e)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                expect(res.body.data).to.deep.eql(e);
                done();
            });
    });

    it('should get the modified content by previous put method', function (done) {
        chai.request(serverUrl)
            .get('/footballs/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data).to.deep.eql(e);
                done();
            });
    });

    // the following two it's for test delete request method
    it('should respond a delete request', function (done) {
        chai.request(serverUrl)
            .delete('/footballs/1')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });

    it('should respond a non-exist delete request', function (done) {
        chai.request(serverUrl)
            .delete('/footballs/1')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.invalid);
                done();
            });
    });

    // the following three it's for test patch request method
    it('should respond a patch request', function (done) {
        chai.request(serverUrl)
            .put('/footballs/2')
            .send({author: 'java', message: 'original message'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });
    it('should respond a patch request', function (done) {
        chai.request(serverUrl)
            .patch('/footballs/2')
            .send({author: 'java patched', key: 'added value'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql(info.success);
                done();
            });
    });


    it('should return a content modified by a patch request', function (done) {
        chai.request(serverUrl)
            .get('/footballs/2')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.data)
                    .to.deep.eql({  author: 'java patched',
                        key: 'added value',
                        message: 'original message'});
                done();
            });

    });
});

