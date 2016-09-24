(function(angular) {
  'use strict';
var myApp = angular.module('spicyApp2', []);

myApp.controller('SpicyController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {

    // Get data
    $http.get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=30092&apikey=f7de381a2c9040249a24a93ce8b88c67").then(
      function(result) {
        console.log(result);
        $scope.representatives = [];
        for (var i = 0; i < result.data.results.length; i++) {
          console.log(result.data.results[i].first_name);
          $scope.representatives.push(result.data.results[i]);
        }
      });

    // Angular controller working
    $scope.customSpice = 'wasabi';
    $scope.spice = 'very';

    $scope.spicy = function(spice) {
        $scope.spice = spice;
    };
  }])
})(window.angular);
