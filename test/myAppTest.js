'use strict';

var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('time'),
    expect = chai.expect,
    chance = new require('chance')();

require('../myApp');

chai.use(chaihttp);

function getRandomJsonObject() {
    return {
        author: chance.string(10),
        message: chance.string(100)
    }
}

describe('unicorn resource http request tests', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject(),
        c = getRandomJsonObject();


    // test post request method
    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/unicorns')
            .send(a)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/unicorns')
            .send(b)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/unicorns')
            .send(c)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should get the first post', function (done) {
        chai.request('localhost:3000')
            .get('/unicorns/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(a);
                done();
            });
    });

    it('should get the second post', function (done) {
        chai.request('localhost:3000')
            .get('/unicorns/1')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(b);
                done();
            });
    });


});



describe('footballs resource http request tests', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject(),
        c = getRandomJsonObject();


    // test post request method
    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/footballs')
            .send(a)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/footballs')
            .send(b)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/footballs')
            .send(c)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should get the first post', function (done) {
        chai.request('localhost:3000')
            .get('/footballs/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(a);
                done();
            });
    });

    it('should get the second post', function (done) {
        chai.request('localhost:3000')
            .get('/footballs/1')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(b);
                done();
            });
    });


});

