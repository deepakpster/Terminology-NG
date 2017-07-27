module.exports = function(myApp) {
    myApp.controller('WidgetController', ['$scope', '$stateParams', 'Widgets', 'NgTableParams',
        function($scope, $stateParams, Widgets, NgTableParams) {
            var _thisScope = $scope;
            $scope.group = $stateParams.group;
            $scope.readme = '';
            var readme = Widgets.getDetails($stateParams.group);
            $scope.initFirst = function() {
                $scope.group = $stateParams.group;
                $scope.readme = readme;
                $scope.tableParams = new NgTableParams({}, {
                    getData: function(params) {
                        return $scope.readme;
                    }
                });
            }

        }
    ]);
};