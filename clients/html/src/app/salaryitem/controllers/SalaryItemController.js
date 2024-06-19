/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryItem').controller('SalaryItemController', SalaryItemController);

    SalaryItemController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'SalaryItemService'
    ];

    function SalaryItemController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.salaryItem = {};
        vm.salaryItems = [];
        vm.selectedSalaryItems = [];

        vm.pageIndex = 1;
        vm.pageSize = 25;
/*
 * Viết thêm loại phần tử lương
 */
        vm.typeOption=[
        	{
        		id:0,
        		name:'Hằng số'
        	},
        	{
        		id:1,
        		name:'Nhập bằng tay'
        	},        	,
        	{
        		id:2,
        		name:'Tính theo công thức'
        	}
        ]
        
        vm.getSalaryItems = function () {
            service.getSalaryItems(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.salaryItems = data.content;
                vm.bsTableControl.options.data = vm.salaryItems;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getSalaryItems();

        vm.bsTableControl = {
            options: {
                data: vm.salaryItems,
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
                        vm.selectedSalaryItems.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSalaryItems = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedpositiontitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedSalaryItems.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSalaryItems = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    vm.getSalaryItems();
                }
            }
        };

        /**
         * New event account
         */
        vm.newSalaryItem = function () {

            vm.salaryItem.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_salary_item_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.salaryItem.code || vm.salaryItem.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã phần tử lương.', 'Lỗi');
                        return;
                    }

                    if (!vm.salaryItem.name || vm.salaryItem.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên phần tử lương.', 'Lỗi');
                        return;
                    }
                    
                    service.saveSalaryItem(vm.salaryItem, function success() {

                        // Refresh list
                        vm.getSalaryItems();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.salaryItem = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.salaryItem = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editSalaryItem = function (salaryItemId) {
            service.getSalaryItem(salaryItemId).then(function (data) {

                vm.salaryItem = data;
                vm.salaryItem.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_salary_item_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.salaryItem.code || vm.salaryItem.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã phần tử lương.', 'Lỗi');
                            return;
                        }

                        if (!vm.salaryItem.name || vm.salaryItem.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên phần tử lương.', 'Lỗi');
                            return;
                        }

                        service.saveSalaryItem(vm.salaryItem, function success() {

                            // Refresh list
                            vm.getSalaryItems();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.salaryItem = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.salaryItem = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteSalaryItems = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedSalaryItems);
                    service.deleteSalaryItems(vm.selectedSalaryItems, function success() {

                        // Refresh list
                        vm.getSalaryItems();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedSalaryItems.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedSalaryItems = [];
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