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
	$("#tweetTemplate").tmpl(data.results).appendTo("#resultsOrder")
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
		  		rpp: 1500,
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
	$("button").button().click(searchHandler);

});
