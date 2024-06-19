(function () {
    'use strict';

    Hrm.ChoMeo = angular.module('Hrm.ChoMeo', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'ngJsTree',
        'Hrm.Common'
    ]);

    	Hrm.ChoMeo.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.ChoMeo', {
                url: '/chomeo',
                templateUrl: 'ChoMeo/views/ChoMeo.html',
                data: {
                    icon: 'icon-people',
                    pageTitle: 'chó mèo',
                    pageSubTitle: 'danh sách chó mèo'
                },
                controller: 'ChoMeoController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.ChoMeo',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'ChoMeo/controllers/ChoMeoController.js',
                                'ChoMeo/business/ChoMeoService.js',
                            ]
                        });
                    }]
                }
            })

          
    }]);

})();