(function () {
    'use strict';

    Hrm.Religion = angular.module('Hrm.Religion', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.Religion.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.religion', {
                url: '/religion',
                templateUrl: 'religion/views/religion.html',
                data: {pageTitle: 'Danh mục - Phần tử lương'},
                controller: 'ReligionController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Religion',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'religion/controllers/ReligionController.js',
                                'religion/business/ReligionService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();