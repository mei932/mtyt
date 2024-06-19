(function () {
    'use strict';

    Hrm.CivilServantCategoryGrade = angular.module('Hrm.CivilServantCategoryGrade', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',

        'Hrm.Common'
    ]);

    	Hrm.CivilServantCategoryGrade.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.civilservantcategorygrade', {
                url: '/civilservantcategorygrade/civilservantcategorygrade',
                templateUrl: 'civilservantcategorygrade/views/civil_servant_category_grade.html',
                data: {pageTitle: 'Danh mục - Mã ngạch và bậc công chức'},
                controller: 'CivilServantCategoryGradeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.CivilServantCategoryGrade',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'civilservantcategorygrade/controllers/CivilServantCategoryGradeController.js',
                                'civilservantcategorygrade/business/CivilServantCategoryGradeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();