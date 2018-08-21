'use strict';

angular.module('ResturantAdmin')
.controller("UpdateRestaurantCtrl", function($scope, Resturants, $window, $timeout, $location, $rootScope, $firebaseArray) {
	$scope.resturant = {
        coverUrl : '',
        name : '',
        address : '',
        category : '',
        lat : '',
        lng : '',
        foodtype : '',
        phone : '',
        delivery : '', 
    };
    
    $scope.restname = localStorage.getItem( 'RestName' ).toUpperCase();
    
    var restId = localStorage.getItem( 'RestId');
    var resturants = new Firebase('https://foodies-9c0ad.firebaseio.com/Restaurants/'+ restId +'/name/');
    var resturantAll = new Firebase('https://foodies-9c0ad.firebaseio.com/Restaurants/');
    var restFields = $firebaseArray(resturantAll);
    restFields.$loaded().then(function ( data ) {
            for( var i = 0 ; i < data.length ; i++ ){
                if( data[i].$id == restId ){
                   
                    $scope.resturant = {
                        coverUrl : data[i].name.image,
                        name : data[i].name.restaurant_name,
                        address : data[i].name.address,
                        category : data[i].name.restaurant_category,
                        lat : data[i].name.restaurant_latitude,
                        lng : data[i].name.restaurant_longitude,
                        foodtype : data[i].name.typeOffood,
                        phone : data[i].name.restaurant_phone,
                        delivery : data[i].name.DelTime 
                    };
                    
                }        
            }
            
            console.log(data)
            
        });
    
    $scope.update = function () {
        if( $scope.resturant.coverUrl 
            && $scope.resturant.name
            && $scope.resturant.address
            //&& $scope.resturant.category
            && $scope.resturant.lat
            && $scope.resturant.lng
            && $scope.resturant.foodtype
            && $scope.resturant.phone
            && $scope.resturant.delivery
            ){
            resturants.update({
                image : $scope.resturant.coverUrl,
                restaurant_name : $scope.resturant.name,
                address : $scope.resturant.address,
                //restaurant_category : $scope.resturant.category,
                restaurant_latitude : $scope.resturant.lat,
                restaurant_longitude : $scope.resturant.lng,
                typeOffood : $scope.resturant.foodtype,
                restaurant_phone : $scope.resturant.phone,
                DelTime : $scope.resturant.delivery,
            })
            
            alert("Restaurant Updated");
        } else {
            alert( "Fill the required field" );
        }
    }
    $scope.upload = function ( fileObj ) {
       
        console.log( fileObj );   
        var selectFile = fileObj;
    
        var fileName = selectFile.name;
        var storageRef = firebase.storage().ref('/RestaurantsCover/' + fileName );
        var uploadTask = storageRef.put(selectFile.file)
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', function (snapshot) {
            
        }, function ( err ) {
            
        }, function() {
            $scope.resturant.coverUrl = uploadTask.snapshot.a.downloadURLs[0];
           
         });
     }	 	
});