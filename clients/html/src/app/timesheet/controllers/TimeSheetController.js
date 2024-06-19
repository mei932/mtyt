/**
 * Author Giang 21/04/2018
 */
(function () {
    'use strict';

    angular.module('Hrm.TimeSheet').controller('TimeSheetController', TimeSheetController);

    TimeSheetController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'TimeSheetService'
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
    function TimeSheetController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service) {
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
        vm.timeSheet = {};
        vm.timeSheets = [];
        vm.selectedTimeSheets = [];
        
        vm.staff = {};
        vm.staffs = [];
        vm.selectedStaff=null;
        var name=null;
        
        vm.pageIndexStaff = 1;
        vm.pageSizeStaff = 10;

        vm.pageIndex = 1;
        vm.pageSize = 25;

        vm.getTimeSheets = function () {
            service.getTimeSheets(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.timeSheets = data.content;
                vm.bsTableControl.options.data = vm.timeSheets;
                console.log(vm.timeSheets);
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getTimeSheets();

        vm.bsTableControl = {
            options: {
                data: vm.timeSheets,
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
                        vm.selectedTimeSheets.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedTimeSheets = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedTimeSheets);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedTimeSheets.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedTimeSheets = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;
                    vm.getTimeSheets();
                }
            }
        };
        
        vm.bsTableControlSearchStaff = {
                options: {
                    data: vm.staffs,
                    idField: 'id',
                    sortable: true,
                    striped: true,
                    maintainSelected: true,
                    clickToSelect: false,
                    singleSelect: true,
                    showColumns: false,
                    showToggle: false,
                    pagination: true,
                    pageSize: vm.pageSizeStaff,
                    pageList: [5, 10, 25, 50, 100],
                    locale: settings.locale,
                    sidePagination: 'server',
                    columns: service.getTableDefinitionSearchStaff(),
                    onCheck: function (row, $element) {
                        $scope.$apply(function () {
                        	vm.selectedStaff = row;
                        	console.log(vm.selectedStaff);
                        });
                    },                    
                    onUncheck: function (row, $element) {
                    	vm.selectedStaff = null;
                    	console.log(vm.selectedStaff);
                    },
                    onPageChange: function (index, pageSize) {
                    	vm.pageSizeStaff = pageSize;
                        vm.pageIndexStaff = index;
                        vm.selectedStaff = null;
                        vm.searchStaffByName();
                    }
                }
            };
        
        vm.getUserInfo = function() {
        	service.getCurrentUser().then(function(data){
        		$rootScope.currentUser = data;
        		vm.timeSheet.employee=$rootScope.currentUser.person;
        	})
        }

        /**
         * New event account
         */
        vm.newTimeSheet = function () {

            vm.timeSheet.isNew = true;

            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_time_sheet_modal.html',
                scope: $scope,
                size: 'md'
            });
            vm.getUserInfo();
            vm.timeSheet.startTime= new Date();
            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.timeSheet.startTime==null) {
                        toastr.error('Vui lòng nhập thời gian bắt đầu.', 'Lỗi');
                        return;
                    }

                    if (!vm.timeSheet.endTime==null) {
                        toastr.error('Vui lòng nhập thời gian kết thúc.', 'Lỗi');
                        return;
                    }
                    
                    service.saveTimeSheet(vm.timeSheet, function success() {
                    	console.log(vm.timeSheet);
                        // Refresh list
                        vm.getTimeSheets();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công.', 'Thông báo');

                        // clear object
                        vm.timeSheet = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới.', 'Thông báo');
                    });
                }
            }, function () {
                vm.timeSheet = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editTimeSheet = function (timeSheetId) {
            service.getTimeSheet(timeSheetId).then(function (data) {

                vm.timeSheet = data;
                vm.timeSheet.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_time_sheet_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.timeSheet.startTime==null) {
                            toastr.error('Vui lòng nhập thời gian bắt đầu.', 'Lỗi');
                            return;
                        }

                        if (!vm.timeSheet.endTime==null) {
                            toastr.error('Vui lòng nhập thời gian kết thúc.', 'Lỗi');
                            return;
                        }

                        service.saveTimeSheet(vm.timeSheet, function success() {

                            // Refresh list
                            vm.getTimeSheets();

                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');

                            // clear object
                            vm.timeSheet = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin bản ghi.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.timeSheet = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        /**
         * Delete accounts
         */
        vm.deleteTimeSheets = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	console.log(vm.selectedTimeSheets);
                    service.deleteTimeSheets(vm.selectedTimeSheets, function success() {

                        // Refresh list
                        vm.getTimeSheets();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedTimeSheets.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedTimeSheets = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        $scope.remoteUrlRequestFn = function(str) {
            return {textSearch: str};
          };
        
        $scope.localSearch = function(str, people) {
//	      	service.searchStaffs(str).then(function (data) {
//	            vm.staffs = data.content;
//	        }); 
//          return vm.staffs;
            var matches = [];
            people.forEach(function(person) {
              var fullName = person.firstName + ' ' + person.surname;
              if ((person.firstName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
                  (person.surname.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
                  (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
                matches.push(person);
              }
            });
            return matches;
        };

        $scope.people = [
          {firstName: "Daryl", surname: "Rowland", twitter: "@darylrowland", pic: "img/daryl.jpeg"},
          {firstName: "Alan", surname: "Partridge", twitter: "@alangpartridge", pic: "img/alanp.jpg"},
          {firstName: "Annie", surname: "Rowland", twitter: "@anklesannie", pic: "img/annie.jpg"}
        ];
        $scope.search = function(str) {
        	return service.searchStaffs(str);
        };
        
        
        vm.openSearchStaffModal = function(){
        	var modalInstance = modal.open({
                animation: true,
                templateUrl: 'search_staff_modal.html',
                scope: $scope,
                size: 'sm'
            });
        	
        	modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                	if(vm.selectedStaff != null){
                		vm.timeSheet.employee= vm.selectedStaff;
                	}
                	vm.bsTableControlSearchStaff.options.data = [];
                    vm.bsTableControlSearchStaff.options.totalRows = 0;
                    vm.staff={};
                    vm.selectedStaff=null;
                    vm.pageIndexStaff=1;
                    vm.pageSizeStaff=10;
                }
            }, function () {
            	vm.bsTableControlSearchStaff.options.data = [];
                vm.bsTableControlSearchStaff.options.totalRows = 0;
                vm.staff={};
                vm.selectedStaff=null;
                vm.pageIndexStaff=1;
                vm.pageSizeStaff=10;
            });
        }
        
        vm.findStaff = function(){
        	vm.pageIndexStaff=1;
    		vm.bsTableControlSearchStaff.state.pageNumber = 1;
    		name=vm.staff.displayName;
    		if (name!=null && name!='')
    			vm.searchStaffByName();
        }
        
        vm.searchStaffByName = function (){
        	 service.searchStaffByName(name,vm.pageIndexStaff, vm.pageSizeStaff).then(function (data) {
                 vm.staffs = data.content;
                 vm.bsTableControlSearchStaff.options.data = vm.staffs;
                 vm.bsTableControlSearchStaff.options.totalRows = data.totalElements;
             });
        }
        vm.changed = function(){
        	if(vm.timeSheet.startTime!=null && vm.timeSheet.endTime!=null){
        		if(vm.timeSheet.startTime <= vm.timeSheet.endTime)
        		{
        			vm.timeSheet.totalHours = ((vm.timeSheet.endTime - vm.timeSheet.startTime)/(60*60*1000)).toFixed(2);
        		}
        		else{
        			vm.timeSheet.totalHours=null;
        			toastr.warning('Vui lòng chọn thời gian kết thúc lớn hơn thời gian bắt đầu', 'Cảnh báo');
        		}
        	}
        }
    }

})();