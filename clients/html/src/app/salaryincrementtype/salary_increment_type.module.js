/*
 * Created by TA & Giang on 23/4/2018.
 */

(function () {
    'use strict';

    Hrm.SalaryIncrementType = angular.module('Hrm.SalaryIncrementType', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.SalaryIncrementType.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.salaryincrementtype', {
                url: '/salaryincrementtype',
                templateUrl: 'salaryincrementtype/views/salaryincrementtype.html',
                data: {pageTitle: 'Danh mục - Loại tăng lương'},
                controller: 'SalaryIncrementTypeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.SalaryIncrementType',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'salaryincrementtype/controllers/SalaryIncrementTypeController.js',
                                'salaryincrementtype/business/SalaryIncrementTypeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();