(function () {
    'use strict';

    Hrm.SpecialityAdmissionsMap = angular.module('Hrm.SpecialityAdmissionsMap', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.SpecialityAdmissionsMap.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.specialityadmissionsmap', {
                url: '/specialityadmissionsmap',
                templateUrl: 'specialityadmissionsmap/views/specialityadmissionsmap.html',
                data: {pageTitle: 'Danh mục - Cấu hình mã ngành tuyển sinh'},
                controller: 'SpecialityAdmissionsMapController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.SpecialityAdmissionsMap',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'specialityadmissionsmap/controllers/SpecialityAdmissionsMapController.js',
                                'specialityadmissionsmap/business/SpecialityAdmissionsMapService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();