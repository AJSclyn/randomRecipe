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
            .state('generator',
                {
                    url: '/generator',
                    templateUrl: '/templates/generate.html',
                    controller: 'generatorCtrl',
                    controllerAs: 'generator'
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
            .state('register',
                {
                    url: '/register',
                    templateUrl: '/templates/register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'auth', function($state, auth){
                        if(auth.isLoggedIn()){
                            $state.go('home');
                        }
                    }]
                })
            .state('signIn',{
                    url: '/signIn',
                    templateUrl: '/templates/signIn.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'auth', function($state, auth){
                        if(auth.isLoggedIn()){
                            $state.go('home');
                        }
                    }]
                });

        $urlRouterProvider.otherwise('home');
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
            console.log("HI");
            return $http.post('/register', user).success(function(data){
                auth.saveToken(data.token);
            });
            console.log("after");
        };
        auth.login = function(user){
            return $http.post('/login', user).success(function(data){
                auth.saveToken(data.token);
            });
        };
        auth.logOut = function(){
            $window.localStorage.removeItem('token');
        };
        return auth;
    }])
.controller('homeCtrl', ['$scope',
function($scope, $http){

}])

.controller('generatorCtrl', 'auth' ['$scope', '$http',
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
.controller('AuthCtrl', ['$scope', '$state', 'auth',
    function($scope, $state, auth){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }])
.controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }]);




