/**
 * Created by nguyen the dat on 23/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.SpecialityAdmissionsMap').service('SpecialityAdmissionsMapService', SpecialityAdmissionsMapService);

    SpecialityAdmissionsMapService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function SpecialityAdmissionsMapService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;
        self.getSpecialityAdmissionsMaps = getSpecialityAdmissionsMaps;
        self.saveSpecialityAdmissionsMap = saveSpecialityAdmissionsMap;
        self.getSpecialityAdmissionsMap = getSpecialityAdmissionsMap;
        self.deleteReligions = deleteReligions;
        self.getTableDefinition = getTableDefinition;
        self.getSpecialitys = getSpecialitys;
        self.getCourseYears = getCourseYears;
        
        var restUrl = 'specialityadmissionsmap';
        function getSpecialityAdmissionsMaps(pageIndex, pageSize) {
            var url = baseUrl +'/'+ restUrl;
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);
            console.log(url);
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        

        function getSpecialitys() {
            var url = baseUrl + 'speciality/all';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        function getCourseYears() {
            var url = baseUrl + 'courseyear/1/1000';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        function saveSpecialityAdmissionsMap(priority, successCallback, errorCallback) {
            var url = baseUrl + restUrl;
            console.log(url);
            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getSpecialityAdmissionsMap(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl+'/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteReligions(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }
            var url = baseUrl+'/'+  restUrl;
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editSpecialityAdmissionsMap(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    field: 'admissionCode',
                    title: 'Admissions Code',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'speciality.name',
                    title: 'Speciality',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'courseYear.name',
                    title: 'Course Year',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();