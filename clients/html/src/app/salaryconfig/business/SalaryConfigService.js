/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryConfig').service('SalaryConfigService', SalaryConfigService);

    SalaryConfigService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function SalaryConfigService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getSalaryConfigs = getSalaryConfigs;
        self.saveSalaryConfig = saveSalaryConfig;
        self.getSalaryConfig = getSalaryConfig;
        self.deleteSalaryConfigs = deleteSalaryConfigs;
        self.getTableDefinition = getTableDefinition;

        function getSalaryConfigs(pageIndex, pageSize) {
            var url = baseUrl + 'salaryconfig';
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveSalaryConfig(priority, successCallback, errorCallback) {
            var url = baseUrl + 'salaryconfig';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getSalaryConfig(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'salaryconfig/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteSalaryConfigs(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'salaryconfig';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editSalaryConfig(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>'
                      +'<a class="green-dark margin-right-20" href="#/salaryconfig_detail/' + row.id + '"><i class="fa fa-cogs margin-right-5"></i>Chi tiết</a>';
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
                    title: 'Mã cấu hình lương',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'Tên cấu hình lương',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();