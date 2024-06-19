/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantCategoryGrade').controller('CivilServantCategoryGradeController', CivilServantCategoryGradeController);

    CivilServantCategoryGradeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'CivilServantCategoryGradeService'
    ];

    function CivilServantCategoryGradeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.civilservantcategorygrade = {};
        vm.civilservantcategorygrades = [];
        vm.selectedcivilservantcategorygrades = [];

        vm.pageIndex = 0;
        vm.pageSize = 25;

        vm.getCivilServantCategoryGrades = function () {
            service.getCivilServantCategoryGrades(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.CivilServantCategoryGrades = data.content;
                vm.bsTableControl.options.data = vm.CivilServantCategoryGrades;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getCivilServantCategoryGrades();

        vm.bsTableControl = {
            options: {
                data: vm.civilservantcategorygrades,
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
                        vm.selectedcivilservantcategorygrades.push(row);
                        //console.log(vm.selectedcivilservantcategorygrades);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedcivilservantcategorygrades = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedcivilservantcategorygrades);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedcivilservantcategorygrades.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedcivilservantcategorygrades = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getCivilServantCategoryGrades();
                }
            }
        };

        /**
         * New event account
         */
        vm.newCivilServantCategoryGrade = function () {
        	console.log("hello");

            vm.civilservantcategorygrade.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_civilservantcategorygrade_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.civilservantcategorygrade.code || vm.civilservantcategorygrade.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã ngân hàng.', 'Lỗi');
                        return;
                    }

                    if (!vm.civilservantcategorygrade.name || vm.civilservantcategorygrade.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên ngân hàng.', 'Lỗi');
                        return;
                    }
                    
                    if (!vm.civilservantcategorygrade.salaryCoefficient || vm.civilservantcategorygrade.salaryCoefficient.trim() == '') {
                        toastr.error('Vui lòng nhập hệ số lương.', 'Lỗi');
                        return;
                    }
                    
                    service.saveCivilServantCategoryGrade(vm.civilservantcategorygrade, function success() {
                    	
                        // Refresh list
                        vm.getCivilServantCategoryGrades();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.civilservantcategorygrade = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.civilservantcategorygrade = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editCivilServantCategoryGrade = function (civilservantcategorygradeId) {
            service.getCivilServantCategoryGrade(civilservantcategorygradeId).then(function (data) {

                vm.civilservantcategorygrade = data;
                vm.civilservantcategorygrade.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_civilservantcategorygrade_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.civilservantcategorygrade.code || vm.civilservantcategorygrade.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã ngân hàng.', 'Lỗi');
                            return;
                        }

                        if (!vm.civilservantcategorygrade.name || vm.civilservantcategorygrade.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên ngân hàng.', 'Lỗi');
                            return;
                        }
                        
                        if (!vm.civilservantcategorygrade.salaryCoefficient || vm.civilservantcategorygrade.salaryCoefficient.trim() == '') {
                            toastr.error('Vui lòng nhập hệ số lương.', 'Lỗi');
                            return;
                        }

                        service.saveCivilServantCategoryGrade(vm.civilservantcategorygrade, function success() {

                            // Refresh list
                            vm.getCivilServantCategoryGrades();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.civilservantcategorygrade = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.civilservantcategorygrade = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteCivilServantCategoryGrades = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
            	
                if (confirm == 'yes') {
                    service.deleteCivilServantCategoryGrades(vm.selectedcivilservantcategorygrades, function success() {

                        // Refresh list
                        vm.getCivilServantCategoryGrades();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedcivilservantcategorygrades.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedcivilservantcategorygrades = [];
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