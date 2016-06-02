angular.module('myApp', ['ngRoute'])
    
.config(function($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'templates/signIn.html',
            controller: 'AppCtrl',
            controllerAs: 'app'
        }).otherwise({
        redirectTo: 'templates/signIn.html'
    });
})

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

.controller('AppCtrl', function(){
   var self = this;
    self.message = "The app routing is working";
});