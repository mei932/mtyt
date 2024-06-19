/**
 * Created by nguyen the dat on 23/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.Religion').controller('ReligionController', ReligionController);

    ReligionController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'ReligionService'
    ];

    function ReligionController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.religion = {};
        vm.religions = [];
        vm.selectedReligions = [];

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
        
        vm.getReligions = function () {
            service.getReligions(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.religions = data.content;
                vm.bsTableControl.options.data = vm.religions;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getReligions();

        vm.bsTableControl = {
            options: {
                data: vm.religions,
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
                        vm.selectedReligions.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedReligions = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedpositiontitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedReligions.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedReligions = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    vm.getReligions();
                }
            }
        };

        /**
         * New event account
         */
        vm.newReligion = function () {

            vm.religion.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_religion_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.religion.code || vm.religion.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã phần tử lương.', 'Lỗi');
                        return;
                    }

                    if (!vm.religion.name || vm.religion.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên phần tử lương.', 'Lỗi');
                        return;
                    }
                    
                    service.saveReligion(vm.religion, function success() {

                        // Refresh list
                        vm.getReligions();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.religion = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.religion = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editReligion = function (religionId) {
            service.getReligion(religionId).then(function (data) {

                vm.religion = data;
                vm.religion.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_religion_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.religion.code || vm.religion.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã phần tử lương.', 'Lỗi');
                            return;
                        }

                        if (!vm.religion.name || vm.religion.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên phần tử lương.', 'Lỗi');
                            return;
                        }

                        service.saveReligion(vm.religion, function success() {

                            // Refresh list
                            vm.getReligions();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.religion = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.religion = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteReligions = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedReligions);
                    service.deleteReligions(vm.selectedReligions, function success() {

                        // Refresh list
                        vm.getReligions();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedReligions.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedReligions = [];
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