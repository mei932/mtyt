/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.PositionTitle').controller('PositionTitleController', PositionTitleController);

    PositionTitleController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'PositionTitleService'
    ];

    function PositionTitleController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.positiontitle = {};
        vm.positiontitles = [];
        vm.selectedpositiontitles = [];

        vm.pageIndex = 0;
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
        
        vm.getpositiontitles = function () {
            service.getpositiontitles(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.positiontitles = data.content;
                vm.bsTableControl.options.data = vm.positiontitles;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getpositiontitles();

        vm.bsTableControl = {
            options: {
                data: vm.positiontitles,
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
                        vm.selectedpositiontitles.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedpositiontitles = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedpositiontitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedpositiontitles.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedpositiontitles = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;

                    vm.getpositiontitles();
                }
            }
        };

        /**
         * New event account
         */
        vm.newpositiontitle = function () {

            vm.positiontitle.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_positiontitle_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.positiontitle.code || vm.positiontitle.code.trim() == '') {
                        toastr.error('Vui lòng nhập mã chức vụ.', 'Lỗi');
                        return;
                    }

                    if (!vm.positiontitle.name || vm.positiontitle.name.trim() == '') {
                        toastr.error('Vui lòng nhập tên chức vụ.', 'Lỗi');
                        return;
                    }
                    
                    service.savepositiontitle(vm.positiontitle, function success() {

                        // Refresh list
                        vm.getpositiontitles();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.positiontitle = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.positiontitle = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editpositiontitle = function (positiontitleId) {
            service.getpositiontitle(positiontitleId).then(function (data) {

                vm.positiontitle = data;
                vm.positiontitle.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_positiontitle_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.positiontitle.code || vm.positiontitle.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã chức vụ.', 'Lỗi');
                            return;
                        }

                        if (!vm.positiontitle.name || vm.positiontitle.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên chức vụ.', 'Lỗi');
                            return;
                        }

                        service.savepositiontitle(vm.positiontitle, function success() {

                            // Refresh list
                            vm.getpositiontitles();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.positiontitle = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.positiontitle = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deletepositiontitles = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deletepositiontitles(vm.selectedpositiontitles, function success() {

                        // Refresh list
                        vm.getpositiontitles();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedpositiontitles.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedpositiontitles = [];
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