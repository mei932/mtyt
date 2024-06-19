/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.Department').controller('DepartmentController', DepartmentController);

    DepartmentController.$inject = [
        '$rootScope',
        '$scope',
        'toastr',
        '$timeout',
        'settings',
        'Utilities',
        '$uibModal',
        'DepartmentService',
        'Upload'
    ];

    angular.module('Hrm.Department').directive('fileDownload', function () {
        return {
            restrict: 'A',
            scope: {
                fileDownload: '=',
                fileName: '=',
            },

            link: function (scope, elem, atrs) {


                scope.$watch('fileDownload', function (newValue, oldValue) {

                    if (newValue != undefined && newValue != null) {
                        console.debug('Downloading a new file');
                        var isFirefox = typeof InstallTrigger !== 'undefined';
                        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                        var isIE = /*@cc_on!@*/false || !!document.documentMode;
                        var isEdge = !isIE && !!window.StyleMedia;
                        var isChrome = !!window.chrome && !!window.chrome.webstore;
                        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                        var isBlink = (isChrome || isOpera) && !!window.CSS;

                        if (isFirefox || isIE || isChrome) {
                            if (isChrome) {
                                console.log('Manage Google Chrome download');
                                var url = window.URL || window.webkitURL;
                                var fileURL = url.createObjectURL(scope.fileDownload);
                                var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
                                downloadLink.attr('href', fileURL);
                                downloadLink.attr('download', scope.fileName);
                                downloadLink.attr('target', '_self');
                                downloadLink[0].click();//call click function
                                url.revokeObjectURL(fileURL);//revoke the object from URL
                            }
                            if (isIE) {
                                console.log('Manage IE download>10');
                                window.navigator.msSaveOrOpenBlob(scope.fileDownload, scope.fileName);
                            }
                            if (isFirefox) {
                                console.log('Manage Mozilla Firefox download');
                                var url = window.URL || window.webkitURL;
                                var fileURL = url.createObjectURL(scope.fileDownload);
                                var a = elem[0];//recover the <a> tag from directive
                                a.href = fileURL;
                                a.download = scope.fileName;
                                a.target = '_self';
                                a.click();//we call click function
                            }


                        } else {
                            alert('SORRY YOUR BROWSER IS NOT COMPATIBLE');
                        }
                    }
                });

            }
        }
    });

    function DepartmentController($rootScope, $scope, toastr, $timeout, settings, utils, modal, service, Upload) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;


        var vm = this;

        vm.department = {};
        vm.departmentDetail = {};
        vm.departmentChild = {};
        vm.departments = [];
        vm.childrens = [];
        vm.selecteddepartments = [];
        vm.selectedNode = {};

        //pagination
        vm.pageIndex = 1;
        vm.pageSize = 25;
        vm.totalItems = 0;
        vm.limitedSize = 10000; //for list all

        vm.typeOption = [
            {
                id: 1,
                name: 'Phòng- Ban hành chính'
            },
            {
                id: 2,
                name: 'Khoa- Trung tâm đào tạo'
            }
        ]

        vm.listAllDepartment = function () {
            service.listAllDepartment().then(function (data) {
                vm.departments = data;
            });
        };
        vm.listAllDepartment();

        /**
         * New department
         * edit department
         * update line path
         */

        //check duplicate code
        vm.viewCheckDuplicateCode = {};
        vm.tempCodeDetail = '';
        vm.tempCode = '';
        vm.searchKeyword = '';
        var modalInstance;

        function checkDuplicateCode(code,type,action){ //type: 1 -> save; 2 -> edit;   action: 1 -> just check code; 2 -> save or edit
            service.checkDuplicateCode(code).then(function(data) {
                vm.viewCheckDuplicateCode = data;
                if(action == 1){
                    if(type == 1){
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == true){
                            toastr.warning("Mã bị trùng");
                        }
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == false){
                            toastr.success("Mã không bị trùng");
                        }
                    }
                    if(type == 2){
                        if(vm.tempCode.toLowerCase().trim() != code.toLowerCase().trim()){
                            checkDuplicateCode(vm.tempCode,1,1);
                        }else{
                            toastr.info("Mã chưa thay đổi");
                        }
                    }
                }
                if(action == 2){
                    if(type == 1){
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == true){
                            toastr.warning("Mã bị trùng");
                        }
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == false){
                            service.saveDepartment(vm.department, function success() {
                                getDepartmentTree();
                                vm.reloadTree();
                                toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                                vm.department = {};
                                modalInstance.close();
                            }, function failure() {
                                toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                            });
                        }
                    }
                    if(type == 2){
                        if(vm.tempCode.toLowerCase().trim() != code.toLowerCase().trim()){
                            service.checkDuplicateCode(vm.tempCode).then(function(data) {
                                vm.viewCheckDuplicateCode = data;
                                if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == true){
                                    toastr.warning("Mã bị trùng");
                                }
                                if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == false){
                                    vm.departmentChild.code = vm.tempCode.trim();
                                    service.updateDepartment(vm.departmentChild, function success() {
                                        getDepartmentTree();
                                        vm.reloadTree();
                                        toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                                        vm.departmentChild = {};
                                        vm.searchKeyword = '';
                                        modalInstance.close();
                                    }, function failure() {
                                        toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                                    });
                                }
                            });
                        }else{
                            vm.departmentChild.code = vm.tempCode.trim();
                            service.updateDepartment(vm.departmentChild, function success() {
                                getDepartmentTree();
                                vm.reloadTree();
                                toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                                vm.departmentChild = {};
                                vm.searchKeyword = '';
                                modalInstance.close();
                            }, function failure() {
                                toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                            });
                        }
                    }
                }
                console.log(data);

            });
        };

        vm.checkDuplicateCode = function (type,action,department) {
            if(validateDepartment(department)){
                checkDuplicateCode(department.code,type,action);
            }
        };

        vm.newDepartment = function () {
            vm.department = {};
            vm.listAllDepartment();

            modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_department_modal.html',
                scope: $scope,
                size: 'lg'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                }
            }, function () {
                vm.department = {};
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.editDepartment = function (departmentId) {
            service.getDepartment(departmentId).then(function (data) {

                vm.departmentChild = data;
                vm.tempCode = vm.departmentChild.code;
                vm.listAllDepartment();

                modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'edit_department_child_modal.html',
                    scope: $scope,
                    size: 'lg'
                });

                modalInstance.result.then(function (confirm) {
                    if (confirm == 'yes') {

                        if (!vm.departmentChild.code || vm.departmentChild.code.trim() == '') {
                            toastr.error('Vui lòng nhập mã phòng ban.', 'Lỗi');
                            return;
                        }

                        if (!vm.departmentChild.name || vm.departmentChild.name.trim() == '') {
                            toastr.error('Vui lòng nhập tên phòng ban.', 'Lỗi');
                            return;
                        }
                        if ((vm.departmentChild.departmentType == null) || vm.departmentChild.departmentType == '') {
                            toastr.error('Vui lòng nhập cấp phòng ban.', 'Lỗi');
                            return;
                        }

                        service.updateDepartment(vm.departmentChild, function success() {
                            // getTreeData(vm.pageIndex, vm.limitedSize, vm.selectedNode);
                            getDepartmentTree();
                            vm.reloadTree();
                            toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                            vm.departmentChild = {};
                            vm.getDepartmentDetailById(vm.departmentDetail.id);
                        }, function failure() {
                            toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                        });
                    }
                }, function () {
                    vm.department = {};
                    console.log('Modal dismissed at: ' + new Date());
                });
            });
        };

        vm.getDepartmentDetailById = function (departmentId) {
            service.getDepartment(departmentId).then(function (data) {
                vm.departmentDetail = data;
                vm.childrens = vm.departmentDetail.children;
                vm.bsTableControl.options.data = vm.childrens;
            });
        };

        //check duplicate code department detail
        function checkDuplicateCodeDetail(code,type,action){ //type: 1 -> save; 2 -> edit;   action: 1 -> just check code; 2 -> save or edit
            service.checkDuplicateCode(code).then(function(data) {
                vm.viewCheckDuplicateCode = data;
                if(action == 1){
                    if(type == 1){
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == true){
                            toastr.warning("Mã bị trùng");
                        }
                        if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == false){
                            toastr.success("Mã không bị trùng");
                        }
                    }
                    if(type == 2){
                        if(vm.tempCodeDetail.toLowerCase().trim() != code.toLowerCase().trim()){
                            checkDuplicateCodeDetail(vm.tempCodeDetail,1,1);
                        }else{
                            toastr.info("Mã chưa thay đổi");
                        }
                    }
                }
                if(action == 2){
                    if(type == 2){
                        if(vm.tempCodeDetail.toLowerCase().trim() != code.toLowerCase().trim()){
                            service.checkDuplicateCode(vm.tempCodeDetail).then(function(data) {
                                vm.viewCheckDuplicateCode = data;
                                if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == true){
                                    toastr.warning("Mã bị trùng");
                                }
                                if(vm.viewCheckDuplicateCode != null && vm.viewCheckDuplicateCode.duplicate == false){
                                    vm.departmentDetail.code = vm.tempCodeDetail.trim();
                                    service.updateDepartment(vm.departmentDetail, function success() {
                                        getDepartmentTree();
                                        vm.reloadTree();
                                        toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                                        vm.departmentDetail = {};
                                        vm.searchKeyword = '';
                                        modalInstance.close();
                                    }, function failure() {
                                        toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                                    });
                                }
                            });
                        }else{
                            vm.departmentDetail.code = vm.tempCodeDetail.trim();
                            service.updateDepartment(vm.departmentDetail, function success() {
                                getDepartmentTree();
                                vm.reloadTree();
                                toastr.info('Bạn đã lưu thành công một bản ghi.', 'Thông báo');
                                vm.departmentDetail = {};
                                vm.searchKeyword = '';
                                modalInstance.close();
                            }, function failure() {
                                toastr.error('Có lỗi xảy ra khi lưu thông tin phòng ban.', 'Lỗi');
                            });
                        }
                    }
                }
                console.log(data);

            });
        };

        vm.checkDuplicateCodeDetail = function (type,action,department) {
            if(validateDepartment(department)){
                checkDuplicateCodeDetail(vm.departmentDetail.code,type,action);
            }
        };

        vm.updateDepartmentDetail = function (departmentId) {
            if (departmentId != null) {
                vm.listAllDepartment();
                service.getDepartment(departmentId).then(function (data) {
                    vm.departmentDetail = data;
                    vm.tempCodeDetail = vm.departmentDetail.code;
                    modalInstance = modal.open({
                        animation: true,
                        templateUrl: 'edit_department_detail_modal.html',
                        scope: $scope,
                        size: 'lg'
                    });
                    modalInstance.result.then(function (confirm) {
                        if (confirm == 'yes') {
                        }
                    }, function () {
                        vm.getDepartmentDetailById(vm.departmentDetail.id);
                        vm.searchKeyword = '';
                    });
                });
            }
        };

        vm.updateLinePath = function () {
            service.updateLinePath(function success() {
                getDepartmentTree();
                vm.reloadTree();
                toastr.info('Cập nhật thành công.', 'Thông báo');
            }, function failure() {
                toastr.error('Có lỗi xảy ra khi cập nhật.', 'Thông báo');
            });
        };

        /**
         * Delete
         */
        vm.deleteDepartments = function () {
            modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteDepartments(vm.selecteddepartments, function success() {

                        // Refresh list
                        // vm.getdepartments();
                        getDepartmentTree();
                        vm.reloadTree();

                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selecteddepartments.length + ' bản ghi.', 'Thông báo');

                        // Clear selected accounts
                        vm.selecteddepartments = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.deleteDetailDepartments = function () {
            modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_detail_modal.html',
                scope: $scope,
                size: 'md'
            });

            modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    service.deleteDepartmentById(vm.departmentDetail.id, function success() {
                        // Refresh list
                        getDepartmentTree();
                        vm.reloadTree();
                        // Notify
                        toastr.info('Bạn đã xóa thành công ' + vm.selecteddepartments.length + ' bản ghi.', 'Thông báo');
                        // Clear selected accounts
                        vm.selecteddepartments = [];
                    }, function failure() {
                        toastr.error('Có lỗi xảy ra khi xóa bản ghi.', 'Lỗi');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Upload file
         * import
         * export
         */
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
                    url: vm.baseUrl + 'hr/file/importDepartment',
                    data: {uploadfile: file}
                });

                file.upload.then(function (response) {
                    console.log(response);
                    file.result = response.data;
                    vm.getdepartments();
                    toastr.info('Import thành công.', 'Thông báo');
                }, function errorCallback(response) {
                    toastr.error('Import lỗi.', 'Lỗi');
                });
            }
        };

        vm.importDepartment = function () {
            modalInstance = modal.open({
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

        $scope.myBlobObject = undefined;
        $scope.getFile = function () {
            console.log('download started, you can show a wating animation');
            service.getStream(vm.departments)
                .then(function (data) {//is important that the data was returned as Aray Buffer
                    console.log('Stream download complete, stop animation!');
                    $scope.myBlobObject = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                }, function (fail) {
                    console.log('Download Error, stop animation and show error message');
                    $scope.myBlobObject = [];
                });
        };

        // Tree view
        vm.treeData = [];
        $scope.treeInstance = null;
        // $scope.treeConfig.version = 0;
        $scope.treeConfig = {
            core: {
                error: function (error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback: true
            },
            plugins: ['types', 'state', 'search']
            // version: 1
        };

        $scope.readyCB = function () {
            // getDepartmentTree();
        }
        $scope.selectNode = function (node, selected, event) {
            //console.log(selected.node.id);
            //console.log(selected.node.text);
            vm.getDepartmentDetailById(selected.node.id);
        }

        $scope.search = '';

        $scope.applySearch = function () {
            // getDepartmentTree();
            var to = false;
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                if ($scope.treeInstance) {
                    //console.log('here');
                    $scope.treeInstance.jstree(true).search($scope.search);
                }
            }, 250);
        };

        function getDepartmentTree() {
            service.getDepartmentTree().then(function (data) {
                vm.treeData = data;
                $scope.treeConfig.version = 1;
            });
        }
        vm.reloadTree = function () {
            $scope.treeConfig.version++;
        };
        getDepartmentTree();

        vm.bsTableControl = {
            options: {
                data: vm.childrens,
                idField: 'id',
                height: 347,
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: false,
                showToggle: false,
                pagination: false,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.$apply(function () {
                        vm.selecteddepartments.push(row);
                    });
                },
                onCheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selecteddepartments = rows;
                    });
                },
                onUncheck: function (row, $element) {
                    var index = utils.indexOf(row, vm.selecteddepartments);
                    if (index >= 0) {
                        $scope.$apply(function () {
                            vm.selecteddepartments.splice(index, 1);
                        });
                    }
                },
                onUncheckAll: function (rows) {
                    $scope.$apply(function () {
                        vm.selecteddepartments = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index - 1;
                    vm.getdepartments();
                }
            }
        };

        function validateDepartment(department){
            if (!department.code || department.code.trim() == '') {
                toastr.warning('Vui lòng nhập mã phòng ban.');
                return false;
            }

            if (!department.name || department.name.trim() == '') {
                toastr.warning('Vui lòng nhập tên phòng ban.');
                return false;
            }
            if (!department.departmentType || department.departmentType == null) {
                toastr.warning('Vui lòng chọn cấp phòng ban.');
                return false;
            }
            return true;
        }
    }

})();