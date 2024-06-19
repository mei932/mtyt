/**
 * Created by bizic on 28/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.User').controller('UserGroupController', UserGroupController);

    UserGroupController.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'bsTableAPI',
        'blockUI',
        'toastr',
        'focus',
        'UserGroupService'
    ];
    
    function UserGroupController ($rootScope, $scope, $timeout,settings, utils, modal, tableAPI, blockUI, toastr, focus, service) {
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.group = {};
        vm.groups = [];
        vm.selectedGroups = [];

        vm.modalInstance = null;

        vm.bsTableControl = {
            options: {
                data: vm.groups,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: true,
                singleSelect: true,
                showToggle: true,
                pagination: true,
                pageSize: 25,
                pageList: [5, 10, 25, 50, 100, 200],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.safeApply(function () {
                        vm.selectedGroups = [];
                        vm.selectedGroups.push(row);
                    });
                },
                onUncheck: function (row, $element) {
                    $scope.safeApply(function () {
                        vm.selectedGroups = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    // Reload user list on page change
                    vm.getGroups();
                }
            }
        };

        vm.pageIndex = 0;
        vm.pageSize = vm.bsTableControl.options.pageSize;

        /**
         * Get list of user groups
         */
        vm.getGroups = function() {
            service.getGroups(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.groups = data.content;
                vm.bsTableControl.options.data = vm.groups;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        // Load first page of user groups list
        vm.getGroups();

        vm.saveGroup = function () {
            if (!vm.group) {
                return;
            }

            if (!vm.group.name || vm.group.name.trim() == '') {
                toastr.error('Bạn vui lòng nhập tên nhóm người dùng.', 'Lỗi');
                focus('vm.group.name');
                return;
            }

            blockUI.start();

            service.saveGroup(vm.group, function success() {

                // Refresh list
                vm.getGroups();

                blockUI.stop();

                // Notify
                toastr.info('Bạn đã lưu thành công 1 bản ghi.', 'Thông báo');

                // clear object
                vm.group = {};

                if (vm.modalInstance) {
                    vm.modalInstance.close(null);
                }

            }, function failure() {
                blockUI.stop();
                toastr.error('Có lỗi xảy ra khi lưu bản khi.', 'Thông báo');

                if (vm.modalInstance) {
                    vm.modalInstance.close(null);
                }
            });
        };

        vm.newGroup = function () {
            vm.group = {isNew: true};

            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_group_modal.html',
                scope: $scope,
                size: 'md'
            });
        };

        $scope.editGroup = function (groupId) {
            blockUI.start();
            service.getGroup(groupId).then(function(data) {

                blockUI.stop();

                vm.group = data;
                vm.group.isNew = false;

                vm.modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_group_modal.html',
                    scope: $scope,
                    size: 'md'
                });
            });
        };

        /**
         * Delete user groups
         */
        vm.deleteGroups = function () {
            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            vm.modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    blockUI.start();
                    service.deleteGroups(vm.selectedGroups, function success() {
                        // Refresh list
                        vm.getGroups();

                        // Block UI
                        blockUI.stop();

                        // Notify
                        toastr.info('Bạn đã xoá thành công ' + vm.selectedGroups.length + ' bản ghi.', 'Thông báo');

                        // Clear selected tags
                        vm.pageIndex = 0;
                        vm.selectedGroups = [];
                    }, function failure() {
                        // Block UI
                        blockUI.stop();

                        toastr.error('Có lỗi xảy ra khi xóa bản khi.', 'Thông báo');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
    }

})();
