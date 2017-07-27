module.exports = function(myApp) {
    myApp.controller('RegistrationController', ['$scope', '$stateParams', 'Login',
        function($scope, $stateParams , Login) {
            $scope.register = function(e) {
                var result = Login.register($scope.user);
                console.log(result);
            };

        }
    ]);
};