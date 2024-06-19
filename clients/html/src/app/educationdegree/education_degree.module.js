/*
 * Created by TA & Giang on 21/4/2018.
 */

(function () {
    'use strict';

    Hrm.EducationDegree = angular.module('Hrm.EducationDegree', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.EducationDegree.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.educationdegree', {
                url: '/educationdegree',
                templateUrl: 'educationdegree/views/educationdegree.html',
                data: {pageTitle: 'Danh mục - Bằng cấp'},
                controller: 'EducationDegreeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.EducationDegree',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'educationdegree/controllers/EducationDegreeController.js',
                                'educationdegree/business/EducationDegreeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();