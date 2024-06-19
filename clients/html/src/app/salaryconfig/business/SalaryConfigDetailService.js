/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SalaryConfig').service('SalaryConfigDetailService', SalaryConfigDetailService);

    SalaryConfigDetailService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function SalaryConfigDetailService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getTableDefinition = getTableDefinition;
        self.getSalaryConfigItemBySalaryConfigId = getSalaryConfigItemBySalaryConfigId;

        function getSalaryConfigItemBySalaryConfigId(salaryConfigId, pageIndex, pageSize) {
            var url = baseUrl + 'salaryconfig/salaryconfigitem';
            url += '/'+salaryConfigId;
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editSalaryConfig(' + "'" + row.itemOrder +"',"+ "'"+row.salaryItem.name+ "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>'
                      +'<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.goUp(' + "'" + row.itemOrder + "'" + ')"><i class="fa fa-arrow-up margin-right-5"></i></a>'
                      +'<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.goDown(' + "'" + row.itemOrder + "'" + ')"><i class="fa fa-arrow-down margin-right-5"></i></a>'
                      +'<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editItemOrder(' + "'" + row.itemOrder + "'" + ')"><i class="icon-pencil margin-right-5"></i></a>';
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
                    field: 'salaryItem.name',
                    title: 'Tên phần tử lương',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'salaryItem.type',
                    title: 'Loại phần tử lương',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }                
                , {
                    field: 'itemOrder',
                    title: 'Số thứ tự',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();