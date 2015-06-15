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
            var r = $resource('/tweets',
                {
                    action: 'tweets.json',
                    //callback:'JSON_CALLBACK',
                    count: 10,
                    randomParam: Math.random() * 1000
                }, {
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
