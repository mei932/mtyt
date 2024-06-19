(function () {
    'use strict';

    Hrm.CivilServantCategory = angular.module('Hrm.CivilServantCategory', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',

        'Hrm.Common'
    ]);

    	Hrm.CivilServantCategory.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.civilservantcategory_system', {
                url: '/civilservantcategory/civilservantcategory-system',
                templateUrl: 'civilservantcategory/views/civil_servant_category_system.html',
                data: {pageTitle: 'Danh mục - Mã ngạch công chức'},
                controller: 'CivilServantCategoryController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.CivilServantCategory',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'civilservantcategory/controllers/CivilServantCategoryController.js',
                                'civilservantcategory/business/CivilServantCategoryService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();