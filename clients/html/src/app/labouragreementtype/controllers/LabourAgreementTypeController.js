/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.LabourAgreementType').controller('LabourAgreementTypeController', LabourAgreementTypeController);

    LabourAgreementTypeController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'LabourAgreementTypeService'
    ];

    function LabourAgreementTypeController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.labouragreementtype = {};
        vm.labouragreementtypes = [];
        vm.selectedlabouragreementtypes = [];

        vm.pageIndex = 1;
        vm.pageSize = 25;

        
        vm.getlabouragreementtypes = function () {
            service.getlabouragreementtypes(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.labouragreementtypes = data.content;
                vm.bsTableControl.options.data = vm.labouragreementtypes;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getlabouragreementtypes();

        vm.bsTableControl = {
            options: {
                data: vm.labouragreementtypes,
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
                        vm.selectedlabouragreementtypes.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedlabouragreementtypes = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedlabouragreementtypes);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedlabouragreementtypes.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedlabouragreementtypes = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getlabouragreementtypes();
                }
            }
        };

        /**
         * New event account
         */
        vm.newlabouragreementtype = function () {

            vm.labouragreementtype.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_labouragreementtype_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.labouragreementtype.code || vm.labouragreementtype.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã hợp đồng.', 'Lỗi');
                        return;
                    }

                    if (!vm.labouragreementtype.name || vm.labouragreementtype.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên hợp đồng.', 'Lỗi');
                        return;
                    }
                    
                    service.savelabouragreementtype(vm.labouragreementtype, function success() {

                        // Refresh list
                        vm.getlabouragreementtypes();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.labouragreementtype = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.labouragreementtype = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editlabouragreementtype = function (labouragreementtypeId) {
            service.getlabouragreementtype(labouragreementtypeId).then(function (data) {

                vm.labouragreementtype = data;
                vm.labouragreementtype.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_labouragreementtype_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.labouragreementtype.code || vm.labouragreementtype.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã hợp đồng.', 'Lỗi');
                            return;
                        }

                        if (!vm.labouragreementtype.name || vm.labouragreementtype.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên hợp đồng.', 'Lỗi');
                            return;
                        }

                        service.savelabouragreementtype(vm.labouragreementtype, function success() {

                            // Refresh list
                            vm.getlabouragreementtypes();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.labouragreementtype = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.labouragreementtype = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deletelabouragreementtypes = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deletelabouragreementtypes(vm.selectedlabouragreementtypes, function success() {

                        // Refresh list
                        vm.getlabouragreementtypes();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedlabouragreementtypes.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedlabouragreementtypes = [];
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