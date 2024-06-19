/*
 * Created by TA2 & Giang on 22/4/2018.
 */

(function () {
    'use strict';

    Hrm.OvertimeType = angular.module('Hrm.OvertimeType', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.OvertimeType.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.overtimetype', {
                url: '/overtimetype',
                templateUrl: 'overtimetype/views/overtimetype.html',
                data: {pageTitle: 'Danh mục - Làm ngoài giờ'},
                controller: 'OvertimeTypeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.OvertimeType',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'overtimetype/controllers/OvertimeTypeController.js',
                                'overtimetype/business/OvertimeTypeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();