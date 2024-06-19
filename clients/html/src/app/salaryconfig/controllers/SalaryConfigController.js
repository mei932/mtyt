/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryConfig').controller('SalaryConfigController', SalaryConfigController);

    SalaryConfigController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'SalaryConfigService'
    ];

    function SalaryConfigController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.salaryConfig = {};
        vm.salaryConfigs = [];
        vm.selectedSalaryConfigs = [];

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
        
        vm.getSalaryConfigs = function () {
            service.getSalaryConfigs(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.salaryConfigs = data.content;
                vm.bsTableControl.options.data = vm.salaryConfigs;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getSalaryConfigs();

        vm.bsTableControl = {
            options: {
                data: vm.salaryConfigs,
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
                        vm.selectedSalaryConfigs.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSalaryConfigs = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedSalaryConfigs);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedSalaryConfigs.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSalaryConfigs = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getSalaryConfigs();
                }
            }
        };

        /**
         * New event account
         */
        vm.newSalaryConfig = function () {

            vm.salaryConfig.isNew = true;  

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_salary_config_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.salaryConfig.code || vm.salaryConfig.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã công thức lương.', 'Lỗi');
                        return;
                    }

                    if (!vm.salaryConfig.name || vm.salaryConfig.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên công thức lương.', 'Lỗi');
                        return;
                    }
                    
                    service.saveSalaryConfig(vm.salaryConfig, function success() {
                        console.log(vm.salaryConfig);
                        // Refresh list
                        vm.getSalaryConfigs();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một công thức lương.', 'Thông báo');

                        // clear object
                        vm.salaryConfig = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một công thức lương.', 'Thông báo');
                    });
                }
            }, function () {
                vm.salaryConfig = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editSalaryConfig = function (salaryConfigId) {
            service.getSalaryConfig(salaryConfigId).then(function (data) {

                vm.salaryConfig = data;
                vm.salaryConfig.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_salary_config_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.salaryConfig.code || vm.salaryConfig.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã công thức lương.', 'Lỗi');
                            return;
                        }

                        if (!vm.salaryConfig.name || vm.salaryConfig.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên công thức lương.', 'Lỗi');
                            return;
                        }

                        service.saveSalaryConfig(vm.salaryConfig, function success() {

                            // Refresh list
                            vm.getSalaryConfigs();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.salaryConfig = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.salaryConfig = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteSalaryConfigs = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedSalaryConfigas);
                    service.deleteSalaryConfigs(vm.selectedSalaryConfigs, function success() {

                        // Refresh list
                        vm.getSalaryConfigs();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedSalaryConfigs.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedSalaryConfigs = [];
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