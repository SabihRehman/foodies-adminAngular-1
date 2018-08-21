'use strict';

angular.module('ResturantAdmin')
.controller("ListCtrl", function($scope, Resturants, $window, $timeout) {
		
		// console.log(Resturants.getResturants());
		// $scope.restList = Resturants.getResturants();
		var Resturants = new Firebase("https://foodies-9c0ad.firebaseio.com/Restaurants");
		
		$scope.reload = function() {
			Resturants.on("value", function( data ) {
				$scope.restList =  data.val();
				//$scope.restId =  data.key();
			})
		}
		
		$scope.reload();
		
		// $scope.changeStatus = function ( id ) {
		// 	alert( id );
		// }
		
		$scope.remove = function(id) {
			//alert(id);
			console.log(id);
			// var updateUser = new Firebase("https://foodies-9c0ad.firebaseio.com/Users/" + $rootScope.curUser);
			// updateUser.update({
			// 	Status:'remove'
			// });
		}
	});