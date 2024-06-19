/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantCategory').controller('CivilServantCategoryController', CivilServantCategoryController);

    CivilServantCategoryController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'CivilServantCategoryService'
    ];

    function CivilServantCategoryController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.civilservantcategory = {};
        vm.civilservantcategorys = [];
        vm.selectedCivilServantCategorys = [];

        vm.pageIndex = 0;
        vm.pageSize = 25;

        vm.getCivilServantCategorys = function () {
            service.getCivilServantCategorys(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.civilservantcategorys = data.content;
                vm.bsTableControl.options.data = vm.civilservantcategorys;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getCivilServantCategorys();

        vm.bsTableControl = {
            options: {
                data: vm.civilservantcategorys,
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
                        vm.selectedCivilServantCategorys.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedCivilServantCategorys = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedCivilServantCategorys);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedCivilServantCategorys.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedCivilServantCategorys = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getCivilServantCategorys();
                }
            }
        };

        /**
         * New event account
         */
        vm.newCivilServantCategory = function () {

            vm.civilservantcategory.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_civilservantcategory_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.civilservantcategory.code || vm.civilservantcategory.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã ngân hàng.', 'Lỗi');
                        return;
                    }

                    if (!vm.civilservantcategory.name || vm.civilservantcategory.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên ngân hàng.', 'Lỗi');
                        return;
                    }
                    
                    service.saveCivilServantCategory(vm.civilservantcategory, function success() {

                        // Refresh list
                        vm.getCivilServantCategorys();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.civilservantcategory = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.civilservantcategory = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editCivilServantCategory = function (civilservantcategoryId) {
            service.getCivilServantCategory(civilservantcategoryId).then(function (data) {

                vm.civilservantcategory = data;
                vm.civilservantcategory.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_civilservantcategory_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.civilservantcategory.code || vm.civilservantcategory.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã ngân hàng.', 'Lỗi');
                            return;
                        }

                        if (!vm.civilservantcategory.name || vm.civilservantcategory.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên ngân hàng.', 'Lỗi');
                            return;
                        }

                        service.saveCivilServantCategory(vm.civilservantcategory, function success() {

                            // Refresh list
                            vm.getCivilServantCategorys();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.civilservantcategory = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.civilservantcategory = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteCivilServantCategorys = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteCivilServantCategorys(vm.selectedCivilServantCategorys, function success() {

                        // Refresh list
                        vm.getCivilServantCategorys();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedCivilServantCategorys.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedCivilServantCategorys = [];
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