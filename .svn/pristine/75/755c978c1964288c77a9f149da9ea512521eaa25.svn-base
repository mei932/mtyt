/**
 * Created by TA & Giang on 21/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.EducationDegree').controller('EducationDegreeController', EducationDegreeController);

    EducationDegreeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'EducationDegreeService'
    ];

    function EducationDegreeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.educationDegree = {};
        vm.educationDegrees = [];
        vm.selectedEducationDegrees = [];

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
        
        vm.getEducationDegrees = function () {
            service.getEducationDegrees(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.educationDegrees = data.content;
                vm.bsTableControl.options.data = vm.educationDegrees;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getEducationDegrees();

        vm.bsTableControl = {
            options: {
                data: vm.educationDegrees,
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
                        vm.selectedEducationDegrees.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedEducationDegrees = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedEducationDegrees);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedEducationDegrees.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedEducationDegrees = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getEducationDegrees();
                }
            }
        };

        /**
         * New event account
         */
        vm.newEducationDegree = function () {

            vm.educationDegree.isNew = true;  

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_education_degree_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.educationDegree.code || vm.educationDegree.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã bằng cấp.', 'Lỗi');
                        return;
                    }

                    if (!vm.educationDegree.name || vm.educationDegree.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên bằng cấp.', 'Lỗi');
                        return;
                    }
                    
                    service.saveEducationDegree(vm.educationDegree, function success() {

                        // Refresh list
                        vm.getEducationDegrees();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một bản ghi.', 'Thông báo');

                        // clear object
                        vm.educationDegree = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một bản ghi.', 'Thông báo');
                    });
                }
            }, function () {
                vm.educationDegree = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editEducationDegree = function (educationDegreeId) {
            service.getEducationDegree(educationDegreeId).then(function (data) {

                vm.educationDegree = data;
                vm.educationDegree.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_education_degree_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.educationDegree.code || vm.educationDegree.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã bằng cấp.', 'Lỗi');
                            return;
                        }

                        if (!vm.educationDegree.name || vm.educationDegree.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên bằng cấp.', 'Lỗi');
                            return;
                        }

                        service.saveEducationDegree(vm.educationDegree, function success() {

                            // Refresh list
                            vm.getEducationDegrees();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.salaryConfig = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.educationDegreeg = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteEducationDegrees = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedEducationDegrees);
                    service.deleteEducationDegrees(vm.selectedEducationDegrees, function success() {

                        // Refresh list
                        vm.getEducationDegrees();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedEducationDegrees.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedEducationDegrees = [];
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