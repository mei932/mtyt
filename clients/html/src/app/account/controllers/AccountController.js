/**
 * Created by bizic on 3/12/2017.
 */
(function () {
    'use strict';

    angular.module('Hrm.Account').controller('AccountController', AccountController);

    AccountController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'AccountService'
    ];

    function AccountController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.account = {};
        vm.accounts = [];
        vm.selectedAccounts = [];

        vm.pageIndex = 0;
        vm.pageSize = 25;

        vm.getAccounts = function () {
            service.getAccounts(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.accounts = data.content;
                vm.bsTableControl.options.data = vm.accounts;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getAccounts();

        vm.bsTableControl = {
            options: {
                data: vm.accounts,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: true,
                showToggle: true,
                pagination: true,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.$apply(function () {
                        vm.selectedAccounts.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedAccounts = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedAccounts);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedAccounts.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedAccounts = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getAccounts();
                }
            }
        };

        /**
         * New event account
         */
        vm.newAccount = function () {

            vm.account.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_account_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.account.accountCode || vm.account.accountCode.trim() == '') {
                        toastr.error('Vui lòng nhập mã tài khoản.', 'Lỗi');
                        return;
                    }

                    if (!vm.account.accountName || vm.account.accountName.trim() == '') {
                        toastr.error('Vui lòng nhập tên tài khoản.', 'Lỗi');
                        return;
                    }

                    service.saveAccount(vm.account, function success() {

                        // Refresh list
                        vm.getAccounts();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.account = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.account = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editAccount = function (accountId) {
            service.getAccount(accountId).then(function (data) {

                vm.account = data;
                vm.account.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_account_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.account.accountCode || vm.account.accountCode.trim() == '') {
                            toastr.error('Vui lòng nhập mã tài khoản.', 'Lỗi');
                            return;
                        }

                        if (!vm.account.accountName || vm.account.accountName.trim() == '') {
                            toastr.error('Vui lòng nhập tên tài khoản.', 'Lỗi');
                            return;
                        }

                        service.saveAccount(vm.account, function success() {

                            // Refresh list
                            vm.getAccounts();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.account = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.account = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteAccounts = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteAccounts(vm.selectedAccounts, function success() {

                        // Refresh list
                        vm.getAccounts();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedAccounts.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedAccounts = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
    }

})();