var calcApp = angular.module('calcApp', []);

calcApp.controller('mainController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout) {

	$scope.display		= {};
	$scope.memory 		= {};
	$scope.firstOperand = 0;
	$scope.secondOperand = 0;
	$scope.operator		= 0;

	$scope.display.init = function(){
		this.value = "0";
	};
	

	$scope.memory.init = function(){
		this.value = 0;
		console.log("Memory init, value =", this.value);
	};
	$scope.memory.clear =  function(){
			this.init();
			console.log("Memory cleared");
	};
	$scope.memory.add =  function(){
		this.value += parseFloat($scope.display.value);
		console.log("Memory add called, value = ", this.value);
	};
	$scope.memory.sub =  function(){
		this.value -= parseFloat($scope.display.value);
		console.log("Memory sub called, value = ", this.value);
	};
	$scope.memory.recall =  function(){
		$scope.display.value = this.value.toString();
	};

	$scope.display.addToDisplay = function(x){
		if (this.value === "0" || 
			this.value  === "Infinity" || 
			isNaN(this.value) )  {
			this.value = x.toString();
		} else {
			this.value = this.value + x.toString();
		}
	};
	$scope.display.negative = function(){
		$scope.display.value = (-1 * parseFloat($scope.display.value)).toString();
	};
	$scope.display.insertPeriod = function(){
		if (this.value.indexOf('.') == -1) {
			this.value = this.value + '.';
		}
	};

	$scope.display.addOperator = function(opId){

		switch(opId){
			case 1:
				$scope.operator		= 1; // division
				break;
			case 2:
				$scope.operator		= 2; // multiplication
				break;
			case 3:
				$scope.operator		= 3; // subtraction
				break;
			case 4:
				$scope.operator		= 4; // addition
				break;
			default:
				console.log("Unrecognized operator");
		}
		$scope.firstOperand = parseFloat($scope.display.value);
		$scope.display.value = "0";
		console.log("addOperator called, operator:", $scope.operator);

	};

	$scope.display.performOperation = function(){
		$scope.secondOperand = parseFloat($scope.display.value);

		switch($scope.operator){

			case 1:
				$scope.display.value = 	($scope.firstOperand / $scope.secondOperand).toString(); // division
				break;
			case 2:
				$scope.display.value = 	($scope.firstOperand * $scope.secondOperand).toString(); // multiplication
				break;
			case 3:
				$scope.display.value = 	($scope.firstOperand - $scope.secondOperand).toString(); // subtraction
				break;
			case 4:
				$scope.display.value = 	($scope.firstOperand + $scope.secondOperand).toString(); // addition
				break;
			default:
				console.log("Unrecognized operator");
			}

			if ($scope.display.value === 'Infinity') {
				$timeout( function(){ $scope.resetAll(); }, 1500);
			}

	};

   $scope.resetAll = function() {
   		$scope.display.init();
		$scope.operator = 0;
		$scope.firstOperand = 0;
		$scope.secondOperand = 0;
	};


	$scope.memory.init();
	$scope.display.init();

	
    
}]);