/**
 * Created by dokmatik on 08.06.2015.
 */
var Client = require('node-rest-client').Client;

module.exports.TweetsService = function () {
    var twitterClient = new Client();

    twitterClient.registerMethod('search', 'https://api.twitter.com/1.1/search/${action}', 'GET');

    this.search = function (opts, callback) {
        console.log('Will query Twitter now.');
        console.log('Query: ' + opts.query);
        console.log('Bearer token:' + opts.access_token);

        var args = {
            path: {'action': 'tweets.json'},
            parameters: {
                'q': opts.query,
                count: 10,
                randomParam: Math.random() * 1000
            },
            headers: {Authorization: 'Bearer ' + opts.access_token}
        }
        twitterClient.methods.search(args, function (data, response) {
            console.log(data);
            callback(data);
        })
    }
    return this;
}