(function () {
    'use strict';

    /* Hrm App */
    if (typeof window.Hrm == 'undefined') {
        var Hrm = angular.module('Hrm', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'ngSanitize',
            'ngCookies',
            'angular-oauth2',
            'blockUI',
            'ngFileUpload',
            'uiCropper',
            'toastr',
            'ngIdle',

            // Sub modules
            'Hrm.Common',
            'Hrm.Dashboard',
            'Hrm.Settings',
            'Hrm.User',

            // Sub modules
            'Hrm.Account',
            'Hrm.CivilServantCategory',
            'Hrm.CivilServantGrade',
            'Hrm.CivilServantCategoryGrade',
            'Hrm.PositionTitle',
            'Hrm.Staff',
            'Hrm.Department',
            'Hrm.SalaryItem',
            'Hrm.AcademicTitle',
            'Hrm.EducationDegree',
            'Hrm.SalaryConfig',
            'Hrm.ShiftWork',
            'Hrm.TimeSheet',
            'Hrm.SalaryIncrementType',
            'Hrm.OvertimeType',
            'Hrm.Religion',
            'Hrm.XacNhanNopPhi',
            'Hrm.SpecialityAdmissionsMap',
            'Hrm.ChoMeo'
        ]);

        window.Hrm = Hrm;
    }
    Hrm.API_SERVER_URL = 'http://localhost:8082/mtyt/'; //
    Hrm.API_CLIENT_ID = 'education_client';
    Hrm.API_CLIENT_KEY = 'password';
    Hrm.API_PREFIX = 'api/';

    /* Init global settings and run the app */
    Hrm.run(['$rootScope', 'settings', '$http', '$cookies', '$state', '$injector', 'constants', 'OAuth', 'blockUI', 'toastr', 'Idle', 'Keepalive',
        function ($rootScope, settings, $http, $cookies, $state, $injector, constants, OAuth, blockUI, toastr, Idle, Keepalive) {
            $rootScope.$state = $state; // state to be accessed from view
            settings.api.apiV1Url=Hrm.API_PREFIX;
            $rootScope.$settings = settings; // state to be accessed from view
			
            // Idle management
            Idle.watch();
            Keepalive.start();

            $rootScope.$on('IdleStart', function() {
                $http.get(settings.api.baseUrl + 'api/users/getCurrentUser').success(function (response, status, headers, config) {
                    if (response) {
                        /* Display modal warning or sth */
                        $rootScope.idleToastr = toastr.warning('Báº¡n Ä‘Ã£ ngÆ°ng lÃ m viá»‡c trÃªn há»‡ thá»‘ng má»™t khoáº£ng thá»�i gian khÃ¡ lÃ¢u. PhiÃªn lÃ m viá»‡c cá»§a báº¡n sáº½ tá»± Ä‘á»™ng káº¿t thÃºc ngay sau Ä‘Ã¢y náº¿u báº¡n khÃ´ng thá»±c hiá»‡n má»™t thao tÃ¡c nÃ o.', 'Cáº£nh bÃ¡o...', {
                            timeOut: 60000, // 60 seconds
                            closeButton: true,
                            progressBar: true});
                    }
                }).error(function (response, status, headers, config) {
                });
            });

            $rootScope.$on('IdleEnd', function() {
                if ($rootScope.idleToastr) {
                    toastr.remove($rootScope.idleToastr);
                }
            });

            $rootScope.$on('IdleTimeout', function() {
                OAuth.revokeToken();

                $cookies.remove(constants.oauth2_token);
                $state.go('login');
            });

            // oauth2...
            $rootScope.$on('oauth:error', function (event, rejection) {

                blockUI.stop();

                // Ignore `invalid_grant` error - should be catched on `LoginController`.
                if (angular.isDefined(rejection.data) && 'invalid_grant' === rejection.data.error) {
                    $cookies.remove(constants.oauth2_token);
                    $state.go('login');

                    return;
                }

                // Refresh token when a `invalid_token` error occurs.
                if (angular.isDefined(rejection.data) && 'invalid_token' === rejection.data.error) {
                    return OAuth.getRefreshToken();
                }

                // Redirect to `/login` with the `error_reason`.
                $rootScope.$emit('$unauthorized', function (event, data) {});
                $state.go('login');
            });

            $rootScope.$on('$locationChangeSuccess', function (event) {

                if (!OAuth.isAuthenticated()) {
                    $rootScope.$emit('$unauthorized', function (event, data) {});
                    $state.go('login');
                }

                blockUI.start();
                $http.get(settings.api.baseUrl + 'api/users/getCurrentUser').success(function (response, status, headers, config) {
                    blockUI.stop();
                    if (response) {
                        $rootScope.$emit('$onCurrentUserData', response);

                        if ($state.current.name == 'login') {
                            $state.go('application.dashboard');
                        }
                    }
                }).error(function (response, status, headers, config) {
                    blockUI.stop();
                    $cookies.remove(constants.oauth2_token);
                    $state.go('login');
                });
            });
        }
    ]);

})(window);
