(function () {
    'use strict';

    angular.module('Hrm.User').service('UserRoleService', UserRoleService);

    UserRoleService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function UserRoleService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiPrefix;

        self.getTableDefinition = getTableDefinition;
        self.getRoles = getRoles;
        self.saveRole = saveRole;
        self.getRoleById = getRoleById;
        self.deleteRole = deleteRole;

        function getRoles(pageIndex, pageSize) {
            var url = baseUrl + 'roles/' + pageIndex + '/' + pageSize;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveRole(role, successCallback, errorCallback) {

            if (!role) {
                return $q.when(null);
            }

            var url = baseUrl + 'roles';
            var method = 'POST';

            if (role && role.id) {
                method = 'PUT';
            }

            return utils.resolveAlt(url, method, null, role, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getRoleById(roleId) {
            var url = baseUrl + 'roles/' + roleId;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteRole(role, successCallback, errorCallback) {

            if (!role || !role.id) {
                return $q.when(null);
            }

            var url = baseUrl + 'roles';

            return utils.resolveAlt(url, 'DELETE', null, role, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                return row.sysRole ? '<button class="btn btn-xs btn-default disabled">sửa</button>' : '<a class="btn btn-xs btn-default margin-right-10" href="#" data-ng-click="$parent.editRole(' + "'" + row.id + "'" + ')">sửa</a>';
            };

            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };

            var _cellNowrap2 = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap', 'width' : '80px'}
                };
            };

            var _objectFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                if (value == null) {
                    return '';
                }
                return value.name;
            };

            var _sysRoleFormatter = function (value, row, index) {
                if (!value) {
                    return 'Tùy biến';
                }

                return '<span class="bold">Hệ thống</span>';
            };

            return [
                {
                    field: 'state',
                    checkbox: true
                }
                ,{
                    field:'',
                    title: 'Thao tác',
                    switchable: true,
                    visible: true,
                    formatter: _tableOperation,
                    cellStyle: _cellNowrap2
                }
                , {
                    field: 'sysRole',
                    title: 'Loại vai trò',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    formatter: _sysRoleFormatter
                }
                , {
                    field: 'name',
                    title: 'Tên quyền',
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
            ];
        }
    }
})();