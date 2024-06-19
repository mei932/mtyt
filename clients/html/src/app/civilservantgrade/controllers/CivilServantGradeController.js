/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantGrade').controller('CivilServantGradeController', CivilServantGradeController);

    CivilServantGradeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'CivilServantGradeService'
    ];

    function CivilServantGradeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.civilservantgrade = {};
        vm.civilservantgrades = [];
        vm.selectedCivilServantGrades = [];

        vm.pageIndex = 0;
        vm.pageSize = 25;

        vm.getCivilServantGrades = function () {
            service.getCivilServantGrades(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.civilservantgrades = data.content;
                vm.bsTableControl.options.data = vm.civilservantgrades;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getCivilServantGrades();

        vm.bsTableControl = {
            options: {
                data: vm.civilservantgrades,
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
                        vm.selectedCivilServantGrades.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedCivilServantGrades = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedCivilServantGrades);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedCivilServantGrades.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedCivilServantGrades = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getCivilServantGrades();
                }
            }
        };

        /**
         * New event account
         */
        vm.newCivilServantGrade = function () {

            vm.civilservantgrade.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_civilservantgrade_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.civilservantgrade.code || vm.civilservantgrade.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã công chức.', 'Lỗi');
                        return;
                    }

                    if (!vm.civilservantgrade.name || vm.civilservantgrade.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên công chức.', 'Lỗi');
                        return;
                    }
                    
                    service.saveCivilServantGrade(vm.civilservantgrade, function success() {

                        // Refresh list
                        vm.getCivilServantGrades();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.civilservantgrade = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.civilservantgrade = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editCivilServantGrade = function (civilservantgradeId) {
            service.getCivilServantGrade(civilservantgradeId).then(function (data) {

                vm.civilservantgrade = data;
                vm.civilservantgrade.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_civilservantgrade_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.civilservantgrade.code || vm.civilservantgrade.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã ngân hàng.', 'Lỗi');
                            return;
                        }

                        if (!vm.civilservantgrade.name || vm.civilservantgrade.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên ngân hàng.', 'Lỗi');
                            return;
                        }
                        
                        service.saveCivilServantGrade(vm.civilservantgrade, function success() {

                            // Refresh list
                            vm.getCivilServantGrades();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.civilservantgrade = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.civilservantgrade = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteCivilServantGrades = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteCivilServantGrades(vm.selectedCivilServantGrades, function success() {

                        // Refresh list
                        vm.getCivilServantGrades();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedCivilServantGrades.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedCivilServantGrades = [];
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