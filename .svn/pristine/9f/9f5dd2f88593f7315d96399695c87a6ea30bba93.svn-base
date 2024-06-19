(function () {
    'use strict';
/*
 * author Giang 21/04/2018
 */
    Hrm.TimeSheet = angular.module('Hrm.TimeSheet', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common',
        'angucomplete-alt'
    ]);

    	Hrm.TimeSheet.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.timesheet', {
                url: '/timesheet',
                templateUrl: 'timesheet/views/timesheet.html',
                data: {pageTitle: 'Danh mục - Thời gian biểu'},
                controller: 'TimeSheetController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.TimeSheet',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'timesheet/controllers/TimeSheetController.js',
                                'timesheet/business/TimeSheetService.js'
                            ]
                        });
                    }]
                }
            })
            .state('application.timesheetdetail', {
                url: '/timesheetdetail',
                templateUrl: 'timesheet/views/timesheetdetail.html',
                data: {pageTitle: 'Danh mục - Thời lượng làm việc'},
                controller: 'TimeSheetDetailController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.TimeSheet',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'timesheet/controllers/TimeSheetDetailController.js',
                                'timesheet/business/TimeSheetDetailService.js'
                            ]
                        });
                    }]
                }
            })
            .state('application.testauto', {
                url: '/testauto',
                templateUrl: 'timesheet/views/testauto.html',
                data: {pageTitle: 'testautocomplete'},
                controller: 'TestAutoController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.TimeSheet',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'timesheet/controllers/TestAutoController.js'
                            ]
                        });
                    }]
                }
            })
            ;
    }]);

})();