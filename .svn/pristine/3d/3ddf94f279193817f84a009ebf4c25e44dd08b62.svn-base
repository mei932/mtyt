(function () {
    'use strict';

    Hrm.Department = angular.module('Hrm.Department', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common',
        'treeGrid'
    ]);

    	Hrm.Department.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.department', {
                url: '/department',
                templateUrl: 'department/views/department.html',
                data: {pageTitle: 'Danh mục - Phòng Ban'},
                controller: 'DepartmentController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Department',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'department/controllers/DepartmentController.js',
                                'department/business/DepartmentService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();