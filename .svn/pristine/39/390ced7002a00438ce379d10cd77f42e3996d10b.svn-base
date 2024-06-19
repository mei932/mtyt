(function () {

    'use strict';

    /* OAuth2 configuration */
    Hrm.config(['OAuthProvider', 'OAuthTokenProvider', 'constants', function(OAuthProvider, OAuthTokenProvider, constants) {

        OAuthProvider.configure({
            baseUrl: Hrm.API_SERVER_URL,
            clientId: Hrm.API_CLIENT_ID,
            clientSecret: Hrm.API_CLIENT_KEY,
            grantPath: '/oauth/token',
            revokePath: '/oauth/logout'
        });

        OAuthTokenProvider.configure({
            name: constants.oauth2_token,
            options: {
                secure: false
            }
        });
    }]);

    Hrm.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);

    /* Block UI configuration */
    Hrm.config(['blockUIConfig', function(blockUIConfig) {

        // Change the default overlay message
        blockUIConfig.message = 'Vui lòng chờ...';

        // Change the default delay to 100ms before the blocking is visible
        blockUIConfig.delay = 10;

    }]);

    /* Toastr configuration */
    Hrm.config(['toastrConfig', function (toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            closeButton: true,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });
    }]);

    /* HTTP Provider configuration */
    Hrm.config(['$httpProvider', function ($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';
        // $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
        // $httpProvider.defaults.useXDomain = true;
        //
        // $httpProvider.interceptors.push('XSRFInterceptor');
        $httpProvider.interceptors.push('ServerExceptionHandlerInterceptor');
    }]);

    /* Location provider */
    Hrm.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(false);
    }]);

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    Hrm.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            // global configs go here
        });
    }]);

    /* AngularJS v1.3.x workaround for old style controller declarition in HTML */
    Hrm.config(['$controllerProvider', function ($controllerProvider) {
    }]);

    Hrm.config(['$urlRouterProvider', '$stateProvider', 'constants',
        function ($urlRouterProvider, $stateProvider, constants) {
            // Redirect any unmatched url

            // Member area
            $stateProvider.state('application', {
                templateUrl: 'common/views/application.html',
                abstract: true
            });

            // Guest area
            $urlRouterProvider.otherwise(function(a, b) {
                var $injector = a, $location = b; // To support for minification

                var $cookies = $injector.get('$cookies');
                var user = $cookies.getObject(constants.cookies_user);

                if (user) {
                    $location.path('/dashboard');
                } else {
                    $location.path('/login');
                }
            });
        }
    ]);
})();