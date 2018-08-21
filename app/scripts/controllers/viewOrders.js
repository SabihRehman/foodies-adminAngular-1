'use strict';

angular.module('ResturantAdmin')
.controller("ViewOrdersCtrl", function($scope, $window, $firebaseArray, $timeout, $location, $rootScope) {
		
        var Users = new Firebase("https://foodies-9c0ad.firebaseio.com/Users");
        var OrderFoods = new Firebase("https://foodies-9c0ad.firebaseio.com/OrderFood");
        var Resturants = new Firebase("https://foodies-9c0ad.firebaseio.com/Restaurants");
		var NewEntity = new Firebase("https://foodies-9c0ad.firebaseio.com/");
		
        var userArray = $firebaseArray(Users);
        var userOrders = $firebaseArray(OrderFoods);
        var resturants = $firebaseArray(Resturants);
        $scope.restId = localStorage.getItem('RestId');
        var restPhoto = "https://firebasestorage.googleapis.com/v0/b/foodies-9c0ad.appspot.com/o/restaurant.jpg?alt=media&token=9b3bf7fa-20e5-4b1f-aae9-a9295bda6f53";
        
        $scope.restname = localStorage.getItem( 'RestName' ).toUpperCase();
        userOrders.$loaded().then(function ( data ) {
            $scope.orderList =  data;
            
        });
        
        resturants.$loaded().then(function ( data ) {
            
            for( var i = 0 ; i < data.length ; i++ ){
                if(data[i].$id == $scope.restId){
                   
                    restPhoto =  data[i].name.image;
                }        
            }
            
        });
        
		$scope.reload = function() {
			Users.on("value", function( data ) {
				$scope.userList =  data.val();
			})
        }
     
     $scope.orderView = function ( orderId ) {
         userOrders.$loaded().then(function ( data ) {
            //
            for( var i = 0 ; i < data.length ; i++ ){
                if(data[i].oResturantID == $scope.restId && orderId == data[i].$id){
                    $scope.finalOrder =  data[i].Orders;
                    
                }        
            }
        });
     }   	 
     
     $scope.confirmOrder = function(id, custId, name) {
         // UPDATE In orders ORDER CONFIRM true / false
         console.log(id);
         var child = NewEntity.child("Notifications");
        var updateOrder = new Firebase('https://foodies-9c0ad.firebaseio.com/OrderFood/'+ id );
          updateOrder.update(
            {
                ConfirmStatus: 'Confirm'
            })
         // PUSH NEW NOTIFICATION
         child.push({
             OrderId : id,
             UserId : custId,
             RestId : $scope.restId,
             RestName : name,
             Message : "Your order is confirmed, will be deliever in 45 mins",
             Photo: restPhoto
         })
         //CANCEL ORDER MEANS UPDATE CONFIRMSTATUS
     }	
     
     $scope.cancelOrder = function(id, custId, name) {
         // UPDATE In orders ORDER CONFIRM true / false
         console.log(id);
         var child = NewEntity.child("Notifications");
        var updateOrder = new Firebase('https://foodies-9c0ad.firebaseio.com/OrderFood/'+ id );
          updateOrder.update(
            {
                ConfirmStatus: "Canceled"
            })
         // PUSH NEW NOTIFICATION
         
         child.push({
             OrderId : id,
             UserId : custId,
             RestId : $scope.restId,
             RestName : name,
             Message : "Order cancel due to voluntary closeout "
         })
         //CANCEL ORDER MEANS UPDATE CONFIRMSTATUS
     }	
});