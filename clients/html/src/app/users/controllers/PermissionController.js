/**
 * Created by bizic on 28/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.User').controller('PermissionController', PermissionController);

    PermissionController.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'bsTableAPI',
        'blockUI',
        'toastr',
        'PermissionService'
    ];
    
    function PermissionController ($rootScope, $scope, $timeout,settings, utils, modal, tableAPI, blockUI, toastr, service) {
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;
    }

})();
