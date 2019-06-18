 var placeholderImageUrl = "https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png";
var fccUrl = "https://www.freecodecamp.com/news/hot";

$(document).ready(function() {
	getNews();
});

function getNews() {
  gettingData = true;
  var requestString = fccUrl;
  request = new XMLHttpRequest();
  request.onload = proccessResults;
  request.open("get", requestString, true);
  request.send();
}

var proccessResults = function() {
  var results = JSON.parse(this.responseText);
  if (results) {
    //console.log(results);
    showResults(results);
    }
};

function showResults(results){
	var formattedHTML = "";

	for (var i = 0; i < results.length; i++) {
    var headline = results[i].headline;
    if (headline.length > 25) {headline = headline.slice(0,22) + "...";}
    var date = new Date(results[i].timePosted);

		formattedHTML += "<div class='col-md-3 text-center'><div class='news_block'>";
    formattedHTML += "<div><img class='thumb' src='" + results[i].author.picture + "'></div>";
    formattedHTML += "<div class='text_block'>";
    formattedHTML += "<div><a href='" + results[i].link + "'>" + headline + "</a></div>";
    formattedHTML += "<div>by - <a href='https://www.freecodecamp.com/" + results[i].author.username + "'>" + results[i].author.username + "</a></div>";
    formattedHTML += "<div><i class='fa fa-heart'>&nbsp" + results[i].rank +  "</i><a href='http://www.freecodecamp.com/news/" + results[i].storyLink + "'><button class='myButton btn btn-primary btn-sm pull-right' >discuss</button></a></div>";
    formattedHTML += "<br><div id='date_posted'>Posted on: " + date.toLocaleDateString('en-US') + "</div>";

    formattedHTML += "</div></div></div>";

	}

	$("#news_feed").html(formattedHTML);
}


