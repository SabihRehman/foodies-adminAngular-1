'use strict';

/**
 * @ngdoc overview
 * @name angularsetupApp
 * @description
 * # angularsetupApp
 *
 * Main module of the application.
 */
angular
  .module('ResturantAdmin', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ResturantAdmin.services',
    'firebase',
    'ui.router',
    'flow'
  ])
  .run(function ($rootScope, $route, $location, $state) {
    $rootScope.$route = $route;
    
    console.log($location.$$path );
    // $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    //   if ($rootScope.loggedInUser == null) {
    //     // no logged user, redirect to /login
    //     if ( next.templateUrl === "views/login.html") {
    //     } else {
    //       $location.path("/login");
    //     }
    //   }
    // });
    
    
     $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.url;
		  if($rootScope.authStatus){
			  
			
		  }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log("URL : "+toState.url);
      
      if(toState.url=='/login'){
        console.log("match : "+toState.url);
       // $state.go('app.login');
       // $rootScope.$apply()
        $location.path('/app/login');
        
        
        // $timeout(function(){
        //   angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
        // },1000);
      }	else if(toState.url=='/add'){
        console.log("match : "+toState.url);
       // $state.go('app.login');
       // $rootScope.$apply()
        $location.path('/app/add');
        
        
        // $timeout(function(){
        //   angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
        // },1000);
      }	else if(toState.url=='/list'){
        console.log("match : "+toState.url);
       // $state.go('app.login');
       // $rootScope.$apply()
        $location.path('/app/list');
        
        
        // $timeout(function(){
        //   angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
        // },1000);
      }	
    });
    })
  .config(function ($routeProvider,  $locationProvider, $stateProvider, $urlRouterProvider,flowFactoryProvider) {
    
    
    // flowFactoryProvider.defaults = {
    //     target: '/upload',
    //     permanentErrors:[404, 500, 501]
    // };
    // // You can also set default events:
    // flowFactoryProvider.on('catchAll', function (event) {
    // //alert(event);
    // });
    
   $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        //reloadOnSearch: false
      })
      
       .state('app.login', {
        url: '/login',
        views: {
          'menu-content': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
          }
        },
      authStatus: false
      })
      .state('app.add', {
          url: '/add',
          views: {
          'menu-content': {
          templateUrl: 'views/add.html',
          controller: 'AddCtrl'
          }
          }
      })


      .state('app.list', {
          url: '/list',
          views: {
          'menu-content': {
          templateUrl: 'views/list.html',
          controller: 'ListCtrl'
          }
          }
      })
      
      .state('app.addMenu', {
          url: '/addMenu',
          views: {
          'menu-content': {
          templateUrl: 'views/addMenu.html',
          controller: 'AddMenuCtrl'
          }
          }
      })
      .state('app.addDeals', {
          url: '/addDeals',
          views: {
          'menu-content': {
          templateUrl: 'views/addDeals.html',
          controller: 'AddDealsCtrl'
          }
          }
      })
      .state('app.updateRestaurant', {
          url: '/updateRestaurant',
          views: {
          'menu-content': {
          templateUrl: 'views/updateRestaurant.html',
          controller: 'UpdateRestaurantCtrl'
          }
          }
      })
      .state('app.uploadPhoto', {
          url: '/uploadPhoto',
          views: {
          'menu-content': {
          templateUrl: 'views/uploadPhoto.html',
          controller: 'UploadPhotoCtrl'
          }
          }
      })
      .state('app.viewOrders', {
          url: '/viewOrders',
          views: {
          'menu-content': {
          templateUrl: 'views/viewOrders.html',
          controller: 'ViewOrdersCtrl'
          }
          }
      })

      $urlRouterProvider.otherwise('/app/login');



    
    // $routeProvider
    //     .when('/app', {
    //       templateUrl: 'views/menu.html',
    //      // controller: 'LoginCtrl',
    //     })
    //    .when('/login', {
    //     templateUrl: 'views/login.html',
    //     controller: 'LoginCtrl',
    //   })
    //   .when('/menu.add', {
    //     templateUrl: 'views/add.html',
    //     controller: 'AddCtrl',
    //     activetab: "add"
    //   })
    //   .when('/menu.list', {
    //     templateUrl: 'views/list.html',
    //     controller: 'ListCtrl',
    //     activetab: "list"
    //   })
    //   .otherwise({
    //     redirectTo: '/login'
    //   });
      
      //$locationProvider.html5Mode(true);
  })
  
