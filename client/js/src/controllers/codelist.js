module.exports = function(myApp) {
    myApp.controller('CodelistController', ['$scope', '$stateParams', 'Codelist', 'NgTableParams', 'ngTableEventsChannel',
        function($scope, $stateParams, Codelist, NgTableParams, ngTableEventsChannel) {
            var _thisScope = $scope;
            $scope.title = $stateParams.key.replace(/_/g, ' ');
            $scope.clkey = $stateParams.key;
            $scope.initFirst = function() {
                $scope.tableParams = new NgTableParams({
                    page: 1, // show first page
                    count: 10 // count per page
                }, {
                    getData: function(params) {
                        var page = params.page();
                        var size = params.count();
                        var paramsCfg = {
                            page:page,
                            size: size,
                            clkey: $stateParams.key
                        };

                        return Codelist.getCodelist(paramsCfg);
                    }
                });
            };
        }
    ]);
};