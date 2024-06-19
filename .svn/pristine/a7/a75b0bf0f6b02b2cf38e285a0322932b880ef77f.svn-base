(function () {
    'use strict';

    Hrm.SalaryConfig = angular.module('Hrm.SalaryConfig', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.SalaryConfig.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.salaryconfig', {
                url: '/salaryconfig',
                templateUrl: 'salaryconfig/views/salaryconfig.html',
                data: {pageTitle: 'Danh mục - Cấu hình thức lương'},
                controller: 'SalaryConfigController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.SalaryConfig',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'salaryconfig/controllers/SalaryConfigController.js',
                                'salaryconfig/business/SalaryConfigService.js'
                            ]
                        });
                    }]
                }
            })

            .state('application.salaryconfig_detail', {
                url: '/salaryconfig_detail/:salaryConfigId',
                templateUrl: 'salaryconfig/views/salaryconfig_detail.html',
                data: {pageTitle: 'Danh mục - Chi tiết cấu hình lương'},
                controller: 'SalaryConfigDetailController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.SalaryConfig',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'salaryconfig/controllers/SalaryConfigDetailController.js',
                                'salaryconfig/business/SalaryConfigDetailService.js',
                                'salaryconfig/business/SalaryConfigService.js',
                                'salaryitem/business/SalaryItemService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();