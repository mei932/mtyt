/**
 * Author Giang 21/04/2018
 */
(function () {
    'use strict';

    angular.module('Hrm.TimeSheet').controller('TimeSheetDetailController', TimeSheetDetailController);

    TimeSheetDetailController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'TimeSheetDetailService'
    ];
    angular.module('Hrm.TimeSheet').directive('myDatePicker', function () {
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

    angular.module('Hrm.TimeSheet').directive("gdatepicker", function(){
        return {
            restrict: "E",
            scope:{
                ngModel: "=",
                dateOptions: "=",
                opened: "=",
                id:"="
            },
            link: function($scope, element, attrs) {
                $scope.open = function(event, id){
                    event.preventDefault();
                    event.stopPropagation();
                    //alert('test:'+id);
                    $scope.opened={};
                    $scope.opened[id] = true;
                    //alert($scope.opened[id]);
                };

                $scope.clear = function () {
                    $scope.ngModel = null;
                };
            },
            templateUrl: 'gtemplate/datepicker.html'
        }
    });
    function TimeSheetDetailController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;
        //$scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        vm.timeSheetDetail = {};
        vm.timeSheetDetails = [];
        vm.selectedTimeSheetDetails = [];

        vm.pageIndex = 1;
        vm.pageSize = 25;

        vm.getTimeSheetDetails = function () {
            service.getTimeSheetDetails(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.timeSheetDetails = data.content;
                vm.bsTableControl.options.data = vm.timeSheetDetails;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getTimeSheetDetails();

        vm.bsTableControl = {
            options: {
                data: vm.timeSheetDetails,
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
                        vm.selectedTimeSheetDetails.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedTimeSheetDetails = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedTimeSheetDetails);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedTimeSheetDetails.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedTimeSheetDetails = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    vm.getTimeSheetDetails();
                }
            }
        };

        /**
         * New event account
         */
        vm.newTimeSheetDetail = function () {

            vm.timeSheetDetail.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_time_sheet_modal.html',
                scope: $scope,
                size: 'md'
            });
            vm.timeSheetDetail.startTime= new Date();

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (vm.timeSheetDetail.startTime==null) {
                        toastr.error('Vui lòng nhập thời gian bắt đầu.', 'Lỗi');
                        return;
                    }

                    if (vm.timeSheetDetail.endTime==null) {
                        toastr.error('Vui lòng nhập thời gian kết thúc.', 'Lỗi');
                        return;
                    }
                   
	                    service.saveTimeSheetDetail(vm.timeSheetDetail, function success() {
	
	                        // Refresh list
	                        vm.getTimeSheetDetails();
	
	                        // Notify
	                        toastr.info('Bạn đã tạo mới thành công một thời lượng làm việc.', 'Thông báo');
	
	                        // clear object
	                        vm.timeSheetDetail = {};
	                    }, function failure() {
	                        toastr.error('Có lỗi xảy ra khi thêm mới một thời lượng làm việc.', 'Thông báo');
	                    });
	                 
                }
            }, function () {
                vm.timeSheetDetail = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editTimeSheetDetail = function (timeSheetId) {
            service.getTimeSheetDetail(timeSheetId).then(function (data) {

                vm.timeSheetDetail = data;
                vm.timeSheetDetail.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_time_sheet_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.timeSheetDetail.startTime==null) {
                            toastr.error('Vui lòng nhập thời gian bắt đầu.', 'Lỗi');
                            return;
                        }

                        if (!vm.timeSheetDetail.endTime==null) {
                            toastr.error('Vui lòng nhập thời gian kết thúc.', 'Lỗi');
                            return;
                        }

                        service.saveTimeSheetDetail(vm.timeSheetDetail, function success() {

                            // Refresh list
                            vm.getTimeSheetDetails();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.timeSheetDetail = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.timeSheetDetail = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteTimeSheetDetails = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedTimeSheetDetails);
                    service.deleteTimeSheetDetails(vm.selectedTimeSheetDetails, function success() {

                        // Refresh list
                        vm.getTimeSheetDetails();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedTimeSheetDetails.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedTimeSheetDetails = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.changed = function(){
        	if(vm.timeSheetDetail.startTime!=null && vm.timeSheetDetail.endTime!=null){
        		if(vm.timeSheetDetail.startTime <= vm.timeSheetDetail.endTime)
        		{
        			vm.timeSheetDetail.duration = ((vm.timeSheetDetail.endTime - vm.timeSheetDetail.startTime)/(60*60*1000)).toFixed(2);
        		}
        		else{
        			vm.timeSheetDetail.duration=null;
        			toastr.warning('Vui lòng chọn thời gian kết thúc lớn hơn thời gian bắt đầu', 'Cảnh báo');
        		}
        	}
        }
    }

})();