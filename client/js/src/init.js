var myApp = angular.module('myApp', ['ui.router', 'ngTable']);

/* Services */
var controlledTerminologyService = require('./services/controlledTerminology')(myApp);
var codelistService = require('./services/codelist')(myApp);
var codelistService = require('./services/codeterm')(myApp);
var widgetService = require('./services/widget')(myApp);
var loginService = require('./services/login')(myApp);
var authInterceptorService = require('./services/authInterceptor')(myApp);

/* Controllers */
var registrationController = require('./controllers/registration.js')(myApp);
var dashboardController = require('./controllers/dashboard.js')(myApp);
var dashboardController = require('./controllers/codelist.js')(myApp);
var codetermController = require('./controllers/codeterm.js')(myApp);
var widgetController = require('./controllers/widget.js')(myApp);
var loginController = require('./controllers/login.js')(myApp);
var registrationController = require('./controllers/register.js')(myApp);

/* Utils */

/*
 * Complete the function below.
 */
myApp.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);
myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('app', {
            views: {
                'header': {
                    templateUrl: 'views/dashboard/nav.html',
                    controller: 'DashboardController'
                },
                'content': {
                    template: '<div>Content Layout</div>'
                },
                'footer': {
                    templateUrl: 'views/footer.html'
                }
            },
            url: '/'
        })
        .state('app.login', {
            views: {
                'header@': {
                    template: '<div> Login Banner</div>'
                },
                'content@': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                }
            },
            url: 'login'
        })
        .state('app.register', {
            views: {
                'header@': {
                    template: '<div> Login Banner</div>'
                },
                'content@': {
                    templateUrl: 'views/register.html',
                    controller: 'RegistrationController'
                }
            },
            url: 'register'
        })
        .state('app.dashboard', {
            views: {
                'content@': {
                    templateUrl: 'views/dashboard/page.html',
                    controller: 'DashboardController'
                }
            },
            resolve: {
                TerminologyList: ['TerminologyList', function(TerminologyList) {
                    return TerminologyList.getTerminology();
                }]
            },
            url: 'dashboard'
        })
        .state('app.widget', {
            views: {
                'content@': {
                    templateUrl: 'views/widget/page.html',
                    controller: 'WidgetController'
                }
            },
            url: 'widget/:group'
        })
        .state('app.codelist', {
            views: {
                'content@': {
                    templateUrl: 'views/codelist/page.html',
                    controller: 'CodelistController'
                }
            },
            url: 'codelist/:key'
        })
        .state('app.codeterm', {
            views: {
                'content@': {
                    templateUrl: 'views/codeterm/page.html',
                    controller: 'CodetermController'
                }
            },
            url: 'codeterm/:key/:codeId'
        });
}]);