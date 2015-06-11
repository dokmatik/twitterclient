var express = require('express');
var router = express.Router();
var TweetsService = require('./tweets.js');
var request = require('request');

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }
}


/* GET home page. */
router.get('/', function (req, res, next) {
        function setAccessToken(token) {
            this.access_token = token;
        }

        if (this.access_token) {
            console.log('Reusing token ' + this.access_token);
            req.access_token = this.access_token;
            next();
        } else {

            var consumerKey = encodeURIComponent('Z2Z6EqGssfsbpoacajU7Q')
            var consumerSecret = encodeURIComponent('Lm3VVmY0cj0gPBJa7qZO1VUVIUkm7fRU85hmvkI5oI')
            var credentials = Base64.encode(consumerKey + ':' + consumerSecret)

            var post_options = {
                url: 'https://api.twitter.com/oauth2/token',
                qs: {
                    grant_type: 'client_credentials'
                },
                headers: {
                    'Authorization': 'Basic ' + credentials,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
            var twitterOauthEndpoint = request.post(post_options, function (error, response, body) {
                    console.log(body);
                    console.log('req: ' + req);
                    req.access_token = JSON.parse(body).access_token;
                    setAccessToken(req.access_token);
                    next();
                }
            )
        }
    },
    function (req, res, next) {
        var t = new TweetsService();
        var opts = {
            query: req.query.q,
            access_token: req.access_token
        }
        t.search(opts, function (data) {
            res.json(data.statuses);
        });
    }
);

module.exports = router;
