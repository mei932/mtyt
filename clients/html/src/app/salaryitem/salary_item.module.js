(function () {
    'use strict';

    Hrm.SalaryItem = angular.module('Hrm.SalaryItem', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.SalaryItem.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.salaryitem', {
                url: '/salaryitem',
                templateUrl: 'salaryitem/views/salaryitem.html',
                data: {pageTitle: 'Danh mục - Phần tử lương'},
                controller: 'SalaryItemController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.SalaryItem',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'salaryitem/controllers/SalaryItemController.js',
                                'salaryitem/business/SalaryItemService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();