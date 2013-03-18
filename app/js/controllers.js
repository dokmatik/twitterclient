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
}).factory('myConfigurationService', function($rootScope) {
	return {
		newConfig : function(initialConfig) {
			initialConfig.toggle = function(key) {
				this[key] = !this[key];
			}
			return initialConfig
		}
	}
});

/*dashBoardApp.run(function($rootScope) {
	$rootScope.toggleDisplay=function() { 
		this.config.display = !this.config.display
	};
}
)*/

var twitterClient = {
    url:"http://search.twitter.com/search.json?callback=?",
    url_nocallback:"http://search.twitter.com/search.json"
}

function SearchController($scope, sharedService, storageService) {
	$scope.searchQuery='richfaces'
	$scope.latestSearches = storageService.get('searches')

    $scope.doSearch = function () {
		sharedService.reset();
       sharedService.broadcast($scope.searchQuery)
    }
	$scope.reSearch = function(val) {
		$scope.searchQuery = val;
		this.doSearch();		
	}
	$scope.remove = function(historyElement) {
		storageService.remove('searches',historyElement)
		$scope.latestSearches = storageService.get('searches')
	}
	
	$scope.$on('handleBroadcast',function(event, msg) {
		storageService.update('searches',msg);
		$scope.latestSearches = storageService.get('searches')
	})
}
SearchController.$inject=['$scope','mySharedService','storageService']

function MyCtrl1($scope, $http, $resource, $timeout, sharedService, twitter, configurationService) {
    $scope.tweets = {}
	$scope.config = configurationService.newConfig({display : true});
	
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
	$scope.toggle=function(id) {
		
	}
}
MyCtrl1.$inject = ['$scope','$http','$resource','$timeout','mySharedService','twitter', 'myConfigurationService'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function BooksController($scope, $http, $resource, $timeout, sharedService, googleBooks, configurationService) {
	$scope.books = {};
	$scope.startIndex=0;
	$scope.config = configurationService.newConfig({display : true});
	
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
	
	$scope.pageable=function() {
		return {
			backwards : $scope.books.items && $scope.books.items.length > 0,
			forward : $scope.books.items && $scope.books.items.length > 0
		}
	}
	$scope.backwards=function() {
			return $scope.books.items && $scope.books.items.length > 0
	}	
}
BooksController.$inject = ['$scope','$http','$resource','$timeout','mySharedService', 'googleBooks',  'myConfigurationService'];