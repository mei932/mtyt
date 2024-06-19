(function () {
    'use strict';

    Hrm.PositionTitle = angular.module('Hrm.PositionTitle', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.PositionTitle.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.positiontitle', {
                url: '/positiontitle',
                templateUrl: 'positiontitle/views/positiontitle.html',
                data: {pageTitle: 'Danh mục - Chức danh'},
                controller: 'PositionTitleController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.PositionTitle',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'positiontitle/controllers/PositionTitleController.js',
                                'positiontitle/business/PositionTitleService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();