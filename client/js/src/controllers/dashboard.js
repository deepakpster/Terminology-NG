module.exports = function(myApp) {
    var getPackagePath = function getPackagePath() {
        var packagePath = "Unknown";
        if (navigator.appVersion.indexOf("Win") != -1) packagePath = "./resources/APP-win32-x64.zip";
        if (navigator.appVersion.indexOf("Mac") != -1) packagePath = "./resources/Terminology-darwin-x64.zip";
        return packagePath;
    };
    var getWidgetDetails = function getWidgetDetails(docs) {
        var  widgetDetails = {};
        if (docs.length > 0) {
            $.map(docs, function(elem) {
                var group = elem.group;
                if (!widgetDetails[group]) {
                    widgetDetails[group] = {
                        count: 0,
                        iconCls: 'fa-tasks',
                        panelCls: 'info',
                        name: group
                    };
                }
                ++widgetDetails[group]["count"];
                if (group == "SEND") {
                    widgetDetails[group]["iconCls"] = 'fa-tasks';
                    widgetDetails[group]["panelCls"] = 'primary';
                };
                if (group == "SDTM") {
                    widgetDetails[group]["iconCls"] = 'fa-comments';
                    widgetDetails[group]["panelCls"] = 'danger';
                };
                if (group == "ADaM") {
                    widgetDetails[group]["iconCls"] = 'fa-shopping-cart';
                    widgetDetails[group]["panelCls"] = 'info';
                };
            });
        }
        return widgetDetails;
    }
    myApp.controller('DashboardController', ['$scope', '$stateParams', '$location', 'TerminologyList',
        function($scope, $stateParams, $location, TerminologyList) {
            $scope.ctlist = TerminologyList;
            $scope.getDate = function(createdon) {
                if (!createdon) return;
                return moment(createdon).format('MMMM Do YYYY, h:mm:ss a');
            };
            $scope.installer = getPackagePath();


            var docs = TerminologyList.documents;
                $scope.widgets = {};

            $scope.initFirst = function() {
                $scope.widgets = getWidgetDetails(docs);
            };
            $scope.upload = function(e) {

                var uploadFile = $('input[name=file]')[0].files[0]; //$scope.terminology.file;
                var fd = new FormData();
                fd.append('file', uploadFile);
                $.ajax({
                    url: '/api/upload',
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(data) {
                        console.log('Uploaded Successfully');
                    }
                });
            };
        }
    ]); // Controller
};