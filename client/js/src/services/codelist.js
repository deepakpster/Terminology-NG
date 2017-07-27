module.exports = function(myApp) {
    myApp.factory('Codelist', ['$rootScope', '$http', function($rootScope, $http) {
        function getCodelist(params) {
            return $http.get('/api/codelist-list?clkey=' + params.clkey+'&page='+params.page+'&size='+params.size).then(function(response) {
                return response.data;
            });
        }
        return {
            getCodelist: getCodelist
        };
    }]);
};