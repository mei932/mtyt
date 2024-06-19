(function () {
    'use strict';

    Hrm.Settings = angular.module('Hrm.Settings', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',

        'Hrm.Common'
    ]);

    Hrm.Settings.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // General Settings
            .state('application.settings', {
                url: '/settings',
                templateUrl: 'settings/views/general.html',
                data: {pageTitle: 'Settings'},
                controller: 'SettingsController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Settings',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'settings/controllers/SettingsController.js',
                                'settings/business/SettingsService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();