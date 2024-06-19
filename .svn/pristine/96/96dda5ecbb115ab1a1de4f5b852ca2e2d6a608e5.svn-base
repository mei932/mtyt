/*
 * Created by TA & Giang on 21/4/2018.
 */

(function () {
    'use strict';

    Hrm.AcademicTitle = angular.module('Hrm.AcademicTitle', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.AcademicTitle.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.academictitle', {
                url: '/academictitle',
                templateUrl: 'academictitle/views/academictitle.html',
                data: {pageTitle: 'Danh mục - Học hàm học vị'},
                controller: 'AcademicTitleController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.AcademicTitle',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'academictitle/controllers/AcademicTitleController.js',
                                'academictitle/business/AcademicTitleService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();