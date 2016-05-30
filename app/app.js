var app = angular.module('randomRecipe', []);

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

