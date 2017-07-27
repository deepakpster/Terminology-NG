module.exports = function(myApp) {
    myApp.factory('TerminologyList', ['$rootScope', '$http', function($rootScope, $http) {
        function getTerminology() {
            return $http.get('/api/ct-list').then(function(response) {
                return response.data;
            });
        }
        return {
            getTerminology: getTerminology
        };
    }]);
};