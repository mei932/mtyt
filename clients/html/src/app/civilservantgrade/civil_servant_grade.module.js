(function () {
    'use strict';

    Hrm.CivilServantGrade = angular.module('Hrm.CivilServantGrade', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',

        'Hrm.Common'
    ]);

    	Hrm.CivilServantGrade.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.civilservantgrade_system', {
                url: '/civilservantgrade/civilservantgrade-system',
                templateUrl: 'civilservantgrade/views/civil_servant_grade_system.html',
                data: {pageTitle: 'Danh mục - Bậc công chức'},
                controller: 'CivilServantGradeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.CivilServantGrade',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'civilservantgrade/controllers/CivilServantGradeController.js',
                                'civilservantgrade/business/CivilServantGradeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();