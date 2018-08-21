

angular.module('ResturantAdmin.services',[])
.factory('Resturants', function() {
    	var getResturants = new Firebase("https://foodies-9c0ad.firebaseio.com/Restaurants");
	    function _getResturants(){
            return new Promise(function _getResturants(resolve, reject){
                
		
                getResturants.on("value", function( data ) {
                   // console.log(data.val());
                    resolve(data.val());
                })
            })
        }
		return { 
            getResturants : _getResturants
        } 	
	});