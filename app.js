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

        }]);



