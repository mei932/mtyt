/**
 * Created by TA & Giang on 21/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.EducationDegree').service('EducationDegreeService', EducationDegreeService);

    EducationDegreeService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function EducationDegreeService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getEducationDegrees = getEducationDegrees;
        self.saveEducationDegree = saveEducationDegree;
        self.getEducationDegree = getEducationDegree;
        self.deleteEducationDegrees = deleteEducationDegrees; 
        self.getTableDefinition = getTableDefinition;

        function getEducationDegrees(pageIndex, pageSize) {
            var url = baseUrl + 'educationdegree';
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveEducationDegree(priority, successCallback, errorCallback) {
            var url = baseUrl + 'educationdegree';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getEducationDegree(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'educationdegree/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteEducationDegrees(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'educationdegree';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editEducationDegree(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    title: 'Mã bằng cấp',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'Tên bằng cấp',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();