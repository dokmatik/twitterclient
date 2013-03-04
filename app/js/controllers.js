//'use strict';

/* Controllers */

var dashBoardApp = angular.module('InfoDashboard')

dashBoardApp.directive('fadein', function () {
    return {
        restrict : 'A',
        link : function (scope, elm, attrs) {
            elm.css("display", "none");
            if (scope.$last) {
                jQuery("ol>.fullTweet:eq(0)").show("slow", function () {
                    jQuery(this).next(".fullTweet").fadeIn(parseInt(attrs.fadein), arguments.callee)
                });
            }
        }
    };
})

dashBoardApp.factory('mySharedService', function($rootScope) {
    return {
        broadcast: function(msg) {
            $rootScope.$broadcast('handleBroadcast', msg); 
        },
		reset : function(msg) {
			$rootScope.$broadcast('reset');
		}
    };
});

var twitterClient = {
    url:"http://search.twitter.com/search.json?callback=?",
    url_nocallback:"http://search.twitter.com/search.json"
}

function SearchController($scope, sharedService) {
    $scope.doSearch = function () {
		sharedService.reset();
       sharedService.broadcast($scope.searchQuery)
    }
}
SearchController.$inject=['$scope','mySharedService']

function MyCtrl1($scope, $http, $resource, $timeout, sharedService, twitter) {
    $scope.tweets = {}

	$scope.$on('handleBroadcast',function(event, msg) {
		$scope.tweets = twitter.get({q:msg});
	});
	
    $scope.previousTweets = function () {
        if (this.tweets.previous_page) {
            $scope.tweets = twitter.paginate({page : parseInt($scope.tweets.page)-1, q: $scope.searchQuery})
        }
    }
    $scope.nextTweets = function () {
        if (this.tweets.next_page) {
            $scope.tweets = twitter.paginate({page : parseInt($scope.tweets.page)+1, q: $scope.searchQuery})
        }
    }
}
MyCtrl1.$inject = ['$scope','$http','$resource','$timeout','mySharedService','twitter'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function BooksController($scope, $http, $resource, $timeout, sharedService, googleBooks) {
	$scope.books = {};
	$scope.startIndex=0;

	$scope.$on('handleBroadcast', function(event, msg) {
		$scope.books = googleBooks.volumes({q : msg, startIndex : $scope.startIndex*10}, function(data) {
			$scope.fills = [];
			$scope.fills.length=10-data.items.length
		});
	});
	$scope.$on('reset', function(event) {
		$scope.startIndex=0;
	})
	
	$scope.previous=function() {
		$scope.startIndex--;
		$scope.$broadcast('handleBroadcast', $scope.$parent.searchQuery);
	}
	$scope.next=function() {
		$scope.startIndex++;
		$scope.$broadcast('handleBroadcast', $scope.$parent.searchQuery);
	}
	
}
BooksController.$inject = ['$scope','$http','$resource','$timeout','mySharedService', 'googleBooks'];