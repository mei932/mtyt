/**
 * Created by bizic on 28/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.User').controller('UserRoleController', UserRoleController);

    UserRoleController.$inject = [
        '$rootScope',
        '$scope',
        '$http',
        '$timeout',
        'settings',
        'UserRoleService',
        '$uibModal',
        'toastr',
        'focus',
        'bsTableAPI',
        'Utilities',
        'blockUI'
    ];

    function UserRoleController ($rootScope, $scope, $http, $timeout, settings, service, modal, toastr, focus, bsTableAPI, utils, blockUI) {
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.modalInstance = null;
        vm.role = null;
        vm.selectedRole = null;
        vm.roles = [];

        // pagination
        vm.pageIndex = 1;
        vm.pageSize = 10;

        vm.bsTableControl = {
            options: {
                data: vm.roles,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: false,
                singleSelect: true,
                showToggle: false,
                pagination: true,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.safeApply(function () {
                        if (!row.sysRole) {
                            vm.selectedRole = row;
                        } else {
                            bsTableAPI('bsTableControl', 'uncheckBy', {field: 'sysRole', values: [true]});
                        }
                    });
                },
                onUncheck: function (row, $element) {
                    $scope.safeApply(function () {
                        vm.selectedRole = null;
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getRoles();
                }
            }
        };

        vm.getRoles = function () {
            blockUI.start();

            service.getRoles(vm.pageIndex, vm.pageSize).then(function(data) {

                blockUI.stop();

                vm.roles = data.content;
                vm.bsTableControl.options.data = vm.roles;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        // Get the role list by default
        vm.getRoles();

        vm.saveRole = function () {

            if (!vm.role) {
                return;
            }

            if (!vm.role.name || vm.role.name.trim() == "") {
                toastr.error('Bạn vui lòng nhập tên vai trò.', 'Thông báo');
                focus('vm.role.name');
                return;
            }

            blockUI.start();
            service.saveRole(vm.role).then(function(data) {

                blockUI.stop();

                if (data) {
                    vm.role = null;
                    if (vm.modalInstance) {
                        vm.modalInstance.close(null);
                    }

                    toastr.info('Đã thêm mới thành công một bản ghi.', 'Thông báo');
                    vm.getRoles();
                } else {
                    toastr.error('Có lỗi xảy ra khi lưu.', 'Thông báo');
                }
            }, function errorCallback(response) {
                blockUI.stop();

                vm.role = null;
                if (vm.modalInstance) {
                    vm.modalInstance.close(null);
                }

                toastr.error('Có lỗi xảy ra khi lưu.', 'Thông báo');
            });
        };

        /**
         * Create a new role
         */
        vm.newRole = function () {
            vm.role = {isNew: true, sysRole: false};

            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_modal.html',
                scope: $scope,
                size: 'md'
            });
        };

        /**
         * Edit an existing role
         * @param roleId
         */
        $scope.editRole = function (roleId) {

            service.getRoleById(roleId).then(function(data) {
                if (data && data.id) {

                    vm.role = data;
                    vm.role.isNew = false;

                    vm.modalInstance = modal.open({
                        animation: true,
                        templateUrl: 'edit_modal.html',
                        scope: $scope,
                        size: 'md'
                    });
                }
            });
        };

        /**
         * Delete a role
         * @param roleId
         */
        vm.deleteRole = function () {

            if (!vm.selectedRole || !vm.selectedRole.id) {
                return;
            }

            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            vm.modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    service.deleteRole(vm.selectedRole, function success() {
                        toastr.info('Đã xóa thành công vai trò [ ' + vm.selectedRole.name + ' ].', 'Thông báo');
                        vm.selectedRole = null;

                        vm.pageIndex = 1;
                        vm.getRoles();
                    }, function failure() {
                        vm.selectedRole = null;
                        toastr.error('Có lỗi xảy ra khi xóa vai trò.', 'Thông báo');
                    });

                }
            }, function () {
                console.log("Modal dismissed.");
            });
        };
    }
})();
