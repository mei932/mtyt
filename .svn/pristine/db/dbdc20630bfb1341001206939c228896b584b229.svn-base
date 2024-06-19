(function () {
    'use strict';
/*
 * author Giang 21/04/2018
 */
    Hrm.ShiftWork = angular.module('Hrm.ShiftWork', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.ShiftWork.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.shiftwork', {
                url: '/shiftwork',
                templateUrl: 'shiftwork/views/shiftwork.html',
                data: {pageTitle: 'Danh mục - Ca làm việc'},
                controller: 'ShiftWorkController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.ShiftWork',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'shiftwork/controllers/ShiftWorkController.js',
                                'shiftwork/business/ShiftWorkService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();