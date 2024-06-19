/**
 * Author Giang 21/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.TimeSheet').service('TimeSheetDetailService', TimeSheetDetailService);

    TimeSheetDetailService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function TimeSheetDetailService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getTimeSheetDetails = getTimeSheetDetails;
        self.saveTimeSheetDetail = saveTimeSheetDetail;
        self.getTimeSheetDetail = getTimeSheetDetail;
        self.deleteTimeSheetDetails = deleteTimeSheetDetails;
        self.getTableDefinition = getTableDefinition;
        var restUrl = 'timesheetdetail';
        function getTimeSheetDetails(pageIndex, pageSize) {
            var url = baseUrl +'/'+ restUrl;
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveTimeSheetDetail(priority, successCallback, errorCallback) {
            var url = baseUrl + restUrl;

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTimeSheetDetail(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl+'/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteTimeSheetDetails(priorities, successCallback, errorCallback) {
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
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editTimeSheetDetail(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                return moment(value).format('hh:mm');
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
                }, {
                    field: 'workingItemTitle',
                    title: 'Tiêu đề công việc',
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
                    field: 'duration',
                    title: 'Tổng thời lượng (giờ)',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();