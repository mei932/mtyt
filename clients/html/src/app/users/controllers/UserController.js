/**
 * Created by bizic on 28/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.User').controller('UserController', UserController);

    UserController.$inject = [
        '$rootScope',
        '$scope',
        '$timeout',
        'settings',
        '$uibModal',
        'toastr',
        'blockUI',
        'bsTableAPI',
        'Utilities',
        'focus',
        'UserService'
    ];

    function UserController($rootScope, $scope, $timeout, settings, modal, toastr, blockUI, bsTableAPI, utils, focus, service) {
        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        // search user by username
        vm.filter = {
            keyword: '',
            active: null,
            roles: [],
            groups: [],
            filtered: 0
        };

        vm.user = {};
        vm.users = [];
        vm.selectedUsers = [];

        vm.roles = [];
        vm.groups = [];

        // UI
        vm.modalInstance = null;

        // pagination
        vm.pageIndex = 0;
        vm.pageSize = 25;

        /**
         * Get a list of users
         */
        vm.getUsers = function () {
            service.getUsers(vm.filter, vm.pageIndex, vm.pageSize).then(function (data) {
                vm.users = data.content;
                vm.bsTableControl.options.data = vm.users;
                vm.bsTableControl.options.totalRows = data.totalElements;
            });
        };

        vm.getUsers();

        /**
         * Get all roles
         */
        service.getAllRoles().then(function (data) {
            if (data && data.length > 0) {
                vm.roles = data;
            } else {
                vm.roles = [];
            }
        });

        /**
         * Get all user groups
         */
        service.getAllGroups().then(function (data) {
            if (data && data.length > 0) {
                vm.groups = data;
            } else {
                vm.groups = [];
            }
        });

        vm.saveUser = function () {

            if (!vm.user.person) {
                vm.user.person = {};
            }

            if (!vm.user.person.firstName || !vm.user.person.lastName) {
                toastr.error('Vui lòng nhập đầy đủ họ tên người dùng!', 'Thông báo');
                focus('vm.user.person.displayName');
                return;
            }

            if (!vm.user.email || vm.user.email.trim().length <= 0) {
                toastr.error('Vui lòng nhập địa chỉ email!', 'Thông báo');
                focus('vm.user.email');
                return;
            }

            if (!vm.user.id) {
                if (!vm.user.username || vm.user.username.trim().length <= 0) {
                    toastr.error('Vui lòng nhập tên đăng nhập!', 'Thông báo');
                    focus('vm.user.username');
                    return;
                }
            }

            if (!vm.user.id) {
                if (!vm.user.password || vm.user.password.trim().length <= 0) {
                    toastr.error('Vui lòng nhập mật khẩu!', 'Thông báo');
                    focus('vm.user.password');
                    return;
                }

                if (vm.user.password != vm.user.confirmPassword) {
                    toastr.error('Mật khẩu không khớp nhau!', 'Thông báo');
                    focus('vm.user.confirmPassword');
                    return;
                }
                // Check for duplicate username & email
                service.getUserByUsername(vm.user.username).then(function (data) {
                    if (data && data.id) {
                        if (!vm.user.id || (vm.user.id && data.id != vm.user.id)) {
                            toastr.error('Tên đăng nhập đã tồn tại!', 'Thông báo');
                            focus('vm.user.username');
                            return;
                        }
                    }

                    service.emailAlreadyUsed(vm.user).then(function (data2) {

                        if (data2 && data2 == true) {
                            toastr.error('Địa chỉ email đã tồn tại!', 'Thông báo');
                            focus('vm.user.email');
                            return;
                        }


                    });
                });                
            }

            if (!vm.user.roles || vm.user.roles.length <= 0) {
                toastr.error('Vui lòng chọn ít nhất một vai trò cho người dùng!', 'Thông báo');
                return;
            }

            service.saveUser(vm.user, function successCallback(data) {
                toastr.info('Đã lưu thông tin người dùng thành công!', 'Thông báo');

                // Reload users
                vm.getUsers();

            }, function errorCallback(response) {
                toastr.error('Có lỗi xảy ra khi lưu.', 'Thông báo');
            }).then(function () {
                // Close the modal
                if (vm.modalInstance) {
                    vm.modalInstance.close();
                }
            }); 
        };

        /**
         * Create a new user
         */
        vm.newUser = function () {
            vm.user = {isNew: true};

            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'edit_modal.html',
                scope: $scope,
                size: 'md'
            });
        };

        /**
         * Edit an existing user
         *
         * @param userId
         */
        $scope.editUser = function (userId) {

            service.getUser(userId).then(function (data) {
                if (data && data.id) {

                    vm.user = data;
                    vm.user.isNew = false;

                    vm.modalInstance = modal.open({
                        animation: true,
                        templateUrl: 'edit_modal.html',
                        scope: $scope,
                        size: 'md'
                    });
                }
            });
        };

        /**
         * Save user's new password
         */
        vm.saveNewPassword = function () {
            if (!vm.user || !vm.user.id) {
                return;
            }

            vm.user.password1 = vm.user.password1.trim();
            vm.user.password2 = vm.user.password2.trim();

            if (vm.user.password1 == '') {
                toastr.error('Bạn vui lòng nhập mật khẩu mới!', 'Thông báo');
                focus('vm.user.password1');
                return;
            }

            // console.log(vm.user.password1);
            // console.log(vm.user.password2);

            if (vm.user.password1 != vm.user.password2) {
                toastr.error('Mật khẩu không trùng nhau!', 'Thông báo');
                focus('vm.user.password2');
                return;
            }

            var userObj = {
                id: vm.user.id,
                fullname: vm.user.displayName,
                username: vm.user.username,
                password: vm.user.password1
            };

            service.changePassword(userObj, function success() {
                toastr.info('Bạn đã cập nhật thành công mật khẩu cho người dùng [ ' + userObj.fullname + ' ].', 'Thông báo');
            }, function error() {
                toastr.error('Có lỗi xảy ra khi cập nhật mật khẩu. Mật khẩu của người dùng vẫn được giữ nguyên như cũ.', 'Thông báo');
            }).then(function (data) {

                vm.user = {};

                if (vm.modalInstance) {
                    vm.modalInstance.close(null);
                }
            });
        };

        /**
         * Change user password
         * @param userId
         */
        $scope.changeUserPassword = function (userId) {
            service.getUser(userId).then(function (data) {
                if (data && data.id) {

                    vm.user = data;
                    vm.user.isNew = false;

                    vm.modalInstance = modal.open({
                        animation: true,
                        templateUrl: 'change_user_password_modal.html',
                        scope: $scope,
                        size: 'md'
                    });
                }
            });
        };

        /**
         * Delete a selected user
         */
        vm.deleteUsers = function () {
            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'confirm_delete_modal.html',
                scope: $scope,
                size: 'md'
            });

            vm.modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    blockUI.start();
                    service.deleteUsers(vm.selectedUsers[0], function success() {
                        // Refresh list
                        vm.getUsers();

                        // Block UI
                        blockUI.stop();

                        // Notify
                        toastr.info('Bạn đã xoá thành công ' + vm.selectedUsers.length + ' bản ghi.', 'Thông báo');

                        // Clear selected tags
                        vm.selectedUsers = [];
                    }, function failure() {
                        // Block UI
                        blockUI.stop();

                        toastr.error('Có lỗi xảy ra khi xóa bản khi.', 'Thông báo');
                    });
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * Open search form...
         */
        vm.filterTemp = {};

        vm.advancedSearch = function () {
            angular.copy(vm.filter, vm.filterTemp);

            vm.modalInstance = modal.open({
                animation: true,
                templateUrl: 'search_user_modal.html',
                scope: $scope,
                size: 'md'
            });

            vm.modalInstance.result.then(function (confirm) {
                if (confirm == 'yes') {
                    angular.copy(vm.filterTemp, vm.filter);
                    vm.filterTemp = {filtered: 0};
                    vm.filter.filtered = (vm.filter.keyword.trim() != '') || (vm.filter.groups.length > 0) || (vm.filter.roles.length > 0);

                    vm.pageIndex = 0;
                    vm.getUsers();
                }
            });
        };

        /**
         * Perform search
         */
        vm.search = function () {
            vm.filter.keyword = vm.filterTemp.keyword;
            vm.filter.filtered = (vm.filter.keyword.trim() != '') || (vm.filter.groups.length > 0) || (vm.filter.roles.length > 0);

            vm.pageIndex = 0;
            vm.getUsers();
        };

        /**
         * When removing a selected filter criteria
         *
         * @param type
         * @param id
         */
        vm.onFilterRemoved = function (type, item) {

            if (!type || !item) {
                return;
            }

            var index = -1;

            switch (type) {
                case '_keyword':
                    vm.filter.keyword = '';

                    break;
                case '_roles':
                    index = utils.indexOf(item, vm.filter.roles);
                    if (index >= 0) {
                        vm.filter.roles.splice(index, 1);
                    }

                    break;
                case '_groups':
                    index = utils.indexOf(item, vm.filter.groups);
                    if (index >= 0) {
                        vm.filter.groups.splice(index, 1);
                    }

                    break;
            }

            // Update filter status
            vm.filter.filtered = (vm.filter.keyword.trim() != '') || (vm.filter.groups.length > 0) || (vm.filter.roles.length > 0);

            // Update data
            vm.pageIndex = 0;
            vm.getUsers();
        };

        /**
         * Get Firstname & Lastname from fullname
         */
        $scope.$watch('vm.user.person.displayName', function (newVal, oldVal) {

            if (!newVal) {
                return;
            }

            var fullname = String(newVal).trim();
            if (fullname.length <= 0) {
                return;
            }

            var spaceIndex = fullname.indexOf(' ');

            if (spaceIndex > 0) {
                vm.user.person.firstName = fullname.substr(0, spaceIndex);
                vm.user.person.lastName = fullname.substr(spaceIndex + 1);
            }
        });

        /**
         * Table definition
         * @type {{options: {data: (Array|*), idField: string, sortable: boolean, striped: boolean, maintainSelected: boolean, clickToSelect: boolean, showColumns: boolean, singleSelect: boolean, showToggle: boolean, pagination: boolean, pageSize: (number|*), pageList: number[], locale: string, sidePagination: string, columns: *, onCheck: UserController.bsTableControl.options.onCheck, onUncheck: UserController.bsTableControl.options.onUncheck, onUncheckAll: UserController.bsTableControl.options.onUncheckAll, onPageChange: UserController.bsTableControl.options.onPageChange}}}
         */
        vm.bsTableControl = {
            options: {
                data: vm.users,
                idField: 'id',
                sortable: true,
                striped: true,
                maintainSelected: true,
                clickToSelect: false,
                showColumns: false,
                singleSelect: true,
                showToggle: false,
                pagination: true,
                pageSize: vm.pageSize,
                pageList: [5, 10, 25, 50, 100],
                locale: settings.locale,
                sidePagination: 'server',
                columns: service.getTableDefinition(),
                onCheck: function (row, $element) {
                    $scope.safeApply(function () {
                        vm.selectedUsers = [];
                        if (row.username && row.username != 'admin') {
                            vm.selectedUsers.push(row);
                        } else {
                            bsTableAPI('bsTableControl', 'uncheckBy', {field: 'username', values: ['admin']});
                        }
                    });
                },
                onUncheck: function (row, $element) {
                    $scope.safeApply(function () {
                        vm.selectedUsers = [];
                    });
                },
                onPageChange: function (index, pageSize) {
                    vm.pageSize = pageSize;
                    vm.pageIndex = index;

                    vm.getUsers();
                }
            }
        };
    }

})();
