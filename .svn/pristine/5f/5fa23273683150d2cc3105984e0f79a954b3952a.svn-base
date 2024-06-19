/**
 * Created by TA2 & Giang on 22/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.OvertimeType').controller('OvertimeTypeController', OvertimeTypeController);

    OvertimeTypeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'OvertimeTypeService'
    ];

    function OvertimeTypeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.overtimeType = {};
        vm.overtimeTypes = [];
        vm.selectedOvertimeTypes = [];

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
        
        vm.getOvertimeTypes = function () {
            service.getOvertimeTypes(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.overtimeTypes = data.content;
                vm.bsTableControl.options.data = vm.overtimeTypes;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getOvertimeTypes();

        vm.bsTableControl = {
            options: {
                data: vm.overtimeTypes,
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
                        vm.selectedOvertimeTypes.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedOvertimeTypes = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedOvertimeTypes);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedOvertimeTypes.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedOvertimeTypes = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getOvertimeTypes();
                }
            }
        };

        /**
         * New event account
         */
        vm.newOvertimeType = function () {

            vm.overtimeType.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_overtime_type_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.overtimeType.code || vm.overtimeType.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã làm ngoài giờ.', 'Lỗi');
                        return;
                    }

                    if (!vm.overtimeType.name || vm.overtimeType.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên làm ngoài giờ.', 'Lỗi');
                        return;
                    }
                    
                    service.saveOvertimeType(vm.overtimeType, function success() {

                        // Refresh list
                        vm.getOvertimeTypes();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một bản ghi.', 'Thông báo');

                        // clear object
                        vm.overtimeType = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một bản ghi.', 'Thông báo');
                    });
                }
            }, function () {
                vm.overtimeType = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editOvertimeType = function (overtimeTypeId) {
            service.getOvertimeType(overtimeTypeId).then(function (data) {

                vm.overtimeType = data;
                vm.overtimeType.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_overtime_type_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.overtimeType.code || vm.overtimeType.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã làm ngoài giờ.', 'Lỗi');
                            return;
                        }

                        if (!vm.overtimeType.name || vm.overtimeType.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên làm ngoài giờ.', 'Lỗi');
                            return;
                        }

                        service.saveOvertimeType(vm.overtimeType, function success() {

                            // Refresh list
                            vm.getOvertimeTypes();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.overtimeType = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản nghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.overtimeType = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteOvertimeTypes = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedOvertimeTypes);
                    service.deleteOvertimeTypes(vm.selectedOvertimeTypes, function success() {

                        // Refresh list
                        vm.getOvertimeTypes();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedOvertimeTypes.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedOvertimeTypes = [];
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