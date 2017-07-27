module.exports = function(myApp) {
    myApp.factory('Codeterm', ['$rootScope', '$http', function($rootScope, $http) {
        function getCodeterm(key, codeId) {
            return $http.get('/api/codeterm-list?clkey=' + key + '&code=' + codeId).then(function(response) {
                return response.data;
            });
        }
        return {
            getCodeterm: getCodeterm
        };
    }]);
};