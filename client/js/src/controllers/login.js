//this is used to parse the profile
function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}
module.exports = function(myApp) {
    myApp.controller('LoginController', ['$scope', '$stateParams', 'Login', '$window', '$location',
        function($scope, $stateParams, Login, $window, $location) {
            $scope.login = function(e) {
                Login.login($scope.user).then(function(data) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    // $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
                    console.log(profile);
                    $location.path('/dashboard');
                });
            };
            $scope.register = function(e) {
                Login.register($scope.user).then(function(res){
                    $location.path('/login');
                });
            };
            $scope.logout = function(e) {
                $scope.welcome = '';
                $scope.message = '';
                $scope.isAuthenticated = false;
                delete $window.sessionStorage.token;
                $location.path('/login');
            };

        }
    ]);
};