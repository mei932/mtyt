(function () {
    'use strict';

    Hrm.Dashboard = angular.module('Hrm.Dashboard', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ngFileUpload',

        'Hrm.Common'
    ]);

    Hrm.Dashboard.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Dashboard
            .state('application.dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard/views/general.html',
                data: {icon: 'fa fa-desktop', pageTitle: 'Trang chủ', pageSubTitle: ''},
                controller: 'DashboardController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Dashboard',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'dashboard/controllers/DashboardController.js',
                            ]
                        });
                    }]
                }
            });
    }]);

})();