/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.CivilServantGrade').service('CivilServantGradeService', CivilServantGradeService);

    CivilServantGradeService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function CivilServantGradeService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getCivilServantGrades = getCivilServantGrades;
        self.saveCivilServantGrade = saveCivilServantGrade;
        self.getCivilServantGrade = getCivilServantGrade;
        self.deleteCivilServantGrades = deleteCivilServantGrades;
        self.getTableDefinition = getTableDefinition;

        function getCivilServantGrades(pageIndex, pageSize) {
            var url = baseUrl + 'civilservantgrade/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveCivilServantGrade(priority, successCallback, errorCallback) {
            var url = baseUrl + 'civilservantgrade';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getCivilServantGrade(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantgrade/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteCivilServantGrades(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'civilservantgrade';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editCivilServantGrade(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    title: 'Mã bậc công chức',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                },
                {
                    field: 'name',
                    title: 'Tên bậc công chức',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                },
                {
                    field: 'grade',
                    title: 'Bậc',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'nextGradeId',
                    title: 'Bậc tiếp theo',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'maxGrade',
                    title: 'Bậc cao nhất',
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
            ]
        }
    }

})();