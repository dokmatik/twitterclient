'use strict';

/* Services */

(function () {
// Demonstrate how to register services
// In this case it is a simple value service.
    var serviceModule = angular.module('InfoDashboard.services', ['ngResource'])
    serviceModule.
        value('version', '0.1')
        .factory('googleBooks', function ($resource) {
            var r = $resource('https://www.googleapis.com/books/v1/:action',
                {
                    callback: 'JSON_CALLBACK', key: 'AIzaSyBlNmAvu1FM8JJMWfQDMOUITebm75UG-H8', startIndex: 0
                },
                {
                    get: {method: 'JSONP'},
                    volumes: {method: 'JSONP', params: {action: 'volumes'}}
                }
            );

            return r;
        })
        .factory('twitter', function ($resource, $http) {
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

            var consumerKey = encodeURIComponent('Z2Z6EqGssfsbpoacajU7Q')
            var consumerSecret = encodeURIComponent('Lm3VVmY0cj0gPBJa7qZO1VUVIUkm7fRU85hmvkI5oI')
            var credentials = Base64.encode(consumerKey + ':' + consumerSecret)

            var twitterOauthEndpoint = $http.post(
                'https://api.twitter.com/oauth2/token'
                , "grant_type=client_credentials"
                , {headers: {'Authorization': 'Basic ' + credentials, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            )
            twitterOauthEndpoint.success(function (response) {
                console.log(response.access_token)
                serviceModule.$httpProvider.defaults.headers.common['Authorization'] = "Bearer " + response.access_token
            }).error(function (response) {
                    console.log(response)
                })

            var r = $resource('https://api.twitter.com/1.1/search/:action',
                {action: 'tweets.json',
                    //callback:'JSON_CALLBACK',
                    count: 10,
                    randomParam: Math.random() * 1000}, {
                    get: {method: 'GET'},
                    paginate: {method: 'GET'}
                })

            return r;
        }
    )
        .factory('storageService', function () {
            function StorageService() {
            }

            StorageService.prototype.get = function (key) {
                return localStorage.getObj(key)
            }
            StorageService.prototype.set =
                function (key, obj) {
                    localStorage.setObj(key, obj)
                }

            StorageService.prototype.update = function (key, newVal) {
                var searches = localStorage.getObj(key);
                if (!searches) {
                    searches = [];
                }
                var searchEntry = {'val': newVal, "date": new Date()};
                var updates = 0;
                var searches = searches.map(function (se) {
                    if (se.val == searchEntry.val) {
                        updates++;
                        return {'val': searchEntry.val, "date": new Date()};
                    }
                    return se;
                });
                if (searchEntry.val && updates == 0) {
                    searches.push(searchEntry);
                }
                this.set(key, searches);
            }

            StorageService.prototype.remove = function (key, currentVal) {
                var elements = localStorage.getObj(key);
                elements.splice(elements.indexOf(currentVal), 1);
                this.set(key, elements);
            }

            return new StorageService();
        })
        .config(function ($httpProvider) {
            serviceModule.$httpProvider = $httpProvider
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        });
})()
