/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.PositionTitle').service('PositionTitleService', PositionTitleService);

    PositionTitleService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function PositionTitleService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getpositiontitles = getpositiontitles;
        self.savepositiontitle = savepositiontitle;
        self.getpositiontitle = getpositiontitle;
        self.deletepositiontitles = deletepositiontitles;
        self.getTableDefinition = getTableDefinition;

        function getpositiontitles(pageIndex, pageSize) {
            var url = baseUrl + 'positiontitle/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function savepositiontitle(priority, successCallback, errorCallback) {
            var url = baseUrl + 'positiontitle';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getpositiontitle(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'positiontitle/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deletepositiontitles(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'positiontitle';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editpositiontitle(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    field: 'code',
                    title: 'Mã chức vụ',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'Tên chức vụ',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'type',
                    title: 'Loại chức vụ',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    formatter:_formaterType
                }
            ]
        }
    }

})();