/**
 * Created by nguyen the dat on 22/3/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.XacNhanNopPhi').service('XacNhanNopPhiService', XacNhanNopPhiService);

    XacNhanNopPhiService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function XacNhanNopPhiService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getDatas = getDatas;
        self.getDataById = getDataById;
        self.saveData = saveData;
        self.confirm = confirm;
        self.deleteHoSos=deleteHoSos;
        self.getTableDefinition = getTableDefinition;
        
        function getDatas(pageIndex, pageSize) {
            var url = baseUrl + 'hoso';
            url += '/' + pageIndex;
            url += '/' + pageSize;

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getDataById(id) {
            var url = baseUrl + 'hoso/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function confirm(status) {
            var url = baseUrl + 'hoso';
            url += '/' + pageIndex;
            url += '/' + pageSize;

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function confirm(data, status, successCallback, errorCallback) {
            var url = baseUrl + 'hoso/' + status;

            return utils.resolveAlt(url, 'POST', null, data, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        
        function saveData(data, successCallback, errorCallback) {
            var url = baseUrl + 'hoso';

            return utils.resolveAlt(url, 'POST', null, data, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        function deleteHoSos(ids, successCallback, errorCallback) {
            if (!ids || ids.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'hoso/removeList';
            return utils.resolveAlt(url, 'DELETE', null, ids, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="btn btn-default" href="#" data-ng-click="$parent.edit(' + "'" + row.id + "'" + ')">Sửa</a>'
                + '<a class="btn btn-default" href="#" data-ng-click="$parent.confirm(' + "'" + row.id + "'" + ')">Xác nhận</a>';
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
                return moment(value).format('DD/MM/YYYY');
            };
            var _trangThaiFormatter = function (value, row, index) {
                 if(value==0){
                    return 'Tạo mới';
                }
                else if(value==1){
                    return 'Xác nhận';
                }
                else if(value==-1){
                    return 'Nộp trả';
                }else{
                     return '';
                 }
            };

            return [
                {
                    field: 'state',
                    checkbox: true
                }
                , {
                    field: 'maHoSo',
                    title: 'Mã hồ sơ',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'chuHoSo',
                    title: 'Chủ hồ sơ',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'ngayNopTien',
                    title: 'Ngày nộp',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    formatter:_dateFormatter
                }
                , {
                    field: 'trangThai',
                    title: 'Trạng thái',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    formatter:_trangThaiFormatter
                }
                , {
                    field: '',
                    title: 'Thao tác',
                    switchable: true,
                    visible: true,
                    formatter: _tableOperation,
                    cellStyle: _cellNowrap
                }
            ]
        }
        
        
    }

})();