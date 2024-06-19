(function () {

    'use strict';

    /* Setup global constants */
    Hrm.constant('constants', {
        cookies_user: 'education.user',
        oauth2_token: 'token'
    });

    Hrm.filter('weekDay', [function () {
        return function (input) {
            if (input < 2 || input > 8) {
                return '';
            }

            var arr = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
            return arr[input - 2];
        };
    }]);

    /* Setup global settings */
    Hrm.factory('settings', ['$rootScope', '$state', 'constants', function ($rootScope, $state, constants) {
        // supported languages
        var settings = {
            layout: {
                pageSidebarClosed: false, // sidebar menu state
                pageContentWhite: true, // set page content layout
                pageBodySolid: true, // solid body color state
                pageAutoScrollOnLoad: 1000, // auto scroll to top on page load,
            },
            locale: 'vi-VN',
            assetsPath: 'assets',
            api: {
                baseUrl: Hrm.API_SERVER_URL,
                apiPrefix: Hrm.API_PREFIX,
                clientId: Hrm.API_CLIENT_ID,
                clientKey: Hrm.API_CLIENT_KEY,
                oauth: {
                    token: constants.oauth2_token
                }
            }
        };

        $rootScope.settings = settings;

        return settings;
    }]);

    /**
     * Set focus on element
     */
    Hrm.factory('focus', ['$timeout', '$window', function ($timeout, $window) {
        return function (id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            });
        };
    }]);

    /**
     * Invoke bstable API_PREFIX
     */
    Hrm.factory('bsTableAPI', ['$window', function ($window) {
        return function (id, api, parameter) {
            var element = $window.document.getElementById(id);
            if (element && element.hasAttribute('bs-table-control')) {
                return $(element).bootstrapTable(api, parameter);
            }
        };
    }]);

    /**
     * No server response interceptor
     */
    Hrm.factory('ServerExceptionHandlerInterceptor', [
        '$q',
        'toastr',
        '$cookies',
        '$injector',
        'blockUI',
        'constants',
        function ($q, toastr, $cookies, $injector, blockUI, constants) {
            return {
                responseError: function (rejection) {
                    if (rejection.status <= 0) {
                        toastr.warning('Không thể kết nối đến máy chủ.', 'Cảnh báo');
                    }

                    if (rejection.status == 400) {
                        toastr.error('Đã có lỗi xảy ra. Xin vui lòng thử lại.', 'Lỗi (400)');
                    }

                    if (rejection.status == 401) {
                        // Force refresh token in application.run()
                    }

                    if (rejection.status == 403) {
                        toastr.error('Bạn không có quyền thực hiện thao tác này.', 'Lỗi (403)');
                    }
					
					if (rejection.status == 409) {
                        toastr.error('Có lỗi xảy ra. Xin vui lòng thử lại sau.', 'Lỗi (409)');
                    }

                    if (rejection.status == 500) {
                        toastr.error('Đã có lỗi xảy ra với hệ thống. Xin vui lòng thử lại sau.', 'Lỗi (500)');
                    }

                    blockUI.stop();

                    return $q.reject(rejection);
                }
            };
        }
    ]);

})();