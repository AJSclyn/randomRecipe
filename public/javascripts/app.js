angular.module('myApp', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',
                {
                    url:'/home',
                    templateUrl:'/templates/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'home'
                })
            .state('about',
                {
                    url: '/about',
                    templateUrl: '/templates/about.html',
                    controller: 'aboutCtrl',
                    controllerAs: 'about'
                })
            .state('contact',
                {
                    url: '/contact',
                    templateUrl: '/templates/contact.html',
                    controller: 'contactCtrl',
                    controllerAs: 'contact'
                })
            .state('signIn',{
                url: '/signIn',
                templateUrl: '/templates/signIn.html',
                controller: 'signInCtrl',
                controllerAs: 'signIn'
            });

        $urlRouterProvider.otherwise('home');
    }])
.controller('homeCtrl', ['$scope', '$http',
    function($scope, $http){

        $scope.foods = [{
            name: 'beef'
        }, {
            name: 'chicken'
        }
        ];

        $scope.selection = [];

        $scope.toggleSelection = function toggleSelection(foodName){
            var idx = $scope.selection.indexOf(foodName);

            if(idx > -1){
                $scope.selection.splice(idx, 1);
            }else{
                $scope.selection.push(foodName);
            }
            $scope.test = $scope.selection.join(" ");
        };

        $scope.randomRecipe = function(){
            $http({
                method: 'GET',
                url: 'https://community-food2fork.p.mashape.com/search',
                params: {key: '', q: $scope.test},
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

    }])
.controller('signInCtrl', ['$scope',
    function($scope){

    }])

.factory('auth', ['$http', '$window', function($http, $window){
    var auth = {};

    auth.saveToken = function(token){
        $window.localStorage['token'] = token;
    };

    auth.getToken = function(){
        return $window.localStorage['token'];
    };

    auth.isLoggedIn = function(){
        var token = auth.getToken();
        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp = Date.now() / 1000;
        }else{
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token  = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user){
        return $http.post('/signIn', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    auth.login = function(user){
        return $http.post('/signIn', user).success(function(data){
            auth.saveToken(data.token);
        });
    };
    auth.logOut = function(){
        $window.localStorage.removeItem('token');
    };
    return auth;
}]);



