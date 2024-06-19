/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantCategory').service('CivilServantCategoryService', CivilServantCategoryService);

    CivilServantCategoryService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function CivilServantCategoryService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getCivilServantCategorys = getCivilServantCategorys;
        self.saveCivilServantCategory = saveCivilServantCategory;
        self.getCivilServantCategory = getCivilServantCategory;
        self.deleteCivilServantCategorys = deleteCivilServantCategorys;
        self.getTableDefinition = getTableDefinition;

        function getCivilServantCategorys(pageIndex, pageSize) {
            var url = baseUrl + 'civilservantcategory/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveCivilServantCategory(priority, successCallback, errorCallback) {
            var url = baseUrl + 'civilservantcategory';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getCivilServantCategory(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantcategory/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteCivilServantCategorys(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantcategory';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editCivilServantCategory(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    title: 'Mã ngạch',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'name',
                    title: 'Tên ngạch',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
//                , {
//                    field: 'voided',
//                    title: 'Voided',
//                    sortable: true,
//                    switchable: false,
//                    cellStyle: _cellNowrap
//                }
            ]
        }
    }

})();