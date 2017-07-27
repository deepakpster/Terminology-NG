module.exports = function(myApp) {
    myApp.controller('CodetermController', ['$scope', '$stateParams', 'Codeterm', 'NgTableParams',
        function($scope, $stateParams, Codeterm, NgTableParams) {
            $scope.clKey = $stateParams.key;
            $scope.title = $stateParams.key.replace(/_/g, ' ');
            $scope.clcode = $stateParams.codeId;
            $scope.initFirst = function() {
                $scope.list = Codeterm.getCodeterm($stateParams.key, $stateParams.codeId);
                $scope.tableParams = new NgTableParams({}, {
                    getData: function(params) {
                        return $scope.list;
                    }
                });
            };
        }
    ]);
};