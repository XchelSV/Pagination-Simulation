var app = angular.module('Pagination',["angular-uuid"]);

app.controller('indexController',function ($scope, uuid) {
	
	var arrayI = [];
	var i = 0;

	$scope.pages = [];
	$scope.childSelected;
	$scope.input_value

	$scope.pushPrincipalPage = function(){

		i++;
		arrayI.push(i);
		$scope.pages.push({'name': uuid.v4(), 'childPages':[] });

	}

	$scope.pushChildPages = function (dadPage){

		console.log($scope.pages);

		for (var j = 0; j < $scope.pages.length; j++) {
			if($scope.pages[j].name == dadPage){
				$scope.pages[j].childPages.push({'name': uuid.v4(), 'dadName':' '+$scope.pages[j].name ,'references':[] });
				break;
			}
		};

	}

	$scope.addReference = function(){

		$scope.childSelected.references.push($scope.input_value);
		$scope.input_value='';
	}


	$scope.modalAction = function (child){

		$('#modal1').openModal();
		$scope.childSelected = child;

	}

	$scope.input_search;
	$scope.search_p;
	$scope.searchProcess = function(){

	var bandera = true;

		for (var j = 0; j < $scope.pages.length; j++) {

			for (var k = 0; k < $scope.pages[j].childPages.length; k++) {

				for (var l = 0; l < $scope.pages[j].childPages[k].references.length; l++) {

					if ($scope.pages[j].childPages[k].references[l] == $scope.input_search){

						bandera = false;
						$scope.search_p = "El Proceso se encuentra en la tabla "+ $scope.pages[j].childPages[k].name + " de la tabla principal " + $scope.pages[j].name; 
						break;

					}
			
				};
			
			};
			
		};

		if (bandera) {
			$scope.search_p = " No se encontro el proceso";
		}

	}

})