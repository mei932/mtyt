(function () {
    'use strict';

    Hrm.User = angular.module('Hrm.User', [
        'ui.router',
        'ui.select',
        'oc.lazyLoad',
        'bsTable',
        'toastr',

        'Hrm.Common'
    ]);

    Hrm.User.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

        // User Listing
            .state('application.user_accounts', {
                url: '/user/accounts',
                templateUrl: 'users/views/users.html',
                data: {
                    icon: 'icon-equalizer',
                    pageTitle: 'Hệ thống',
                    pageSubTitle: 'Quản lý người dùng'
                },
                controller: 'UserController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.User',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'users/controllers/UserController.js',
                            ]
                        });
                    }]
                }
            })

            // User Group Listing
            .state('application.user_groups', {
                url: '/user/groups',
                templateUrl: 'users/views/user_groups.html',
                data: {
                    icon: 'icon-equalizer',
                    pageTitle: 'Hệ thống',
                    pageSubTitle: 'Nhóm người dùng'
                },
                controller: 'UserGroupController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.User',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'users/controllers/UserGroupController.js',
                                'users/business/UserGroupService.js'
                            ]
                        });
                    }]
                }
            })

            // Role Listing
            .state('application.user_roles', {
                url: '/user/roles',
                templateUrl: 'users/views/roles.html',
                data: {
                    icon: 'icon-equalizer',
                    pageTitle: 'Hệ thống',
                    pageSubTitle: 'Vai trò người dùng'
                },
                controller: 'UserRoleController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.User',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'users/controllers/UserRoleController.js',
                                'users/business/UserRoleService.js'
                            ]
                        });
                    }]
                }
            })

            // Permission Granting
            .state('application.user_permissions', {
                url: '/user/permissions',
                templateUrl: 'users/views/permissions.html',
                data: {
                    icon: 'icon-equalizer',
                    pageTitle: 'Hệ thống',
                    pageSubTitle: 'Phân quyền'
                },
                controller: 'PermissionController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.User',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'users/controllers/PermissionController.js',
                                'users/business/PermissionService.js'
                            ]
                        });
                    }]
                }
            })
    }]);

})();