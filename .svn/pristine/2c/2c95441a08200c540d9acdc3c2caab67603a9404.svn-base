
(function () {
    'use strict';

    angular.module('Hrm.ChoMeo').controller('ChoMeoController', ChoMeoController);

    ChoMeoController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'ChoMeoService',
        '$state',
        'Upload'
    ];
   
    
    function ChoMeoController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service, $state, Upload) {
        $scope.$on('$viewContentLoaded', function () {
         
            App.initAjax();
        });
       

        var vm = this;
        vm.newChoMeo={};
        vm.data = {};
        vm.datas = [];	//list các danh sách hồ sơ
        vm.selectedDatas = [];
        vm.modalInstance=null;
        
            vm.getDatas=function(){
                service.getChoMeo().then(function(data){
                vm.datas=data;
                vm.bsTableControl.options.data=vm.datas;
                vm.bsTableControl.options.totalRows=data.totalElements;
            })
        };
        vm.getDatas();

        vm.bsTableControl = {
            options: {
                data: vm.datas,
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
                        vm.selectedDatas.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedDatas = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedDatas);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedDatas.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedDatas = [];
                    });
                },
                
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getDatas();
                }
            }
        };
    
     
        //-------add------//


    
       vm.newChoMeo = function () {

           vm.newChoMeo.isNew = true;

            vm.modalInstance = modal.open({
               animation: true,
               templateUrl: 'edit_data_modal.html',
               scope: $scope,
               size: 'md'
           });

           vm.modalInstance.result.then(function (confirm) {
               if (confirm == 'yes') {

                   if (!vm.data.numberOfFeet|| vm.data.numberOfFeet.trim() == '') {
                       toastr.error('nhập số chân', 'Lỗi');
                       return;
                   }

                   if (!vm.data.weight || vm.data.weight.trim() == '') {
                       toastr.error('nhập cân nặng.', 'Lỗi');
                       return;
                   }
                   if (!vm.data.ages || vm.data.ages.trim() == '') {
                    toastr.error('nhập tuôi.', 'Lỗi');
                    return;
                }
                   
                   service.postChoMeo(vm.ChoMeo, function success() {

                       // Refresh list
                       vm.getChoMeos();

                       // Notify
                       toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                       // clear object
                       vm.ChoMeo = {};
                   }, function failure() {
                       toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                   });
               }
           }, function () {
               vm.ChoMeo = {};
               console.log('Modal dismissed at: ' + new Date());
           });
       };

//--save--/

       vm.saveData=function(){
        if (!vm.data.numberOfFeet|| vm.data.numberOfFeet.trim() == '') {
            toastr.error('nhập số chân', 'Lỗi');
            return;
        }

        if (!vm.data.weight || vm.data.weight.trim() == '') {
            toastr.error('nhập cân nặng.', 'Lỗi');
            return;
        }
        if (!vm.data.ages || vm.data.ages.trim() == '') {
         toastr.error('nhập tuôi.', 'Lỗi');
         return;
        }

        service.postChoMeo(vm.data, function success() {

            // Refresh list
            vm.getDatas();
            if (vm.modalInstance != null) {
                vm.modalInstance.close();
            }
            // Notify
            toastr.info('Bạn đã tạo mới thành công.', 'Thông báo');

            // clear object
            vm.data = {};
        }, function failure() {
            if (vm.data.isNew) {
                toastr.error('Có lỗi xảy ra khi thêm mới.', 'Thông báo');
            }else {
                toastr.error('Có lỗi xảy ra khi cập nhật.', 'Thông báo');
            }
        });

    }

//--xoa--//
vm.deletechomeo = function () {
    var modalInstance = modal.open({
        animation: true,
        templateUrl: 'confirm_delete_modal.html',
        scope: $scope,
        backdrop: 'static',
        size: 'md'
    });

    modalInstance.result.then(function (confirm) {
        if (confirm == 'yes') {
            service.deleteChoMeo(vm.selectedDatas, function success() {

                // Refresh list
                vm.getDatas();

                // Notify
                toastr.info('Bạn đã xóa thành công ' + vm.selectedDatas.length + ' bản ghi.', 'Thông báo');

                // Clear selected accounts
                vm.selectedDatas = [];
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