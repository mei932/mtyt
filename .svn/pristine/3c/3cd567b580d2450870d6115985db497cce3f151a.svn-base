/**
 * Author Giang 21/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.TimeSheet').service('TimeSheetService', TimeSheetService);

    TimeSheetService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function TimeSheetService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getTimeSheets = getTimeSheets;
        self.saveTimeSheet = saveTimeSheet;
        self.getTimeSheet = getTimeSheet;
        self.deleteTimeSheets = deleteTimeSheets;
        self.getTableDefinition = getTableDefinition;
        self.searchStaffs = searchStaffs;
        self.getTableDefinitionSearchStaff = getTableDefinitionSearchStaff;
        self.searchStaffByName = searchStaffByName;
        self.getCurrentUser = getCurrentUser;
        var restUrl = 'timesheet';
        
        function getCurrentUser(){
        	var url = baseUrl + 'users/getCurrentUser';        	            
            return utils.resolve(url, 'GET', angular.noop, angular.noop);  
        }
        
        function searchStaffByName(str,pageIndex, pageSize) {
            var url = settings.api.baseUrl +'api/timesheet/searchStaff/'+ str +'/'+pageIndex+ '/' + pageSize;
            //return $http.get(url, {timeout: 400});
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        
        function searchStaffs(str) {
            var url = settings.api.baseUrl +'/public/staff?textSearch='+ str;
            //return $http.get(url, {timeout: 400});
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        
        function getTimeSheets(pageIndex, pageSize) {
            var url = baseUrl +'/'+ restUrl;
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveTimeSheet(priority, successCallback, errorCallback) {
            var url = baseUrl + restUrl;

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTimeSheet(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl+'/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteTimeSheets(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl;
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editTimeSheet(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
            };

            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };
            var _dateFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                return moment(value).format('DD/MM/YYYY HH:mm:ss');
            };
            var _timeFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                return moment(value).format('HH:mm');
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
                    field: 'employee.displayName',
                    title: 'Tên nhân viên',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'startTime',
                    title: 'Thời gian bắt đầu',
                    sortable: true,
                    switchable: false,
                    formatter: _dateFormatter,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'endTime',
                    title: 'Thời gian kết thúc',
                    sortable: true,
                    switchable: false,
                    formatter: _dateFormatter,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'totalHours',
                    title: 'Tổng thời gian (giờ)',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
        
        function getTableDefinitionSearchStaff() {
        	
            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };
            var _dateFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                return moment(value).format('DD/MM/YYYY HH:mm:ss');
            };
            var _timeFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                return moment(value).format('hh:mm');
            };            
            return [
                {
                    field: 'state',
                    checkbox: true
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
                    title: 'Họ và tên',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
        
    }

})();