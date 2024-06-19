
(function () {
    'use strict';

    angular.module('Hrm.XacNhanNopPhi').controller('HoSoChiTietController', HoSoChiTietController);

    HoSoChiTietController.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'settings',
        '$uibModal',
        'toastr',
        'blockUI',
        'bsTableAPI',
        'Utilities',
        'focus',
        '$stateParams',
        '$state',
        'XacNhanNopPhiService'
    ];

    function HoSoChiTietController($rootScope, $scope, $timeout, settings, modal, toastr, blockUI, bsTableAPI, utils, focus, $stateParams, $state, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.pageIndex =1;
        vm.pageSize = 25;
        vm.hoSoId = $stateParams.hoSoId;
        
        if (vm.hoSoId != null && vm.hoSoId != '') {
                service.getDataById(vm.hoSoId).then(function (data) {
                    vm.data = data;
                    console.log(data);
                });
		}
        
        vm.back = function() {
        	$state.go('application.XacNhanNopPhi');
		}
        
        vm.kiemTraThongTinNopPhi = function() {

        	vm.modalInstanceKiemTraThongTinNopPhi = modal.open({
                animation: true,
                templateUrl: 'KiemTraThongTinNopPhi_modal.html',
                scope: $scope,
                size: 'lg'
            });
		}
        
        vm.close = function() {
            if (vm.modalInstanceKiemTraThongTinNopPhi != null) {
            	vm.modalInstanceKiemTraThongTinNopPhi.close();
			}
		}
        
        vm.confirm = function(status) {
            service.confirm(vm.data, status , function success() {

                if (vm.modalInstanceKiemTraThongTinNopPhi != null) {
                	vm.modalInstanceKiemTraThongTinNopPhi.close();
    			}
                // Notify
                toastr.info('xác nhận thành công.', 'Thông báo');

            }, function failure() {
                toastr.error('Có lỗi xảy ra khi cập nhật.', 'Thông báo');
            });
		}

        
        vm.reConfirmPopup = function(status) {
            service.confirm(vm.data, status , function success() {

                if (vm.modalInstanceReConfirm != null) {
                	vm.modalInstanceReConfirm.close();
    			}
                if (vm.modalInstanceKiemTraThongTinNopPhi != null) {
                	vm.modalInstanceKiemTraThongTinNopPhi.close();
    			}
                // Notify
                toastr.info('Yêu cầu nộp phí lại thành công.', 'Thông báo');

            }, function failure() {
                toastr.error('Có lỗi xảy ra khi yêu cầu nộp phí lại.', 'Thông báo');
            });
		}
        
        vm.reConfirm = function() {

        	vm.modalInstanceReConfirm = modal.open({
                animation: true,
                templateUrl: 'reConfirm_modal.html',
                scope: $scope,
                size: 'lg'
            });
		}


    }

})();