module.exports = function(myApp) {
    myApp.controller('RegistrationController', ['$scope', '$http',
        function($scope, $http) {
            $scope.login = function() {
                $http.get('/api/login').success(function(data) {
                    $scope.message = 'Greetings, World';
                });
            }; 

            $scope.register = function() {
                $scope.message = 'Hello World';
            }; // register

        }
    ]); // Controller
};