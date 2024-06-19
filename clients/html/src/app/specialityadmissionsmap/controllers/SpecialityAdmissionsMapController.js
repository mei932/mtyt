/**
 * Created by nguyen the dat on 23/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SpecialityAdmissionsMap').controller('SpecialityAdmissionsMapController', SpecialityAdmissionsMapController);

    SpecialityAdmissionsMapController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'SpecialityAdmissionsMapService'
    ];

    function SpecialityAdmissionsMapController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.specialityAdmissionsMap = {};
        vm.specialityAdmissionsMaps = [];
        vm.selectedSpecialityAdmissionsMaps = [];    
        vm.specialitys = [];
        vm.speciality = null;
        vm.courseYears = [];
        vm.courseYear = null;
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
        getSpecialitys();
        function getSpecialitys() {
            service.getSpecialitys().then(function (data) {
                vm.specialitys = data;
            });
        }
        getCourseYears();
        function getCourseYears() {
            service.getCourseYears().then(function (data) {
            	vm.courseYears = data.content;
            });
        }
        
        vm.getSpecialityAdmissionsMaps = function () {
            service.getSpecialityAdmissionsMaps(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.specialityAdmissionsMaps = data.content;
                vm.bsTableControl.options.data = vm.specialityAdmissionsMaps;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getSpecialityAdmissionsMaps();

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
                        vm.selectedSpecialityAdmissionsMaps.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSpecialityAdmissionsMaps = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedpositiontitles);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedSpecialityAdmissionsMaps.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSpecialityAdmissionsMaps = [];
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

            vm.specialityAdmissionsMap.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_speciality_admissions_map_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.specialityAdmissionsMap.admissionCode || vm.specialityAdmissionsMap.admissionCode.trim() == '') {
                        toastr.error('Vui lòng nhập Admission Code.', 'Lỗi');
                        return;
                    }

                    if (!vm.specialityAdmissionsMap.speciality || vm.specialityAdmissionsMap.speciality.name.trim() == '') {
                        toastr.error('Vui lòng nhập Speciality.', 'Lỗi');
                        return;
                    }
                    if (!vm.specialityAdmissionsMap.courseYear || vm.specialityAdmissionsMap.courseYear.name.trim() == '') {
                        toastr.error('Vui lòng nhập Course Year.', 'Lỗi');
                        return;
                    }
                    service.saveSpecialityAdmissionsMap(vm.specialityAdmissionsMap, function success() {

                        // Refresh list
                        vm.getSpecialityAdmissionsMaps();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.specialityAdmissionsMap = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.specialityAdmissionsMap = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editSpecialityAdmissionsMap = function (specialityAdmissionsMapId) {
            service.getSpecialityAdmissionsMap(specialityAdmissionsMapId).then(function (data) {
            	console.log(specialityAdmissionsMapId);
                vm.specialityAdmissionsMap = data;
                vm.specialityAdmissionsMap.isNew = false;
                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_speciality_admissions_map_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.specialityAdmissionsMap.admissionCode || vm.specialityAdmissionsMap.admissionCode.trim() == '') {
                            toastr.error('Vui lòng nhập Admission Code.', 'Lỗi');
                            return;
                        }

                        if (!vm.specialityAdmissionsMap.speciality || vm.specialityAdmissionsMap.speciality.name.trim() == '') {
                            toastr.error('Vui lòng nhập Speciality Name.', 'Lỗi');
                            return;
                        }
                        if (!vm.specialityAdmissionsMap.courseYear || vm.specialityAdmissionsMap.courseYear.name.trim() == '') {
                            toastr.error('Vui lòng nhập Course Year.', 'Lỗi');
                            return;
                        }
                        service.saveSpecialityAdmissionsMap(vm.specialityAdmissionsMap, function success() {
                            // Refresh list
                            vm.getSpecialityAdmissionsMaps();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.SpecialityAdmissionsMap = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.specialityAdmissionsMap = {};
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
                	console.log(vm.selectedSpecialityAdmissionsMaps);
                    service.deleteReligions(vm.selectedSpecialityAdmissionsMaps, function success() {

                        // Refresh list
                        vm.getSpecialityAdmissionsMaps();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedSpecialityAdmissionsMaps.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedSpecialityAdmissionsMaps = [];
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