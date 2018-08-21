'use strict';

angular.module('ResturantAdmin')
.controller("LoginCtrl", function($scope, Resturants, $window, $timeout, $location, $rootScope, $state, $firebaseArray) {
		
		// console.log(Resturants.getResturants());
		// $scope.restList = Resturants.getResturants();
		var Resturants = new Firebase("https://foodies-9c0ad.firebaseio.com/Restaurants");

        $scope.user = {
            email : "",
            password : ""
        }
		
		
        
	    $scope.signIn = function() {
        	var restArray = $firebaseArray(Resturants);
            firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
            .then(function(success) {
                
                var restId = null;
				var restName = null;
				$rootScope.loggedInUser = $scope.user.email;
				$scope.userId = success.uid;
			
				
				restArray.$loaded().then(function ( data ) {
					for(var i = 0; i < data.length ; i++){
						if(data[i].name.userId == $scope.userId){
							restId = data[i].$id;
							restName = data[i].name.restaurant_name;
							localStorage.setItem( 'UserId', $scope.userId );
							localStorage.setItem( 'RestId', restId );
							localStorage.setItem( 'RestName', restName );
							$scope.menu = true;
							$state.go('app.viewOrders');
							$location.path('/app/viewOrders');
							$scope.$apply()
						} else if( $rootScope.loggedInUser == 'admin@gmail.com' ){
								localStorage.setItem( 'UserId', $scope.userId );
								$state.go('app.add');
								$location.path('/app/add');
								$scope.$apply()
						}
						if( !localStorage.getItem( 'UserId')){
							alert("No Restaurant Found");
						}
					}
				});
				
				
				
				
				
				}).catch(function(error){
					console.log(error);
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode);
					console.log(errorMessage);
					alert(errorMessage);
			});
        }
	
	});