/**
 * Created by kevin on 4/17/17.
 */
'use strict';

angular.module('myApp.barDetail', ['ngRoute'])

    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/barDetail/:ID', {
            templateUrl: 'barDetail/barDetail.html',
            controller: 'bardetailCtrl'
        });
    }])

    .controller('bardetailCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
        $http.get('http://localhost:3000/bars/'+$routeParams.ID).success(function(response){
            console.log(response);

            $scope.bar = response;

            $http.get('http://localhost:3000/bar_products/'+$routeParams.ID).success(function(responseP){
                console.log(responseP);
                $scope.products = responseP;
            })

        });

    }]);