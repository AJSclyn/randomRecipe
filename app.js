angular.module('myApp', ['ui.router'])
    
.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home',
        {
            url:'/signIn',
            templateUrl: 'templates/signIn.html',
            controller: 'AppCtrl',
            controllerAs: 'app'
        })
        .state('/',
        {
            url:'/randomRecipe',
            templateUrl:'templates/randomRecipe.html',
            controller: 'randomRecipeCtrl',
            controllerAs: 'randomRecipe'
        });
    $urlRouterProvider.otherwise('/randomRecipe')
}])
// .controller('loginCtrl', function loginController($scope){
//     var verifyUser = {
//         "username": "aj@swag.com",
//         "password": "swag"
//     };
//
//     $scope.submitForm = function(user){
//         if(user.email === verifyUser.username && user.password === verifyUser.password)
//             alert("Yay");
//         else
//             alert("Shit");
//     };
// })
//
// .controller('AppCtrl', function(){
//    var self = this;
//     self.message = "The app routing is working";
// })

.controller('randomRecipeCtrl', ['$scope', '$http',
    function($scope, $http){
// $scope.food = [];
//         // $scope.addFoods = function(){
//         //
//         // };
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
}]);

