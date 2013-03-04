'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('InfoDashboard.services', ['ngResource']).
  value('version', '0.1')
  .factory('googleBooks', function($resource) {
	var r = $resource('https://www.googleapis.com/books/v1/:action',
	{	
		callback:'JSON_CALLBACK'
		, key : 'AIzaSyBlNmAvu1FM8JJMWfQDMOUITebm75UG-H8'
		, startIndex : 0
	}, 
	{	
		get : {method : 'JSONP'},
		volumes : {method:'JSONP', params : {action :'volumes'}}
    }
	 );
	
	return r;
  })
  .factory('twitter',function($resource) {
	  var r = $resource('http://search.twitter.com/:action',
			{action:'search.json',
				callback:'JSON_CALLBACK',
				rpp:10,
				randomParam:Math.random() * 1000}, {
				get : {method : 'JSONP'},
				paginate: {method : 'JSONP', params : { page : '@page'}}
			})
			
		return r;
  }
  );
