'use strict';

angular.module('ResturantAdmin')
  .controller("AddCtrl", function($scope, $firebaseAuth) {
		$scope.user = {
			name : '',
			address : '',
			category : '',
			lat : '',
			lng : '',
			foodtype : '',
			phoneNo : '',
			rating : '1',
			rest_Id : '',
			email : '',
			password:''
    };
		$scope.restList;
		$scope.restLength;
		var getResturants = new Firebase("https://foodies-9c0ad.firebaseio.com");
		
		$scope.addResturant = function(){
			
			var child = getResturants.child("Restaurants");
			
 			if( $scope.user.rest_Id != '' && $scope.user.email != '' && $scope.user.password != '' && $scope.user.lng != '' && $scope.user.name != '' && $scope.user.lat != '' && $scope.user.category != '' && $scope.user.address != '' )
			{
				firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(success) {
						console.log(success);
						var auth = firebase.auth();
						var userPr = firebase.auth().currentUser;
						
						userPr.sendEmailVerification().then(function( res ) {
						
						//Email sent.
							child.push({
									name : {
										restaurant_name : $scope.user.name,
										restaurant_phone : $scope.user.phoneNo,
										restaurant_latitude : $scope.user.lat,
										restaurant_longitude : $scope.user.lng,
										typeOffood : $scope.user.foodtype,
										address : $scope.user.address,
										restaurant_id : $scope.user.rest_Id,
										DelTime : '50',
										rating : { rating : 1.5 },
										email : $scope.user.email,
										status : "pending",
										userId : userPr.uid,
										role : 'user',
										image : "https://firebasestorage.googleapis.com/v0/b/foodies-9c0ad.appspot.com/o/restaurant.jpg?alt=media&token=9b3bf7fa-20e5-4b1f-aae9-a9295bda6f53"
									}
							});

								
								$scope.user.name = "";
								$scope.user.email = "";
								$scope.user.password = "";
								$scope.user.phoneNo = "";
								$scope.user.lat = "";
								$scope.user.lng = "";
								$scope.user.foodtype = "";
								$scope.user.address = "";
								$scope.user.rest_Id = "";
								$scope.user.category = "";
								alert("We will send a verification code to your email");
						 	}, function(error) {
						 //		 An error happened.
						 		alert(error.message);
						 });
					}).catch(function(error) {
		
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorCode);
						alert(errorMessage);
						console.log(errorMessage);
						
						// ...
				});
										
					
					
					
			} else alert('Fill the form');
		}
		 	
	});
	
	
