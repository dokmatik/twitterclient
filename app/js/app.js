'use strict';


// Declare app level module which depends on filters, and services
var dashBoardApp = angular.module('InfoDashboard', ['InfoDashboard.filters', 'InfoDashboard.services', 'InfoDashboard.directives','ngResource',]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: SearchController});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);


