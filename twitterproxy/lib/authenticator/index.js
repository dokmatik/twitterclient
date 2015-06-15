var request = require('request');

function Auth() {
    var access_token;
    var consumerKey = encodeURIComponent('Z2Z6EqGssfsbpoacajU7Q')
    var consumerSecret = encodeURIComponent('Lm3VVmY0cj0gPBJa7qZO1VUVIUkm7fRU85hmvkI5oI')
    var credentials = new Buffer(consumerKey + ':' + consumerSecret).toString('base64');
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

    function getAccessToken() {
        return access_token;
    }

    function setAccessToken(token) {
        access_token = token;
    }

    this.authenticate = function (ops, callback) {
        if (access_token) {
            console.log('Reusing token ' + access_token);
            callback(getAccessToken());
        } else {
            request.post(post_options, function (error, response, body) {
                    console.log(body);
                    setAccessToken(JSON.parse(body).access_token);
                    callback(getAccessToken());
                }
            )
        }

    }
}


module.exports.Authenticator = function () {
    return new Auth();
}
