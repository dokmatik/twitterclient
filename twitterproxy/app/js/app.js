'use strict';


// Declare app level module which depends on filters, and services
var dashBoardApp = angular.module('InfoDashboard', ['InfoDashboard.filters', 'InfoDashboard.services', 'InfoDashboard.directives', 'ngResource']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: SearchController});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .filter('urlify', function () {
        return function (text) {
            function urlify(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function (url) {
                    return '<a href="' + url + '" target="_blank">' + url + '</a>';
                })
                // or alternatively
                // return text.replace(urlRegex, '<a href="$1">$1</a>')
            }

            if (text)
                return urlify(text)
            else
                return ''
        }
    }
)
    .filter('tweetDate', function ($filter) {
        return function (dateObject, formatStr) {
            var today = new Date();
            var formatterParts = formatStr.split(' ')
            if (dateObject.toDateString() == today.toDateString()) {
                return "today " + $filter('date')(dateObject, formatterParts[1])
            } else {
                return $filter('date')(dateObject, formatStr)
            }
        }
    })
    .run(function () {
        // extend Storage object to handle JSON object properly
        Storage.prototype.setObj = function (key, obj) {
            return this.setItem(key, JSON.stringify(obj))
        }
        Storage.prototype.getObj = function (key) {
            return JSON.parse(this.getItem(key))
        }
    });


