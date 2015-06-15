var express = require('express');
var request = require('request');
var router = express.Router();
var tweetService = require('./../lib/tweets').TweetsService();
var authService = require('./../lib/authenticator').Authenticator();

/* GET home page. */
router.get('/', function (req, res, next) {
        authService.authenticate({}, function (token) {
            req.access_token = token;
            next();
        })
    },
    function (req, res, next) {
        var opts = {
            query: req.query.q,
            access_token: req.access_token
        }
        tweetService.search(opts, function (data) {
            res.json(data);
        });
    }
);

module.exports = router;
