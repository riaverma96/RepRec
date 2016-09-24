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


// setup dependency injection
angular.module('d3', []);
angular.module('d3App.controllers', []);
angular.module('d3App.directives', ['d3']);

// Tells Angular JS to compile the HTML with special markers that will
// let Angular JS change elements in the DOM dynamically.
// inject D3.js
angular.module('d3')
  .factory('d3',[function(){
    var d3;
    d3 = d3.v4.min.js  // paste in a version of d3.min.js here
    return d3;
}]);

// inject D3 into the Angular JS module
// Make your directive
angular.module('d3App.directives')
  .directive('d3Bars', ['d3', function(d3) {
    return {
      restrict: 'EA',
      scope: {
          data: "=",
          label: "@",
      },
      link: function(scope, iElement, iAttrs) {
          // create the svg to contain our visualization
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // make the visualization responsive by watching for changes in window size
          window.onresize = function() {
              return scope.$apply();
          };
          scope.$watch(function() {
              return angular.element(window)[0].innerWidth;
          }, function() {
              return scope.render(scope.data);
          });

          // watch the data source for changes to dynamically update the visualization
          scope.$watch('data', function(newData, oldData) {
              return scope.render(newData);
          }, true);

          scope.render = function(data) {
              // clear out everything in the svg to render a fresh version
              svg.selectAll("*").remove();

              // set up variables
              var width, height, max;
              width = d3.select(iElement[0])[0][0].offsetWidth;
              height = scope.data.length * 40;
              max = 100;
              svg.attr('height', height);

              // SVG rectangles for the bar chart
              svg.selectAll("rect")
                  .data(data)
                  .enter()
                  .append("rect")
                  // color for bars. set to random. It can be changed to other gradients or solid colors.
                  .style({
                      fill: rColor
                  })
                  // set initial dimensions of the bar
                  .attr("height", 30)
                  .attr("width", 0)
                  // position bar
                  .attr("x", 10)
                  .attr("y", function(d, i) {
                      return i * 35;
                  })
                  // set up transition animations
                  .transition()
                  .duration(1250)
                  // finally, set the width of the bar based on the datapoint
                  .attr("width", function(d) {
                      return d.score / (max / width);
                  });

              // add labels to the chart
              svg.selectAll("text")
                  .data(data)
                  .enter()
                  .append("text")
                  .attr("fill", "white")
                  // position labels over their bars
                  .attr("y", function(d, i) {
                      return i * 35 + 22;
                  })
                  .attr("x", 15)
                  // get the label text from the datapoint
                  .text(function(d) {
                      return d[scope.label];
                  });
          };
      }
  };
}]);
