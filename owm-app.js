angular.module('OWMApp',['ngRoute','ngAnimate'])
.value('owmCities',['New York', 'Dallas', 'Boston'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/',{
      templateUrl : 'home.html',
      controller : 'HomeCtrl',
      controllerAs:'vm'
    })
    .when('/cities/:city', {
              templateUrl : 'city.html',
              controller : 'CityCtrl',
              controllerAs: 'vm',
              resolve : {
                  city: function(owmCities, $route, $location) {
                      var city = $route.current.params.city;
                      if(owmCities.indexOf(city) == -1 ) {
                          $location.path('/error');
                          return;
                      }
                      return city;
                  }
              }
          })
          .when('/error', {
  		      template : '<p>Error Page Not Found</p>'
  		    })
  		    .otherwise('/error');

  }])

.run(function($rootScope, $location, $timeout){
  $rootScope.$on('$routeChangeError', function(){
    $location.path("/error");
  });
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.isLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(){
    $timeout(function(){
      $rootScope.isLoading = false;
    }, 500);
  });
})







  .controller('HomeCtrl', [function(){
    console.log('Skipppy');
  }])
  .controller('CityCtrl', ['city', function(city) {
     var vm = this;
     vm.city = city;
   }]);
