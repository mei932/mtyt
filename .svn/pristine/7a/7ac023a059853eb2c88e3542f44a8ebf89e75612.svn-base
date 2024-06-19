/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.Staff').service('StaffService', StaffService);

    StaffService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function StaffService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getStaffs = getStaffs;
        self.saveStaff = saveStaff;
        self.updateStaff = updateStaff;        
        self.getStaff = getStaff;
        self.deleteStaffs = deleteStaffs;
        self.getTableDefinition = getTableDefinition;
        self.getEthnics = getEthnics;
        self.getReligions = getReligions;
        self.getRoles = getRoles;
        self.getStaffByCode = getStaffByCode;
        self.getDepartmentTree = getDepartmentTree;
        self.getPositions = getPositions;
        self.searchDto = searchDto;
        self.getPositionTitles=getPositionTitles;
        
        function searchDto(searchDto, pageIndex, pageSize, successCallback, errorCallback) {
            console.log(searchDto);
            var url = baseUrl + 'staff/find/' + pageIndex + '/' + pageSize;
            return utils.resolveAlt(url, 'POST', null, searchDto, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getPositions() {
            var url = baseUrl + 'position/1/10000';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getPositionTitles(pageIndex, pageSize) {
            var url = baseUrl + 'positiontitle/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        
        function getDepartmentTree() {
             var url = baseUrl + 'staff/departmenttree';

            //var url = 'assets/files/staff.json';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        
        function getStaffs(pageIndex, pageSize) {
            var url = baseUrl + 'staff';
            url += '/' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getStaffByCode (textSearch, pageIndex, pageSize){
            var url = baseUrl + 'staff/staffcode/' + textSearch + '/' + pageIndex + '/' + pageSize;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveStaff(priority, successCallback, errorCallback) {
            var url = baseUrl + 'staff';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        function updateStaff(staffId,staff, successCallback, errorCallback) {
            var url = baseUrl + 'staff/'+staffId;

            return utils.resolveAlt(url, 'PUT', null, staff, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        function getStaff(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'staff/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteStaffs(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'staff';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getEthnics() {
            var url = baseUrl + 'ethnics/1/1000';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getReligions() {
            var url = baseUrl + 'religion/1/1000';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getRoles() {
            var url = baseUrl + 'roles/rolestaff/1/1000';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editStaff(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
            };
        	var _formaterType = function (value, row, index, field) {
                if(value==1){
                	return 'Chính Quyền';
                }
                else if(value==2){
                	return 'Đoàn thể';
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
                    field: 'state',
                    checkbox: true
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
                    field: 'staffCode',
                    title: 'Mã công chức',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'displayName',
                    title: 'Họ tên',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }, 
                {
                    field: 'gender',
                    title: 'Giới tính',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
//                , {
//                    field: 'type',
//                    title: 'Loại chức vụ',
//                    sortable: true,
//                    switchable: false,
//                    cellStyle: _cellNowrap,
//                    formatter:_formaterType
//                }
            ]
        }
    }

})();