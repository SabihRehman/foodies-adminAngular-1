'use strict';

angular.module('ResturantAdmin')
.controller("AddMenuCtrl", function($scope, Resturants, $window, $timeout, $location, $rootScope, $firebaseArray) {
		
    // if(){
    //     $scope.menu = true;
    // }	 	
    //var storageRef = new Firbase('gs://foodies-9c0ad.appspot.com');
   
       
   
    var test;
    var restId = localStorage.getItem( 'RestId');
    var resturants = new Firebase('https://foodies-9c0ad.firebaseio.com/Restaurants/'+ restId +'/name/');
    var menuItem = resturants.child("MenuList");
    $scope.food = {
        price : '',
        name : '',
        description : '',
        type : '',
        imageUrl : ''
    }
    
    
    $scope.addMenu = function () {
        
        if( $scope.food.description && $scope.food.name && $scope.food.type && $scope.food.price && $scope.food.imageUrl ){
            menuList()
            .then(function ( menu ) {
                update( menu );
                alert("Menu added");
            })    
        } else if( !$scope.food.imageUrl ){
            alert("Upload image");
        } else {
            alert("Fill the fields");
        }
        
    }
    $scope.restname = localStorage.getItem( 'RestName' ).toUpperCase();
    function menuList() {
        return new Promise(function( resolve, reject) {
            resturants.on("value", function( menulist ) {
                    test = typeof menulist.val().MenuList == 'undefined' ? [] : menulist.val().MenuList;
                    console.log(typeof menulist.val().MenuList );
                    test.push({
                        foodDetails: $scope.food.description,
                        foodItem: $scope.food.name,
                        foodType:$scope.food.type,
                        price : $scope.food.price ,
                        image : $scope.food.imageUrl
                    });
                    resolve( test );
		    })
            $scope.food = {
                price : '',
                name : '',
                description : '',
                type : '',
            }
            
            
        })
    }
    
    function update(test) {
        menuItem.update( test )
    }
     $scope.upload = function ( fileObj ) {
       
        console.log( fileObj );   
        var selectFile = fileObj;
    
        var fileName = selectFile.name;
        var storageRef = firebase.storage().ref('/MenuImages/' + fileName );
        var uploadTask = storageRef.put(selectFile.file)
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', function (snapshot) {
            
        }, function ( err ) {
            
        }, function() {
            $scope.food.imageUrl = uploadTask.snapshot.a.downloadURLs[0];
           
         });
     }
    
});