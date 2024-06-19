/**
 * Created by bizic on 30/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.User').service('UserService', UserService);

    UserService.$inject = [
        '$http',
        '$q',
        'settings',
        'Utilities'
    ];

    function UserService($http, $q, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiPrefix;

        self.getTableDefinition = getTableDefinition;
        self.getUsers = getUsers;
        self.getUser = getUser;
        self.saveUser = saveUser;
        self.deleteUsers = deleteUsers;
        self.getAllRoles = getAllRoles;
        self.getAllGroups = getAllGroups;
        self.usernameDuplicates = usernameDuplicates;
        self.changePassword = changePassword;
        self.changePasswordSelf = changePasswordSelf;
        self.passwordValid = passwordValid;
        self.cropProfilePhoto = cropProfilePhoto;
        self.getUserByUsername = getUserByUsername;
        self.getUserByEmail = getUserByEmail;
        self.emailAlreadyUsed = emailAlreadyUsed;
        self.searchUsers = searchUsers;
        self.findUserByUserName = findUserByUserName;

        function usernameDuplicates(user) {

            if (!user.id) {
                user.id = 0;
            }

            var url = baseUrl + 'user/duplicate/username';

            return utils.resolveAlt(url, 'POST', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function getAllRoles() {
            var url = baseUrl + 'roles/all';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getAllGroups() {
            var url = baseUrl + 'usergroup/all';
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getUsers(filter, pageIndex, pageSize) {

            var url = baseUrl + 'users/search';
            url += '/' + ((pageIndex > 0) ? pageIndex : 1);
            url += '/' + ((pageSize > 0) ? pageSize : 10);

            return utils.resolveAlt(url, 'POST', null, filter, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function getUser(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl + 'users/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function saveUser(user, successCallback, errorCallback) {
            var url = baseUrl + 'users';

            user.active = user.active == null ? 0 : user.active;

            return utils.resolveAlt(url, 'POST', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function deleteUsers(dto, successCallback, errorCallback) {
            if (!dto || !dto.id) {
                return $q.when(null);
            }

            var url = baseUrl + 'users';
            return utils.resolveAlt(url, 'DELETE', null, dto, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function changePassword(user, successCallback, errorCallback) {
            var url = baseUrl + 'users/password';

            return utils.resolveAlt(url, 'PUT', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function changePasswordSelf(user, successCallback, errorCallback) {
            var url = baseUrl + 'users/password/self';

            return utils.resolveAlt(url, 'PUT', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function passwordValid(passwordObj) {
            var url = baseUrl + 'users/password/valid';

            return utils.resolveAlt(url, 'POST', null, passwordObj, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function cropProfilePhoto(cropper) {
            var url = baseUrl + 'users/photo/crop';

            return utils.resolveAlt(url, 'POST', null, cropper, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function getUserByUsername(username) {
            if (!username) {
                return $q.when(null);
            }

            var url = baseUrl + 'users?username=' + username;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getUserByEmail(email) {
            if (!email) {
                return $q.when(null);
            }

            var user = {email: email};
            var url = baseUrl + 'users/email';

            return utils.resolveAlt(url, 'POST', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function emailAlreadyUsed(user) {
            if (!user) {
                return $q.when(true);
            }

            if (!user.id) {
                user.id = 0;
            }

            var url = baseUrl + 'users/email_in_use';

            return utils.resolveAlt(url, 'POST', null, user, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function searchUsers(filter) {
            var url = baseUrl + 'users/search';

            return utils.resolveAlt(url, 'POST', null, filter, {
                'Content-Type': 'application/json; charset=utf-8'
            }, angular.noop, angular.noop);
        }

        function findUserByUserName(username, pageIndex, pageSize) {
            var url = baseUrl + 'users/username/' + username + '/' + pageIndex + '/' + pageSize;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function getTableDefinition() {

            var _tableOperation = function (value, row, index) {
                var ret = '<a class="btn btn-xs btn-default margin-right-10" href="#" data-ng-click="$parent.editUser(' + "'" + row.id + "'" + ')">sửa</a>';
                if (row.username != 'admin') {
                    ret += '<a class="btn btn-xs btn-default" href="#" data-ng-click="$parent.changeUserPassword(' + "'" + row.id + "'" + ')">đổi mật khẩu</a>';
                } else {
                    ret += '<a class="btn btn-xs btn-default" data-ng-disabled="true" href="#">đổi mật khẩu</a>';
                }

                return ret;
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
                    css: {'white-space': 'nowrap', 'max-width': '120px'}
                };
            };

            var _dateFormatter = function (value, row, index) {
                if (!value) {
                    return '';
                }
                return moment(value).format('DD/MM/YYYY');
            };

            var _statusFormatter = function (value, row, index) {
                if (value == null) {
                    return '';
                }
                return value == true ? '<span class="text-bold text-success">Kích hoạt</span>' : '<span class="text-muted">Không kích hoạt</span>';
            };

            var _cellState = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap', 'width': '1%'}
                };
            };

            var _cellActions = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap', 'text-align': 'center', 'width': '10%'}
                }
            };

            return [
                {
                    field: 'state',
                    checkbox: true,
                    cellStyle: _cellState
                }
                , {
                    field: '',
                    title: 'Thao tác',
                    switchable: true,
                    visible: true,
                    formatter: _tableOperation,
                    cellStyle: _cellActions
                }
                , {
                    field: 'displayName',
                    title: 'Họ tên',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap2
                }
                , {
                    field: 'username',
                    title: 'Tên đăng nhập',
                    sortable: true,
                    switchable: true,
                    cellStyle: _cellNowrap2
                }
                , {
                    field: 'email',
                    title: 'Email',
                    sortable: true,
                    switchable: true,
                    visible: true,
                    cellStyle: _cellNowrap2
                }, {
                    field: 'active',
                    title: 'Trạng thái',
                    sortable: true,
                    switchable: true,
                    visible: true,
                    formatter: _statusFormatter,
                    cellStyle: _cellNowrap2
                }
            ]
        }
    }
})();