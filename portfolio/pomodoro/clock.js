(function(){

	var app= angular.module('app', []);

	// Time Controller
	app.controller('TimeCtrl', function($scope, $interval) {

		$scope.workTime = 25;
		$scope.breakTime = 5;

		$scope.workInProgress = true;
		$scope.clockIsRunning = false;

		$scope.clock = $scope.workTime * 60 * 1000;

		var tick = function() {
			if ($scope.clockIsRunning) {
				$scope.clock -= 1000;
				if ($scope.clock <= 1000) {
					playSound('sound1');
					$scope.toggleMode();
				}
				console.log("Work time: ", $scope.workTime,
					"Break Time: ", $scope.breakTime,
					"Seconds remaining: ", $scope.clock/1000);
			}
		};

		tick();
		$interval(tick, 1000);

		$scope.toggleMode = function() {
			$scope.workInProgress = !$scope.workInProgress;
			if  ($scope.workInProgress) {
				$scope.clock = $scope.workTime * 60 * 1000;
			} else {
				$scope.clock = $scope.breakTime * 60 * 1000;
			}
		};

		$scope.toggleClock = function() {
			$scope.clockIsRunning = !$scope.clockIsRunning;
		};

		$scope.adjustTime = function(x){
			$scope.clock += x * 60 * 1000;
			if ($scope.workInProgress){
				$scope.workTime += x;
			} else {
				$scope.breakTime += x;
			}
		};

	});

})();

function playSound(soundobj) {
  var thissound = document[soundobj];
  thissound.Play();
}

