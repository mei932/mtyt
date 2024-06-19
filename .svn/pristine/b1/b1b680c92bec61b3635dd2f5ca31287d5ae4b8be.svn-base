/**
 * Author Giang 21/04/2018
 */
(function () {
    'use strict';

    angular.module('Hrm.ShiftWork').controller('ShiftWorkController', ShiftWorkController);

    ShiftWorkController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'ShiftWorkService'
    ];

    function ShiftWorkController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.shiftWork = {};
        vm.shiftWorks = [];
        vm.selectedShiftWorks = [];

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
        
        vm.getShiftWorks = function () {
            service.getShiftWorks(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.shiftWorks = data.content;
                vm.bsTableControl.options.data = vm.shiftWorks;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getShiftWorks();

        vm.bsTableControl = {
            options: {
                data: vm.shiftWorks,
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
                        vm.selectedShiftWorks.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedShiftWorks = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedpositiontitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedShiftWorks.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedShiftWorks = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    vm.getShiftWorks();
                }
            }
        };

        /**
         * New event account
         */
        vm.newShiftWork = function () {

            vm.shiftWork.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_shift_work_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.shiftWork.code || vm.shiftWork.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã ca làm việc.', 'Lỗi');
                        return;
                    }

                    if (!vm.shiftWork.name || vm.shiftWork.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên ca làm việc.', 'Lỗi');
                        return;
                    }
                    
                    service.saveShiftWork(vm.shiftWork, function success() {

                        // Refresh list
                        vm.getShiftWorks();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một ca làm việc.', 'Thông báo');

                        // clear object
                        vm.shiftWork = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một ca làm việc.', 'Thông báo');
                    });
                }
            }, function () {
                vm.shiftWork = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editShiftWork = function (shiftWorkId) {
            service.getShiftWork(shiftWorkId).then(function (data) {

                vm.shiftWork = data;
                vm.shiftWork.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_shift_work_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.shiftWork.code || vm.shiftWork.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã ca làm việc.', 'Lỗi');
                            return;
                        }

                        if (!vm.shiftWork.name || vm.shiftWork.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên ca làm việc.', 'Lỗi');
                            return;
                        }

                        service.saveShiftWork(vm.shiftWork, function success() {

                            // Refresh list
                            vm.getShiftWorks();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.shiftWork = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.shiftWork = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteShiftWorks = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedShiftWorks);
                    service.deleteShiftWorks(vm.selectedShiftWorks, function success() {

                        // Refresh list
                        vm.getShiftWorks();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedShiftWorks.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedShiftWorks = [];
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