/**
 * Created by bizic on 3/12/2017.
 */
(function () {
    'use strict';

    angular.module('Hrm.Account').service('AccountService', AccountService);

    AccountService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function AccountService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getAccounts = getAccounts;
        self.saveAccount = saveAccount;
        self.getAccount = getAccount;
        self.deleteAccounts = deleteAccounts;
        self.getTableDefinition = getTableDefinition;

        function getAccounts(pageIndex, pageSize) {
            var url = baseUrl + 'account/list';
            url += '?page=' + ((pageIndex >= 0) ? pageIndex : 0);
            url += '&size=' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveAccount(priority, successCallback, errorCallback) {
            var url = baseUrl + 'account';

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getAccount(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'account/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteAccounts(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl + 'account';
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editAccount(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
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
                    field: 'accountCode',
                    title: 'Mã tài khoản',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'accountName',
                    title: 'Tên tài khoản',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'description',
                    title: 'Mô tả',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
            ]
        }
    }

})();