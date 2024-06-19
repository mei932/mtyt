/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.Staff').controller('StaffController', StaffController);

    StaffController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'StaffService',
        'Upload',
        'PositionTitleService',
        'DepartmentService'
    ];

    angular.module('Hrm').filter('propsFiltersForProvince', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    if (item.name != null) {
                        var itemMatches = false;

                        var keys = Object.keys(props);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    });

    angular.module('Hrm.Staff').directive('myDatePicker', function () {
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

    function StaffController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service, Upload,positionTitleService,departmentService) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });
        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        $scope.ac = function () {
            return true;
        };

        var vm = this;

        vm.treeData = [];
        $scope.treeInstance = null;
        $scope.treeConfig = {
            core: {
                error: function (error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback: true
            },
            plugins: ['types', 'state', 'search']
        };

        vm.isChangePassword = false;
        vm.staff = {};
        vm.staffs = [];
        vm.selectedStaffs = [];
        vm.gender = null;
        vm.genders = [
            {value: 'M', name: 'Nam'},
            {value: 'F', name: 'Nữ'},
            {value: 'U', name: 'Khác'}
        ];
        vm.pageIndex = 1;
        vm.pageSize = 25;

        $scope.readyCB = function () {
//            service.getDepartmentTree().then(function (data) {
//          	  $scope.treeData = data;
//                console.log($scope.treeData);
//            });
//            $timeout(function(){
//
//              $scope.treeData.push({ id : "1", parent : "#", text : 'Main'});
//              $scope.treeData.push({ id : "2", parent : "1", text : 'Level 1'});
//              $scope.treeData.push({ id : "7", parent : "3", text : 'Missing Level 3'});
//              $scope.treeData.push({ id : "3", parent : "2", text : 'Level 2'});
//            }, 500);
        }
        $scope.selectNode = function (node, selected, event) {
            //console.log(selected.node.id);
            //console.log(selected.node.text);
            if(vm.staffSearchDto.department == null){
                vm.staffSearchDto.department = {};
            }
            vm.staffSearchDto.department.id = selected.node.id;
            vm.searchByDto();
        }

        $scope.search = '';

        $scope.applySearch = function (){
            var to = false;
            if(to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                if($scope.treeInstance) {
                    //console.log('here');
                    $scope.treeInstance.jstree(true).search($scope.search);
                }
            }, 250);
        };

        function getDepartment() {
            //vm.treeData = [];
            service.getDepartmentTree().then(function (data) {
                vm.treeData = data;
                $scope.treeConfig.version++;
            });

            // vm.treeData=[{ id : "1", parent : "#", text : 'Main'},{ id : "2", parent : "#", text : 'Level 1'}];

//        vm.treeData.push({ id : "2", parent : "1", text : 'Level 1'});
//        vm.treeData.push({ id : "7", parent : "3", text : 'Missing Level 3'});
//        vm.treeData.push({ id : "3", parent : "2", text : 'Level 2'});
        }

        function getEthnics() {
            service.getEthnics().then(function (data) {
                vm.ethnics = data.content;
                //console.log(data);
            });
        }

        function getReligions() {
            service.getReligions().then(function (data) {
                vm.religions = data.content;
                //console.log(data);
            });
        }

        function getRoles() {
            service.getRoles().then(function (data) {
                vm.roles = data.content;
                //console.log(data);
            });
        }

        vm.getStaffs = function () {
            service.getStaffs(vm.pageIndex, vm.pageSize).then(function (data) {
                vm.staffs = data.content;
                //console.log(data);
                vm.bsTableControl.options.data = vm.staffs;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };
        vm.roles = [];
        vm.countries = [];
        vm.provinces = [];
        vm.cities = [];
        vm.subjects = [];
        vm.ethnics = [];
        vm.ethnic = null;
        vm.religions = [];
        vm.religion = null;
        vm.roles = [];
        vm.role = null;
        getDepartment();
        getEthnics();
        getReligions();
        getRoles();

        vm.nameChange = function () {
            if (vm.staff != null) {
                if (!angular.isUndefined(vm.staff.lastName)) {
                    vm.staff.displayName = vm.staff.lastName;
                }
                if (!angular.isUndefined(vm.staff.firstName)) {
                    vm.staff.displayName = vm.staff.lastName + ' ' + vm.staff.firstName;
                }
                if (vm.staff.lastName == '') {
                    vm.staff.displayName = vm.staff.displayName.trim();
                }
                if (vm.staff.firstName == '') {
                    vm.staff.displayName = vm.staff.displayName.trim();
                }
                /*if(!angular.isUndefined(vm.staff.studentCode)){
                 if(vm.staff.user == null){
                 vm.staff.user = {};
                 }
                 vm.staff.user.username = vm.staff.studentCode;
                 }*/
            }
        }

        vm.getStaffs();

        vm.bsTableControl = {
            options: {
                data: vm.staffs,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: false,
                showToggle: false,
                pagination: true,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.$apply(function () {
                        vm.selectedStaffs.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedStaffs = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selectedStaffs);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selectedStaffs.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selectedStaffs = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getStaffs();
                }
            }
        };

        /**
         * New event account
         */
        vm.isAdd = false;
        vm.isEdit = false;
        vm.isView = false;
        vm.checkViewUserTab = function (isAdd, isEdit, isView) {
            vm.isAdd = isAdd;
            vm.isEdit = isEdit;
            vm.isView = isView;
        }
        vm.newStaff = function () {
            vm.checkViewUserTab(true, false, false);
            vm.staff.isNew = true;
//            vm.isChangePassword = true;
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_staff_modal.html',
                scope: $scope,
                size: 'lg'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {

                    if (!vm.staff.staffCode || vm.staff.staffCode.trim() == '') {
                        toastr.error('Vui lòng nhập mã công chức.', 'Lỗi');
                        return;
                    }

//                    if (!vm.staff.displayName || vm.staff.displayName.trim() == '') {
//                        toastr.error('Vui lòng nhập tên chức vụ.', 'Lỗi');
//                        return;
//                    }

                    service.saveStaff(vm.staff, function success() {

                        // Refresh list
                        vm.getStaffs();

                        // Notify
                        toastr.info('Bạn đã tạo mới thành công một tài khoản.', 'Thông báo');

                        // clear object
                        vm.staff = {};
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi thêm mới một tài khoản.', 'Thông báo');
                    });
                }
            }, function () {
                vm.staff = {};
                console.log('Modal dismissed at: ' + new Date());
            });
//            vm.isChangePassword = false;
        };

        /**
         * Edit a account
         * @param accountId
         */
        $scope.editStaff = function (staffId) {
            vm.checkViewUserTab(false, true, false);
            service.getStaff(staffId).then(function (data) {

                vm.staff = data;
                //console.log(data);
                vm.staff.isNew = false;

                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_staff_modal.html',
                    scope: $scope,
                    size: 'lg'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.staff.staffCode || vm.staff.staffCode.trim() == '') {
                            toastr.error('Vui lòng nhập mã chức vụ.', 'Lỗi');
                            return;
                        }
                        service.updateStaff(staffId, vm.staff, function success() {
                            // Refresh list
                            vm.getStaffs();
                            // Notify
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                            // clear object
                            vm.staff = {};
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin tài khoản.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.staff = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };
        vm.saveStaff = function () {
            alert('Save Staff');
        }
        /**
         * Delete accounts
         */
        vm.deleteStaffs = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteStaffs(vm.selectedStaffs, function success() {

                        // Refresh list
                        vm.getStaffs();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selectedStaffs.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selectedStaffs = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        //// Upload file
        $scope.MAX_FILE_SIZE = '2MB';
        $scope.f = null;
        $scope.errFile = null;

        $scope.uploadFiles = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
        };

        vm.baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        vm.startUploadFile = function (file) {
            console.log(file);
            if (file) {
                file.upload = Upload.upload({
                    url: vm.baseUrl + 'hr/file/importStaff',
                    data: {uploadfile: file}
                });

                file.upload.then(function (response) {
                    console.log(response);
                    file.result = response.data;
                    vm.getStaffs();
                    toastr.info('Import thành công.', 'Thông báo');
                }, function errorCallback(response) {
                    toastr.error('Import lỗi.', 'Lỗi');
                });
            }
        };

        vm.importStaff = function () {
            var modalInstance = modal.open({
                animation: true,
                templateUrl: 'import_modal.html',
                scope: $scope,
                size: 'md'
            });

            vm.student = {};
            $scope.f = null;
            $scope.errFile = null;

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    vm.startUploadFile($scope.f);
                    console.log($scope.f);
                }
            }, function () {
                vm.educationProgram = null;
                vm.address = {};
                console.log("cancel");
            });
        }

        //search staff
        function getStaffByCode(textSearch, pageIndex, pageSize) {
            service.getStaffByCode(textSearch, pageIndex, pageSize).then(function (data) {
                vm.staffs = data.content;
                console.log(data);
                vm.bsTableControl.options.data = vm.staffs;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        }

        vm.textSearch = '';
        vm.searchByCode = function () {
            vm.textSearch = String(vm.textSearch).trim();
            if (vm.textSearch != '') {
                getStaffByCode(vm.textSearch, vm.pageIndex, vm.pageSize);
            }
            if (vm.textSearch == '') {
                vm.getStaffs();
            }
        }

        //staff position
        vm.positionTitles = [];
        vm.positionTitle = null;

        vm.positions = [];

        vm.departments = [];
        vm.department = null;

        vm.staffPosition = {};
        vm.staffPositions = [];

        vm.staffSearchDto = {};

//        vm.positionTitleService = function () {
//            positionTitleService.getpositiontitles(0, 10000).then(function (data) {
//                vm.positionTitles = data.content;
//                // console.log('here: ' + vm.positionTitles.length);
//            });
//        };
        //vm.positionTitleService();
        vm.getPositionTitle = function(){
            service.getPositionTitles().then(function (data) {
                vm.positionTitles = data.content;
                console.log(data);
                // console.log('here: ' + vm.positionTitles.length);
            });
        }
        vm.getPositionTitle();
        vm.getPositions = function () {
            service.getPositions().then(function (data) {
                vm.positions = data.content;
                console.log(data);
                // console.log('here: ' + vm.positionTitles.length);
            });
        };
        vm.getPositions();

        vm.listAllDepartment = function () {
            departmentService.listAllDepartment().then(function (data) {
                vm.departments = data;
            });
        };
        vm.listAllDepartment();
        
        vm.addStaffPosition = function () {
            if(vm.staff.positions == null){
                vm.staff.positions = [];
            }
            vm.staff.positions.push(vm.staffPosition);
            vm.staffPosition = {};
        };

        vm.removeStaffPosition = function (index) {
            vm.staff.positions.splice(index,1);
        };

        vm.setMainPosition = function (index) {
            if(vm.staff.positions != null){
                for(var i = 0; i < vm.staff.positions.length; i++){
                    if(i != index){
                        if(vm.staff.positions[index].mainPosition == true){
                            vm.staff.positions[i].mainPosition = false;
                        }
                    }
                }
            }
        };

        vm.setCurrent = function (index) {
            if(vm.staff.positions != null){
                for(var i = 0; i < vm.staff.positions.length; i++){
                    if(i != index){
                        if(vm.staff.positions[index].current == true){
                            vm.staff.positions[i].current = false;
                        }
                    }
                }
            }
        };

        vm.searchByDto = function () {
            vm.pageIndex = 1;
            vm.bsTableControl.state.pageNumber = 1;
            service.searchDto(vm.staffSearchDto,vm.pageIndex,vm.pageSize).then(function (data) {
                vm.staffs = data.content;
                vm.bsTableControl.options.data = vm.staffs;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };
    }

})();