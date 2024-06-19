/**
 * Created by TA & Giang on 21/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.AcademicTitle').controller('AcademicTitleController', AcademicTitleController);

    AcademicTitleController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'AcademicTitleService'
    ];

    function AcademicTitleController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.academicTitle = {};
        vm.academicTitles = [];
        vm.selectedAcademicTitles = [];

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
        
        vm.getAcademicTitles = function () {
            service.getAcademicTitles(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.academicTitles = data.content;
                vm.bsTableControl.options.data = vm.academicTitles;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getAcademicTitles();

        vm.bsTableControl = {
            options: {
                data: vm.academicTitles,
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
                        vm.selectedAcademicTitles.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedAcademicTitles = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedAcademicTitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedAcademicTitles.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedAcademicTitles = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getAcademicTitles();
                }
            }
        };

        /**
         * New event account
         */
        vm.newAcademicTitle = function () {

            vm.academicTitle.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_academic_title_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.academicTitle.code || vm.academicTitle.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã học hàm học vị.', 'Lỗi');
                        return;
                    }

                    if (!vm.academicTitle.name || vm.academicTitle.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên học hàm học vị.', 'Lỗi');
                        return;
                    }
                    
                    service.saveAcademicTitle(vm.academicTitle, function success() {

                        // Refresh list
                        vm.getAcademicTitles();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một bản ghi.', 'Thông báo');

                        // clear object
                        vm.academicTitle = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một bản ghi.', 'Thông báo');
                    });
                }
            }, function () {
                vm.academicTitle = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editAcademicTitle = function (academicTitleId) {
            service.getAcademicTitle(academicTitleId).then(function (data) {

                vm.academicTitle = data;
                vm.academicTitle.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_academic_title_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.academicTitle.code || vm.academicTitle.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã học hàm học vị.', 'Lỗi');
                            return;
                        }

                        if (!vm.academicTitle.name || vm.academicTitle.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên học hàm học vị.', 'Lỗi');
                            return;
                        }

                        service.saveAcademicTitle(vm.academicTitle, function success() {

                            // Refresh list
                            vm.getAcademicTitles();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.academicTitle = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản nghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.academicTitle = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteAcademicTitles = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedAcademicTitles);
                    service.deleteAcademicTitles(vm.selectedAcademicTitles, function success() {

                        // Refresh list
                        vm.getAcademicTitles();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedAcademicTitles.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedAcademicTitles = [];
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