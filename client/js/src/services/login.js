module.exports = function(myApp) {
    myApp.factory('Login', ['$rootScope', '$http', function($rootScope, $http) {
        var config = {
        };

        function login(params) {
            return $http.post('/login', params, config).then(function(response) {
                return response.data;
            });
        }

        function register(params) {
            return $http.post('/register', params, config).then(function(response) {
                return response.data;
            });
        }
        return {
            login: login,
            register: register
        };
    }]);
};