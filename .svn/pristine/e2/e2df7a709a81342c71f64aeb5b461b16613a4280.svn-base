(function () {
    'use strict';

    Hrm.Account = angular.module('Hrm.Account', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',

        'Hrm.Common'
    ]);

    Hrm.Account.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.account_system', {
                url: '/account/account-system',
                templateUrl: 'account/views/account_system.html',
                data: {pageTitle: 'Danh mục - Hệ thống tài khoản'},
                controller: 'AccountController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Account',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'account/controllers/AccountController.js',
                                'account/business/AccountService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();