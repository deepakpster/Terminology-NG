module.exports = function(myApp) {
    myApp.factory('Widgets', ['$rootScope', '$http', function($rootScope, $http) {
        function getDetails(group) {
            group = 'ADaM'; // harcoded
            return $http.get('./resources/'+group+'.json').then(function(response) {
                console.log(response);
                return response.data;
            });
        }
        return {
            getDetails: getDetails
        };
    }]);
};