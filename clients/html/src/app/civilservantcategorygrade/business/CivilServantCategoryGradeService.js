/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantCategoryGrade').service('CivilServantCategoryGradeService', CivilServantCategoryGradeService);

    CivilServantCategoryGradeService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function CivilServantCategoryGradeService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getCivilServantCategoryGrades = getCivilServantCategoryGrades;
        self.saveCivilServantCategoryGrade = saveCivilServantCategoryGrade;
        self.getCivilServantCategoryGrade = getCivilServantCategoryGrade;
        self.deleteCivilServantCategoryGrades = deleteCivilServantCategoryGrades;
        self.getTableDefinition = getTableDefinition;

        function getCivilServantCategoryGrades(pageIndex, pageSize) {
            var url = baseUrl + 'civilservantcategorygrade/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveCivilServantCategoryGrade(priority, successCallback, errorCallback) {
            var url = baseUrl + 'civilservantcategorygrade';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getCivilServantCategoryGrade(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantcategorygrade/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteCivilServantCategoryGrades(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantcategorygrade';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editCivilServantCategoryGrade(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                , {
                    field: 'salaryCoefficient',
                    title: 'Hệ số lương',
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