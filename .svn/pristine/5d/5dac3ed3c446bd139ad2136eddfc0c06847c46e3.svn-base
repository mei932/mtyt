/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.Department').service('DepartmentService', DepartmentService);

    DepartmentService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function DepartmentService($http, $q, $filter, settings, utils) {
        var self = this;
        //var baseUrl=;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;
        	
        self.getdepartments = getdepartments;
        self.saveDepartment = saveDepartment;
        self.getDepartment = getDepartment;
        self.updateDepartment=updateDepartment;         
        self.deleteDepartments = deleteDepartments;
        self.deleteDepartmentById = deleteDepartmentById;
        self.getTableDefinition = getTableDefinition;
        self.getStream=getStream;
        self.getTreeData = getTreeData;
        self.listAllDepartment = listAllDepartment;
        self.getDepartmentTree = getDepartmentTree;
        self.updateLinePath = updateLinePath;
        self.checkDuplicateCode = checkDuplicateCode;

        function checkDuplicateCode(code) {
            var url = baseUrl + 'department/checkCode/' + code + '/';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function updateLinePath(successCallback, errorCallback) {
            var url = baseUrl + 'department/line_path';
            return utils.resolveAlt(url, 'PUT', null, null, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getDepartmentTree() {
            var url = baseUrl + 'staff/departmenttree';

            //var url = 'assets/files/staff.json';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getdepartments(pageIndex, pageSize) {
            var url = baseUrl + 'department';
            url += '/' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveDepartment(department, successCallback, errorCallback) {
            var url = baseUrl + 'department';

            return utils.resolveAlt(url, 'POST', null, department, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function updateDepartment(department, successCallback, errorCallback) {
            var url = baseUrl + 'department/dto/'+department.id;
            //console.log(url);
            return utils.resolveAlt(url, 'PUT', null, department, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        
        function getDepartment(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'department/dto/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteDepartments(department, successCallback, errorCallback) {
            if (!department || department.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'department';
            return utils.resolveAlt(url, 'DELETE', null, department, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function deleteDepartmentById(departmentId, successCallback, errorCallback) {
            if (!departmentId) {
                return $q.when(null);
            }

            var url = baseUrl + 'department/'+departmentId;
            return utils.resolveAlt(url, 'DELETE', null, null, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        
        function getStream(list){
            console.log("RUNNING");
            var deferred = $q.defer();

            $http({
                url:baseUrl +'hr/file/exportDepartment',
                method:"POST",//you can use also GET or POST
                data:list,
                headers:{'Content-type': 'application/json'},
                responseType : 'arraybuffer',//THIS IS IMPORTANT
            })
                .success(function (data) {
                    console.debug("SUCCESS");
                    deferred.resolve(data);
                }).error(function (data) {
                console.error("ERROR");
                deferred.reject(data);
            });

            return deferred.promise;
        };

        function getTreeData(pageIndex,pageSize) {
            var url = baseUrl + 'department/tree/' + pageIndex +'/'+ pageSize;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function listAllDepartment() {
            var url = baseUrl + 'department/all';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editDepartment(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
                    // + '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.deleteDepartment()"><i class="fa fa-trash margin-right-5"></i>Xóa</a>';
            };
        	var _formaterType = function (value, row, index, field) {
                if(value==1){
                	return 'Phòng- Ban hành chính';
                }
                else if(value==2){
                	return 'Khoa- Trung tâm đào tạo';
                }
                else{
                	return '';
                }
            };
            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };

            return [
                {
                    field: 'code',
                    title: 'Mã phòng ban',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'Tên phòng ban',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'displayOrder',
                    title: 'Thứ tự',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: '',
                    title: 'Thao tác',
                    switchable: true,
                    visible: true,
                    formatter: _tableOperation,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'state',
                    checkbox: true
                }
//                , {
//                    field: 'type',
//                    title: 'Cấp Phòng- Khoa',
//                    sortable: true,
//                    switchable: false,
//                    cellStyle: _cellNowrap,
//                    formatter:_formaterType
//                }
            ]
        }
    }

})();