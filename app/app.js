var angularRoute = angular.module('myApp', [require('angular-route')]);

var app = angular.module('myApp', ['ngRoute']);

    app.config(['$routeProvider'], function ($routeProvider) {
        $routeProvider.when
            ('/signIn', {
                templateUrl: 'templates/signIn.html',
                controller: 'signInCtrl'
        }).otherwise({
            redirectTo: 'templates/signIn.html'
        });
    });
app.controller('loginCtrl', function loginController($scope){
    var verifyUser = {
        "username": "aj@swag.com",
        "password": "swag"
    };

    $scope.submitForm = function(user){
        if(user.email === verifyUser.username && user.password === verifyUser.password)
            alert("Yay");
        else
            alert("Shit");
    };
});

