'use strict';

/* Controllers */

var dashBoardApp = angular.module('InfoDashboard')

dashBoardApp.directive('fadein', function () {
    return {
        restrict:'A',
        link:function (scope, elm, attrs) {
            /*jQuery(elm)
             .css({ opacity: 0 })
             .animate({ opacity: 1 }, parseInt(attrs.fadein));
             */
            elm.bind("click", function () {
                alert("yeah")
            })
            jQuery(elm).fadeIn(parseInt(attrs.fadein) + scope.$index * 250)
            /*
             jQuery(elm).next(".fullTweet").show("slow", function() {
             jQuery(this).next(".fullTweet").fadeIn("50",arguments.callee)
             });*/
        }
    };
})
var twitterClient = {
    url:"http://search.twitter.com/search.json?callback=?",
    url_nocallback:"http://search.twitter.com/search.json"
}


function MyCtrl1($scope, $http, $resource) {
    $scope.tweets = {}
    $scope.twitter = $resource('http://search.twitter.com/:action',
        {action:'search.json',
            callback:'JSON_CALLBACK',
            rpp:10,
            randomParam:Math.random() * 1000}, {
            get : {method : 'JSONP'}
        })

    $scope.doSearch = function () {
        $scope.tweets = $scope.twitter.get({q: $scope.searchQuery})
    }
    $scope.previousTweets = function () {
        if (this.tweets.previous_page) {
            $scope.tweets = $scope.twitter.get({page : parseInt($scope.tweets.page)-1, q: $scope.searchQuery})
        }
    }
    $scope.nextTweets = function () {
        if (this.tweets.next_page) {
            $scope.tweets = $scope.twitter.get({page : parseInt($scope.tweets.page)+1, q: $scope.searchQuery})
        }
    }
}
//MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
