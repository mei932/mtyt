/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryConfig').controller('SalaryConfigDetailController', SalaryConfigDetailController);

    SalaryConfigDetailController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'SalaryConfigDetailService',
        '$state',
        '$stateParams',
        'SalaryConfigService',
        'SalaryItemService'
    ];

    function SalaryConfigDetailController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service,$state,$stateParams,salaryConfigService,salaryItemService) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;


console.log("bd4");
        vm.pageIndex = 1;
        vm.pageSize = 25;

        vm.salaryConfigId = $stateParams.salaryConfigId | 0;
        vm.salaryConfig = null;
        vm.salaryConfigItems = [];
        vm.salaryConfigItem = null;
        vm.salaryItems = [];
        vm.salaryItem = null;
        getSalaryConfig(vm.salaryConfigId);
        getSalaryItems(1,1000);
        getSalaryConfigItemBySalaryConfigId(vm.salaryConfigId,vm.pageIndex,vm.pageSize);
        
        
        $scope.editSalaryConfig = function (itemOrder,salaryItemName) {
        	vm.salaryConfigItem.salaryItem={};
        	vm.salaryConfigItem.itemOrder=Number(itemOrder);
        	vm.salaryConfigItem.salaryItem.name=salaryItemName;
        }
        
        function getSalaryConfig(salaryConfigId) {
            salaryConfigService.getSalaryConfig(salaryConfigId).then(function (data) {
                vm.salaryConfig = data;
                console.log(data);
            });
        }

        function getSalaryItems(pageIndex,pageSize) {
            salaryItemService.getSalaryItems(pageIndex,pageSize).then(function (data) {
                vm.salaryItems = data.content;
                console.log(data);
            });
        }

        function getSalaryConfigItemBySalaryConfigId(salaryConfigId,pageIndex,pageSize) {
            service.getSalaryConfigItemBySalaryConfigId(salaryConfigId,pageIndex,pageSize).then(function (data) {
                vm.salaryConfigItems = data.content;
                
                if(vm.salaryConfigItem==null){
                	vm.salaryConfigItem = {};
                }
                if(vm.salaryConfigItems.length!=0){
                	vm.salaryConfigItem.itemOrder = Number(vm.salaryConfigItems[vm.salaryConfigItems.length-1].itemOrder) +1;
                }
                if (vm.salaryConfigItems.length==0)
                	vm.salaryConfigItem.itemOrder = 1;
                vm.bsTableControl.options.data = vm.salaryConfigItems;
                vm.bsTableControl.options.totalRows = data.totalElements;
                console.log("getSalaryItemBySalaryConfigId");
                console.log(data);
            });
        }


        function saveSalaryConfig(salaryConfig) {
            salaryConfigService.saveSalaryConfig(salaryConfig).then(function (data) {
                console.log('ok');
                getSalaryConfigItemBySalaryConfigId(vm.salaryConfigId,vm.pageIndex,vm.pageSize);
            },function errorCallback(response) {
                toastr.error('Có lỗi xảy ra khi sửa.', 'Lỗi');
            });
        }

        function validateSalaryItem(item) {
            if(vm.salaryConfigItem == null){
                toastr.warning('Cần phải nhập thông tin phần tử lương','Thông báo');
                return false;
            }
            if(vm.salaryConfigItem.salaryItem == null){
                toastr.warning('Chưa nhập thông tin phần tử lương','Thông báo');
                return false;
            }
            if(vm.salaryConfigItem.itemOrder == null){
                toastr.warning('Chưa nhập thông tin thứ tự','Thông báo');
                return false;
            }
            return true;
        }

        vm.saveSalaryConfig = function () {
            if(vm.salaryConfig != null){
                if(vm.salaryConfig.salaryConfigItems == null){
                    vm.salaryConfig.salaryConfigItems = [];
                }
                vm.salaryConfig.salaryConfigItems = vm.salaryConfigItems;
                toastr.success('Lưu lại thành công', 'Thành Công');
            }
            console.log(vm.salaryConfig);
            saveSalaryConfig(vm.salaryConfig);
        }

        vm.cancel = function () {
            $state.go('application.salaryconfig');
        }
        
        vm.addSalaryConfigItem = function () {
            if(validateSalaryItem(vm.salaryConfigItem)){
                var dup = false;
                console.log(vm.salaryConfigItems);
                for(var i = 0; i < vm.salaryConfigItems.length; i++){
                    if(vm.salaryConfigItem.salaryItem.id == vm.salaryConfigItems[i].salaryItem.id){
                        dup = true;
                        toastr.warning('Đã tồn tại phần tử lương này!', 'Cảnh Báo');
                    }
                    if(vm.salaryConfigItem.itemOrder == vm.salaryConfigItems[i].itemOrder){
                        dup = true;
                        toastr.warning('Đã tồn tại số thứ tự này!', 'Cảnh Báo');
                    }
                    
                }
                if(!dup){
                    // vm.salaryConfigItem.salaryConfig = vm.salaryConfig;
                    vm.salaryConfigItems.push(vm.salaryConfigItem);
                    vm.salaryConfigItem= null;
                   
                    vm.salaryConfigItem = {};
                   
                    vm.salaryConfigItem.itemOrder=Number(vm.salaryConfigItems[vm.salaryConfigItems.length-1].itemOrder)+1;
                    
                    console.log(vm.salaryConfigItems);
                    /*vm.bsTableControl.options.data = vm.salaryConfigItems;
                    vm.bsTableControl.options.totalRows += 1;*/
                }
            }
        }

        vm.onSalaryItemChange = function () {
            console.log(vm.salaryConfigItem);
        }
        
        $scope.goUp = function (itemOrder) {
            var temp = {};
            if(vm.salaryConfigItems[itemOrder - 2] != null && angular.isDefined(vm.salaryConfigItems[itemOrder - 2])){
                temp = vm.salaryConfigItems[itemOrder - 1];

                vm.salaryConfigItems[itemOrder - 1] = vm.salaryConfigItems[itemOrder - 2];
                vm.salaryConfigItems[itemOrder - 1].itemOrder = Number(itemOrder);

                vm.salaryConfigItems[itemOrder - 2] = temp;
                vm.salaryConfigItems[itemOrder - 2].itemOrder = Number(itemOrder) - 1;
                console.log(vm.salaryConfigItems);
                vm.bsTableControl.options.data = vm.salaryConfigItems;
            }
        }
        
        $scope.goDown = function (itemOrder) {
            var temp = {};
            if(vm.salaryConfigItems[itemOrder] != null && angular.isDefined(vm.salaryConfigItems[itemOrder])){
                temp = vm.salaryConfigItems[itemOrder - 1];

                vm.salaryConfigItems[itemOrder - 1] = vm.salaryConfigItems[itemOrder];
                vm.salaryConfigItems[itemOrder - 1].itemOrder = Number(itemOrder);

                vm.salaryConfigItems[itemOrder] = temp;
                vm.salaryConfigItems[itemOrder].itemOrder = Number(itemOrder) +1;
                console.log(vm.salaryConfigItems);
                vm.bsTableControl.options.data = vm.salaryConfigItems;
            }
        }
        
        $scope.editItemOrder=function (itemOrder) {

        	vm.salaryConfigItem.itemOrder=Number(itemOrder);
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_item_order_modal.html',
                scope: $scope,
                size: 'md'
            });
            
            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	
                    if (vm.salaryConfigItem.itemOrder!=null && vm.salaryConfigItem.itemOrder<=vm.salaryConfigItems[vm.salaryConfigItems.length-1].itemOrder && vm.salaryConfigItem.itemOrder>=vm.salaryConfigItems[vm.salaryConfigItems.length-vm.salaryConfigItems.length].itemOrder) {
                    	
                    	var temp= vm.salaryConfigItems[itemOrder-1];
                    	
                    	vm.salaryConfigItems[itemOrder - 1] = vm.salaryConfigItems[vm.salaryConfigItem.itemOrder-1];
                    	vm.salaryConfigItems[itemOrder - 1].itemOrder = Number(temp.itemOrder);
                    	
                    	vm.salaryConfigItems[vm.salaryConfigItem.itemOrder-1] = temp;
                    	vm.salaryConfigItems[vm.salaryConfigItem.itemOrder-1].itemOrder = Number(vm.salaryConfigItem.itemOrder);
                    	vm.bsTableControl.options.data = vm.salaryConfigItems;
                    	toastr.info('Bạn đã đổi thành công số thứ tự.', 'Thông báo');
                    	vm.salaryConfigItem.itemOrder=vm.salaryConfigItems[vm.salaryConfigItems.length-1].itemOrder+1;
                        return;
                        
                    }

                    if (vm.salaryConfigItem.itemOrder==null || vm.salaryConfigItem.itemOrder>vm.salaryConfigItems[vm.salaryConfigItems.length-1].itemOrder || vm.salaryConfigItem.itemOrder<vm.salaryConfigItems[vm.salaryConfigItems.length-vm.salaryConfigItems.length].itemOrder) {
                        toastr.error('Số thứ tự không hợp lệ!', 'Lỗi');
                        return;
                    }
                }
            });
        }

        vm.bsTableControl = {
            options: {
                data: vm.salaryConfigItems,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: false,
                singleSelect: false,
                showToggle: false,
                pagination: true,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.$apply(function () {
                        vm.selectedSubjects.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSubjects = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedSubjects);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedSubjects.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedSubjects = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    // getListSubjectInProgram(vm.educationProgramId,vm.pageIndex,vm.pageSize);
                }
            }
        }
    }

})();