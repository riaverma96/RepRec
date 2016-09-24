(function(angular) {
  'use strict';
var myApp = angular.module('spicyApp2', []);

myApp.controller('SpicyController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {
    $http.get("http://congress.api.sunlightfoundation.com/legislators/locate?zip=30092&apikey=f7de381a2c9040249a24a93ce8b88c67").then(
      function(result) {
        console.log(result);
        $scope.representatives = [];
        for (var i = 0; i < result.data.results.length; i++) {
          console.log(result.data.results[0].first_name);
          $scope.representatives = (result.data.results[i]);
          //document.write(result.data.results[i].first_name);
        }
      });
    // HTTP working
    /** $scope.method = 'GET';
    $scope.url = 'http-hello.html';

    $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;

      $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };

    $scope.updateModel = function(method, url) {
      $scope.method = method;
      $scope.url = url;
    };*/

    // Angular controller working
    $scope.customSpice = 'wasabi';
    $scope.spice = 'very';

    $scope.spicy = function(spice) {
        $scope.spice = spice;
    };
  }])
})(window.angular);
