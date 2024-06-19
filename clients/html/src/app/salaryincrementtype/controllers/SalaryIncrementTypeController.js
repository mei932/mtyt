/**
 * Created by TA2 & Giang on 23/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryIncrementType').controller('SalaryIncrementTypeController', SalaryIncrementTypeController);

    SalaryIncrementTypeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'SalaryIncrementTypeService'
    ];

    function SalaryIncrementTypeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.salaryIncrementType = {};
        vm.salaryIncrementTypes = [];
        vm.selectedSalaryIncrementTypes = [];

        vm.pageIndex = 1;
        vm.pageSize = 25;

        vm.typeOption=[
        	{
        		id:1,
        		name:'Chính Quyền'
        	},
        	{
        		id:2,
        		name:'Đoàn thể'
        	}
        ]
        
        vm.getSalaryIncrementTypes = function () {
            service.getSalaryIncrementTypes(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.salaryIncrementTypes = data.content;
                vm.bsTableControl.options.data = vm.salaryIncrementTypes;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getSalaryIncrementTypes();

        vm.bsTableControl = {
            options: {
                data: vm.salaryIncrementTypes,
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
                        vm.selectedSalaryIncrementTypes.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.salaryIncrementTypes = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedSalaryIncrementTypes);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedSalaryIncrementTypes.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSalaryIncrementTypes = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getSalaryIncrementTypes();
                }
            }
        };

        /**
         * New event account
         */
        vm.newSalaryIncrementType = function () {

            vm.salaryIncrementType.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_salary_increment_type_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.salaryIncrementType.code || vm.salaryIncrementType.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã loại tăng lương.', 'Lỗi');
                        return;
                    }

                    if (!vm.salaryIncrementType.name || vm.salaryIncrementType.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên loại tăng lương.', 'Lỗi');
                        return;
                    }
                    
                    service.saveSalaryIncrementType(vm.salaryIncrementType, function success() {

                        // Refresh list
                        vm.getSalaryIncrementTypes();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một bản ghi.', 'Thông báo');

                        // clear object
                        vm.SalaryIncrementType = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một bản ghi.', 'Thông báo');
                    });
                }
            }, function () {
                vm.salaryIncrementType = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editSalaryIncrementType = function (salaryIncrementTypeId) {
            service.getSalaryIncrementType(salaryIncrementTypeId).then(function (data) {

                vm.salaryIncrementType = data;
                vm.salaryIncrementType.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_salary_increment_type_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.salaryIncrementType.code || vm.salaryIncrementType.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã loại tăng lương.', 'Lỗi');
                            return;
                        }

                        if (!vm.salaryIncrementType.name || vm.salaryIncrementType.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên loại tăng lương.', 'Lỗi');
                            return;
                        }

                        service.saveSalaryIncrementType(vm.salaryIncrementType, function success() {

                            // Refresh list
                            vm.getSalaryIncrementTypes();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.salaryIncrementType = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản nghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.salaryIncrementType = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteSalaryIncrementTypes = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedSalaryIncrementTypes);
                    service.deleteSalaryIncrementTypes(vm.selectedSalaryIncrementTypes, function success() {

                        // Refresh list
                        vm.getSalaryIncrementTypes();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedSalaryIncrementTypes.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedSalaryIncrementTypes = [];
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