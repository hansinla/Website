var myApp = angular.module('wikiApp', []);

myApp.controller('mainController', ['$scope','$http', '$interval', '$window', function($scope, $http, $interval, $window) {

    $scope.searchStr = "";
    $scope.wikiResponse = [];


    //hack
    var c = $window.angular.callbacks.counter.toString(36);

	$window['angularcallbacks_' + c] = function (data) {
	    $window.angular.callbacks['_' + c](data);
	    delete $window['angularcallbacks_' + c];
	};
	// end hack
    
    $scope.getWikiData = function(keyEvent){
        if(keyEvent.which === 13) {
            $scope.getRequest($scope.searchStr, false);
        }
    };

    $scope.getRequest = function(str){
    	var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    	var callback = '&callback=JSON_CALLBACK';
    	var page = 'http://en.wikipedia.org/?curid=';
        $scope.wikiResponse = [];
        
    	//angular http request for wiki
    	$http.jsonp(url + str + callback).
	    	then(function(response) {
		    	// this callback will be called asynchronously
		    	// when the response is available
		    	console.log("Succes calling wiki search API");
		    	var results = response.data.query.pages;

		    	angular.forEach(results, function(v,k)  {
        			$scope.wikiResponse.push({headline: v.title, body: v.extract, page: page + v.pageid});
      			});
      			console.log($scope.wikiResponse);

	  		}, function(response) {
	    	// called asynchronously if an error occurs
	   		// or server returns response with an error status.
	   		//$interval.cancel(stop);
	  		});
	  	};

        $scope.getRandom = function(){
            console.log("Random article");
            var url = 'http://en.wikipedia.org//w/api.php?action=query&list=random&format=json&rnlimit=1';
            var callback = '&callback=JSON_CALLBACK';
            var page = 'http://en.wikipedia.org/?curid=';
            $scope.wikiResponse = [];

            $http.jsonp(url + callback).
            then(function(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("Succes calling wiki random API");
                var results = response.data.query.random;

                angular.forEach(results, function(v,k)  {
                    $scope.wikiResponse.push({headline: v.title, body: "link to page", page: page + v.id});
                });

            }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //$interval.cancel(stop);
            });
        };
    
}]);
