'use strict';

angular.module('myApp.barlist', ['ngRoute'])

.config(['$routeProvider',  function($routeProvider) {
  $routeProvider.when('/barlist', {
    templateUrl: 'view1/view1.html',
    controller: 'barlistCtrl'
  });
}])

.controller('barlistCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {

    $scope.ratings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    $scope.minRating = '0';

    $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/bars').success(function(response){
        console.log(response);

        $scope.bars = response;
    });

    $scope.showDetail=function(id){
        $location.path("/barDetail/"+id);
    };

    $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/types').success(function(response){
        console.log(response);

        $scope.barTypes = response;
        $scope.barTypes.push({
            bar_type: ""
        })
    });

    $scope.selectedTypeChanged=function(){
        if($scope.selectedType != ""){
            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/barsbytype/'+$scope.selectedType.bar_type).success(function(response){
                console.log(response);
                $scope.bars = response;
            });
        }
        else{
            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/bars').success(function(response){
                console.log(response);

                $scope.bars = response;
            });
        }
    }
    $scope.selectedRatingChanged=function(){
        $

    }
    $scope.maxChanged=function(){
        $scope.selectedType = {};
        $scope.minRating = '0';
        $scope.minPrice = '';

        if($scope.maxPrice==''){
            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/bars').success(function(response){
                console.log(response);

                $scope.bars = response;
            });
        }
        else {

            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/maxprice/' + $scope.maxPrice).success(function (response) {
                console.log(response);
                $scope.bars = response;
            });
        }
    }
    $scope.minChanged=function(){
        $scope.selectedType = {};
        $scope.minRating = '0';
        $scope.maxPrice = '';

        if($scope.minPrice==''){
            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/bars').success(function(response){
                console.log(response);

                $scope.bars = response;
            });
        }
        else {

            $http.get('http://ec2-52-53-151-237.us-west-1.compute.amazonaws.com:3000/minprice/' + $scope.minPrice).success(function (response) {
                console.log(response);
                $scope.bars = response;
            });
        }
    }
}]);