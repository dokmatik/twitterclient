function parseUrl2(data) {
    var e=/((http|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+\.[^#?\s]+)(#[\w\-]+)?/;
    if (data.match(e)) {
        return  {url: RegExp['$&'],
                protocol: RegExp.$2,
                host:RegExp.$3,
                path:RegExp.$4,
                file:RegExp.$6,
                hash:RegExp.$7};
    }
    else {
        return  {url:"", protocol:"",host:"",path:"",file:"",hash:""};
    }
}
	
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

 twitterClient = {
	  url : "http://search.twitter.com/search.json?callback=?",
	  url_nocallback : "http://search.twitter.com/search.json"
 }
TwitterResult = function(data) {
	$("#resultsOrder").empty();//.hide();	
	
	var tweetHTML = Mustache.render($('#mustache_tweetTemplate').html(), data);
	$('#resultsOrder').html(tweetHTML);
	
	$(".tweedText").each(function(index) {
		var origText = $(this).html();
		$(this).html(urlify(origText));
	});
	$("#resultsOrder").focus();//.fadeIn(2000);
	
	// #nextTweets and #previousTweets
	$("#nextTweets").unbind();
	if(data.next_page) {
		$("#nextTweets").click({nextPage : data.next_page}, nextHandler);		
	} else {
		$("#nextTweets").click(function() {return false;});		
	}
	$("#nextTweets").toggleClass("active", data.next_page != null);
	$("#nextTweets").attr("title", data.next_page != null ? "Click to see next tweets" : "Reached end of tweets.");
	$("#previousTweets").unbind();	
	if (data.previous_page) {
		$("#previousTweets").click({nextPage : data.previous_page}, nextHandler);		
	} else {
		$("#previousTweets").click(function() {return false;});		
	}
	$("#previousTweets").toggleClass("active", data.previous_page != null);
	$("#previousTweets").attr("title", data.previous_page != null ? "Click to see previous tweets" : "Reached beginning of tweets.");
	
	$(".fullTweet:eq(0)").show("slow", function() {
	$(this).next(".fullTweet").fadeIn("50",arguments.callee)
	});
}
searchHandler = function() {
	$.getJSON(twitterClient.url, 
			  {
		  		q:$("#searchInput").val(),
		  		rpp: 10,
		  		randomParam : Math.random() * 1000
		  	}, 
		  	TwitterResult
		).error(function(ajaxEvent) 
				{
			alert('Failed')
		});
	
	/*$.ajax({
			global : true,
			url: twitterClient.url_nocallback,
			data:"q="+$("#searchInput").val()+"&rpp=1500",
			dataType : "json"
	}			
	).success(TwitterResult).error(function(ajaxEvent) 
			{
		alert('Failed')
	});*/
	
	 
};
nextHandler = function(event) {
	  $.getJSON(twitterClient.url+event.data.nextPage.replace("?",'&'), 
			  {
		  	}, 
		  	TwitterResult
		);
};

var updateSearchHistoryHandler = function(event) {
	
	var searches = localStorage.getObj('searches');
	if (!searches)
		searches = [];
	var searchEntry ={'searchString' : $('#searchInput').val(), "date" : new Date()};
	var updates = 0;
	var searches = searches.map(function(se) {
		if (se.searchString == searchEntry.searchString) {
			updates++;
			return {'searchString' : searchEntry.searchString, "date" : new Date()};
		}
		return se;
		});
	if (searchEntry.searchString && updates == 0) {
		searches.push(searchEntry);	
	}
	localStorage.setObj('searches',searches);
	var e = jQuery.Event("updateSearchHistory");
	$("[onSearch]").trigger(e);

}
var showSearchHistory = function() {
	var searches = localStorage.getObj('searches');
	if (!searches)
		searches = [];
	$(this).children("ul").empty();
	searches = searches.sort(function(se1, se2) {
		return se1.date < se2.date ? 1 :
			(se1.date > se2.date ? -1 : 0);
	});
	var searchHistoryHTML = Mustache.render($('#mustache_searchHistoryTemplate').html(), {'results': searches});
	$(this).children("ul").html(searchHistoryHTML);
	$(".searchHistory").click(function (e) {
		$("#searchInput").val(e.target.innerText);
		$("button").trigger("click");
	});
}

// need to set global=true for JSONP requests
jQuery.ajaxPrefilter(function( options ) {
    options.global = true;
});
$(document).ready(function() {
	$("#progressIndicator").ajaxStart(function() {
		$(this).show();	
	});
	$("#progressIndicator").ajaxStop(function() {
		$(this).hide();	
	});
	$("button").button().click(updateSearchHistoryHandler).click(searchHandler);
	
	// extend Storage object to handle JSON object properly
	Storage.prototype.setObj = function(key, obj) {
		return this.setItem(key, JSON.stringify(obj))
	}
	Storage.prototype.getObj = function(key) {
		return JSON.parse(this.getItem(key))
	}
	$('[onSearch]').on("updateSearchHistory",showSearchHistory);
	$("[onSearch]").trigger("updateSearchHistory");
});