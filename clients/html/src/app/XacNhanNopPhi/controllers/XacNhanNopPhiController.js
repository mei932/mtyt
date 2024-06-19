
(function () {
    'use strict';

    angular.module('Hrm.XacNhanNopPhi').controller('XacNhanNopPhiController', XacNhanNopPhiController);

    XacNhanNopPhiController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'XacNhanNopPhiService',
        '$state',
        'Upload'
    ];
    angular.module('Hrm.XacNhanNopPhi').directive('myDatePicker', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelController) {

                // Private variables
                var datepickerFormat = 'dd/mm/yyyy',
                    momentFormat = 'DD/MM/YYYY',
                    datepicker,
                    elPicker;

                // Init date picker and get objects http://bootstrap-datepicker.readthedocs.org/en/release/index.html
                datepicker = element.datepicker({
                    autoclose: true,
                    keyboardNavigation: false,
                    todayHighlight: true,
                    format: datepickerFormat
                });
                elPicker = datepicker.data('datepicker').picker;

                // Adjust offset on show
                datepicker.on('show', function (evt) {
                    elPicker.css('left', parseInt(elPicker.css('left')) + +attrs.offsetX);
                    elPicker.css('top', parseInt(elPicker.css('top')) + +attrs.offsetY);
                });

                // Only watch and format if ng-model is present https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
                if (ngModelController) {
                    // So we can maintain time
                    var lastModelValueMoment;

                    ngModelController.$formatters.push(function (modelValue) {
                        //
                        // Date -> String
                        //

                        // Get view value (String) from model value (Date)
                        var viewValue,
                            m = moment(modelValue);
                        if (modelValue && m.isValid()) {
                            // Valid date obj in model
                            lastModelValueMoment = m.clone(); // Save date (so we can restore time later)
                            viewValue = m.format(momentFormat);
                        } else {
                            // Invalid date obj in model
                            lastModelValueMoment = undefined;
                            viewValue = undefined;
                        }

                        // Update picker
                        element.datepicker('update', viewValue);

                        // Update view
                        return viewValue;
                    });

                    ngModelController.$parsers.push(function (viewValue) {
                        //
                        // String -> Date
                        //

                        // Get model value (Date) from view value (String)
                        var modelValue,
                            m = moment(viewValue, momentFormat, true);
                        if (viewValue && m.isValid()) {
                            // Valid date string in view
                            if (lastModelValueMoment) { // Restore time
                                m.hour(lastModelValueMoment.hour());
                                m.minute(lastModelValueMoment.minute());
                                m.second(lastModelValueMoment.second());
                                m.millisecond(lastModelValueMoment.millisecond());
                            }
                            modelValue = m.toDate();
                        } else {
                            // Invalid date string in view
                            modelValue = undefined;
                        }

                        // Update model
                        return modelValue;
                    });

                    datepicker.on('changeDate', function (evt) {
                        // Only update if it's NOT an <input> (if it's an <input> the datepicker plugin trys to cast the val to a Date)
                        if (evt.target.tagName !== 'INPUT') {
                            ngModelController.$setViewValue(moment(evt.date).format(momentFormat)); // $seViewValue basically calls the $parser above so we need to pass a string date value in
                            ngModelController.$render();
                        }
                    });
                }

            }
        };
    });
    function XacNhanNopPhiController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service, $state, Upload) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });
        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;
        vm.name = 'Đăng';
        vm.data = {};
        vm.datas = [];	//list các danh sách hồ sơ
        vm.selectedDatas = [];
        
        vm.pageIndex = 1;
        vm.pageSize = 25;

        vm.getDatas = function () {
            service.getDatas(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.datas = data.content;
                vm.bsTableControl.options.data = vm.datas;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
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
        
        vm.newData = function() {
        	vm.data.isNew = true;

        	vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_data_modal.html',
                scope: $scope,
                size: 'md'
            });
		}
        $scope.edit=function (id) {
            vm.data.isNew  = false;
            vm.chePham={};
            service.getDataById(id).then(function (data) {
                vm.data = data;
                vm.modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_data_modal.html',
                    scope: $scope,
                    size: 'md'
                });
            });
        }
        
        vm.close = function() {
            if (vm.modalInstance != null) {
            	vm.data = {};
            	vm.modalInstance.close();
			}
		}
        
        vm.saveData = function() {

            if (!vm.data.maHoSo || vm.data.maHoSo.trim() == '') {
                toastr.error('Vui lòng nhập mã hồ sơ.', 'Lỗi');
                return;
            }

            if (!vm.data.tenThuTuc || vm.data.tenThuTuc.trim() == '') {
                toastr.error('Vui lòng nhập tên thủ tục hành chính.', 'Lỗi');
                return;
            }

            if (!vm.data.chuHoSo || vm.data.chuHoSo.trim() == '') {
                toastr.error('Vui lòng nhập tên thủ tục hành chính.', 'Lỗi');
                return;
            }
            
            service.saveData(vm.data, function success() {

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
        
        $scope.confirm = function(id) {
			if (id == null || id == '') {
                toastr.error('Có lỗi xảy ra khi xác nhận.', 'Thông báo');
				return;
			}

        	$state.go('application.HoSoChiTiet', { hoSoId: id });
		}

        vm.deleteHoSos = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                backdrop: 'static',
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteHoSos(vm.selectedDatas, function success() {

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

        //-------chế phẩm------//


        vm.isEditChePham = false;
        vm.indexExam=0;
        vm.chePham={};
        vm.createChePham = function(){
            if(vm.validateChePham()){
                if( vm.data.danhSachChePham==null ||  vm.data.danhSachChePham.length==0){
                    vm.data.danhSachChePham=[];
                }
                vm.data.danhSachChePham.push(vm.chePham);
                vm.chePham={};
            }
        }

        vm.validateChePham = function(){
            if(!vm.chePham){
                toastr.warning('Bạn chưa nhập thông tin chế phẩm','Cảnh báo');
                return false;
            }
            if(!vm.chePham.tenThuongMai || vm.chePham.tenThuongMai==''){
                toastr.warning('Chưa nhập tên thương mại','Cảnh báo');
                return false;
            }
            if(!vm.chePham.hamLuongHoatChat || vm.chePham.hamLuongHoatChat==''){
                toastr.warning('Chưa nhập hàm lượng','Cảnh báo');
                return false;
            }
            if(!vm.chePham.soLuong || vm.chePham.soLuong==''){
                toastr.warning('Chưa nhập số lượng','Cảnh báo');
                return false;
            }

            return true;
        }
        vm.beginEditChePham = function(index){
            vm.indexExam = index;
            vm.isEditChePham = true;
            var e = vm.data.danhSachChePham[index];
            if(e.id!=null){
                vm.chePham.id = e.id;
            }
            vm.chePham.tenThuongMai=e.tenThuongMai;
            vm.chePham.hamLuongHoatChat=e.hamLuongHoatChat;
            vm.chePham.tacDung=e.tacDung;
            vm.chePham.tenDiaChiNhaSanXuat=e.tenDiaChiNhaSanXuat;
            vm.chePham.donViTinh=e.donViTinh;
            vm.chePham.soLuong=e.soLuong;

        }
        vm.editChePham = function(){
            vm.isEditChePham = false;
            vm.data.danhSachChePham[vm.indexExam]=vm.chePham;
            vm.chePham={};
        }
        vm.cancelChePham = function () {
            vm.isEditChePham = false;
            vm.chePham = {};
        }
        vm.deleteChePham = function (index) {
            vm.data.danhSachChePham.splice(index,1);
        }

    }

})();