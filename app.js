angular.module('myApp', ['ui.router'])
    
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home',
        {
            url:'/home',
            templateUrl:'templates/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })
        .state('about',
        {
            url: '/about',
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl',
            controllerAs: 'about'
        })
        .state('contact',
        {
            url: '/contact',
            templateUrl: 'templates/contact.html',
            controller: 'contactCtrl',
            controllerAs: 'contact'
        });

    $urlRouterProvider.otherwise('home');
}])
.controller('homeCtrl', ['$scope', '$http',
    function($scope, $http){
    $scope.randomRecipe = function(){

        $http({
            method: 'GET',
            url: 'https://community-food2fork.p.mashape.com/search',
            params: {key: '', q: $scope.food},
            headers: {
                'X-Mashape-Key': ""
            }
        }).then(function successCallback(result){
            $scope.swag = result;

        }, function errorCallback(){
            console.log("Fuck");
        });
    };
}])
.controller('aboutCtrl', ['$scope',
function($scope){

}])
.controller('contactCtrl', ['$scope',
function($scope){

}]);


