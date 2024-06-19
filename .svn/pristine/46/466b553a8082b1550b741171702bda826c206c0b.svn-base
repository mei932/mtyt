(function () {

    'use strict';

    /* Setup App Main Controller */
    Hrm.controller('AppController', ['$rootScope', '$scope', '$cookies', '$state', '$timeout', 'constants', 'settings', '$uibModal', 'toastr', 'Upload', 'focus', 'UserService', 'OAuth',
        function ($rootScope, $scope, $cookies, $state, $timeout, constants, settings, modal, toastr, Upload, focus, userService, OAuth) {
            $scope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            $scope.$on('$viewContentLoaded', function () {

            });

            $scope.currentUser = {displayName: ''};
            $rootScope.$on('$onCurrentUserData', function (event, data) {
                if (data != null) {
                    $scope.currentUser = data;
                }

                if ($scope.currentUser.person && $scope.currentUser.person.displayName) {
                    $scope.currentUser.displayName = $scope.currentUser.person.displayName;
                } else {
                    $scope.currentUser.displayName = $scope.currentUser.username;
                }
            });

            $rootScope.$on('$userPhotoChanged', function(event, data) {
                $scope.currentUser.hasPhoto = true;

                angular.element('#_user_profile_photo_small').attr('src', settings.api.baseUrl + 'public/users/photo/' + $scope.currentUser.username + '?d=' + moment().format('MMDDYY-hhmmss'));
                angular.element('#_user_profile_photo_big').attr('src', settings.api.baseUrl + 'public/users/photo/' + $scope.currentUser.username + '?d=' + moment().format('MMDDYY-hhmmss'));
            });

            /**
             * Change password
             */
            $scope.changePassword = function () {
                var modalInstance = modal.open({
                    animation: true,
                    templateUrl: 'change_password_modal.html',
                    scope: $scope,
                    size: 'md'
                });

                $scope.changePasswordObj = {
                    currentPassword: null,
                    newPassword: null,
                    newPasswordRep: null,
                    saveNewPassword: function () {
                        if (!$scope.changePasswordObj.currentPassword || $scope.changePasswordObj.currentPassword.trim() == '') {
                            toastr.error('Vui lòng nhập mật khẩu hiện thời của bạn.', 'Thông báo');
                            focus('_frm_change_password.current_password');
                            return;
                        }

                        if (!$scope.changePasswordObj.newPassword || $scope.changePasswordObj.newPassword.trim() == '') {
                            toastr.error('Vui lòng nhập mật khẩu mới.', 'Thông báo');
                            focus('_frm_change_password.new_password');
                            return;
                        }

                        if ($scope.changePasswordObj.newPassword != $scope.changePasswordObj.newPasswordRep) {
                            toastr.error('Mật khẩu mới không khớp nhau. Vui lòng kiểm tra lại!', 'Thông báo');
                            focus('_frm_change_password.new_password_rep');
                            return;
                        }

                        userService.passwordValid({password: $scope.changePasswordObj.currentPassword}).then(function (data) {
                            if (!data) {
                                toastr.error('Mật khẩu hiện thời không đúng. Vui lòng kiểm tra lại!', 'Thông báo');
                                focus('_frm_change_password.current_password');
                                return;
                            } else {
                                var userObj = {
                                    id: $scope.currentUser.id,
                                    username: $scope.currentUser.username,
                                    password: $scope.changePasswordObj.newPassword
                                };
                                userService.changePasswordSelf(userObj, function success() {

                                    toastr.info('Bạn đã cập nhật thành công mật khẩu của mình.', 'Thông báo');

                                    modal.open({
                                        animation: true,
                                        templateUrl: 'password_changed_modal.html',
                                        scope: $scope,
                                        backdrop: 'static',
                                        keyboard: false,
                                        size: 'md'
                                    });

                                }, function error() {
                                    toastr.error('Có lỗi xảy ra khi cập nhật mật khẩu. Mật khẩu của bạn vẫn được giữ nguyên như cũ.', 'Thông báo');
                                }).then(function (data) {
                                    modalInstance.close();
                                });
                            }
                        });
                    }
                };
            };

            /**
             * Upload profile photo
             */
            $scope.profilePhoto = {
                uploadedFile: null,
                errorFile: null,
                modalDialog: null,
                loadedImageData: '',
                cropper: {x: 0, y: 0, w: 0, h: 0, cropWidth: 300, cropHeight: 300},
                croppedImage: '',
                photoUrl: '',
                showUploadModal: function () {
                    if (!$scope.currentUser || !$scope.currentUser.id) {
                        return;
                    }

                    $scope.profilePhoto.modalDialog = modal.open({
                        animation: true,
                        templateUrl: 'upload_photo_modal.html',
                        scope: $scope,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'md'
                    });
                },
                triggerUpload: function (file, errFiles) {
                    $scope.profilePhoto.uploadedFile = file;
                    $scope.profilePhoto.errorFile = errFiles && errFiles[0];
                },
                startUploadFile: function (file) {
                    if (file) {
                        var url = settings.api.baseUrl + settings.api.apiPrefix + 'users/photo/upload';

                        file.upload = Upload.upload({
                            url: url,
                            data: {file: file}
                        }).progress(function (evt) {
                            $scope.profilePhoto.uploadedFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function (data, status, headers, config) {
                            $timeout(function() {
                                $scope.profilePhoto.uploadedFile = null;
                                $scope.profilePhoto.errorFile = null;
                                $scope.profilePhoto.modalDialog.close();

                                $scope.profilePhoto.photoUrl = settings.api.baseUrl + 'public/users/photo/' + $scope.currentUser.username;

                                // Start cropping...
                                $scope.profilePhoto.modalDialog = modal.open({
                                    animation: true,
                                    templateUrl: 'crop_photo_modal.html',
                                    scope: $scope,
                                    backdrop: 'static',
                                    keyboard: false,
                                    size: 'md'
                                });

                                $scope.profilePhoto.modalDialog.result.then(function(confirm) {
                                    $scope.profilePhoto.cropper.x = $scope.profilePhoto.cropper.cropImageLeft;
                                    $scope.profilePhoto.cropper.y = $scope.profilePhoto.cropper.cropImageTop;
                                    $scope.profilePhoto.cropper.w = $scope.profilePhoto.cropper.cropImageWidth;
                                    $scope.profilePhoto.cropper.h = $scope.profilePhoto.cropper.cropImageHeight;
                                    $scope.profilePhoto.cropper.user = $scope.currentUser;

                                    userService.cropProfilePhoto($scope.profilePhoto.cropper).then(function(data) {
                                        // emit event...
                                        $rootScope.$emit('$userPhotoChanged', data);
                                    });
                                });
                            }, 500);
                        });
                    }
                },
                closeUploadFile: function () {
                    $scope.profilePhoto.uploadedFile = null;
                    $scope.profilePhoto.errorFile = null;

                    if ($scope.profilePhoto.modalDialog) {
                        $scope.profilePhoto.modalDialog.close();
                    }
                }
            };

            /**
             * Check if the current user has role [ROLE NAME]
             *
             * @param user
             * @param roleName
             */
            $scope.hasRole = function (user, roleName) {

                if (!user || !roleName || !user.id || !user.roles || user.roles.length <= 0) {
                    return false;
                }

                var ret = false;
                var roles = user.roles;
                angular.forEach(roles, function (role) {
                    if (role.name && role.name.toLowerCase() == roleName.toLowerCase()) {
                        ret = true;
                    }
                });

                return ret;
            };

            /**
             * Check if the current user has any of the given roles
             *
             * @param user
             * @param roleNames
             * @returns {boolean}
             */
            $scope.hasAnyRoles = function (user, roleNames) {

                if (!user || !user.id || !user.roles || user.roles.length <= 0 || !roleNames || roleNames.length <= 0) {
                    return false;
                }

                var ret = false;
                var _roles = user.roles;
                angular.forEach(_roles, function (_role) {
                    if (_role.authority) {
                        angular.forEach(roleNames, function (roleName) {
                            if (roleName) {
                                if (roleName.toLowerCase() == _role.authority.toLowerCase()) {
                                    ret = true;
                                }
                            }
                        });
                    }
                });

                return ret;
            };

            /**
             * Check if the current user has all of the given roles
             *
             * @param user
             * @param roleNames
             * @returns {boolean}
             */
            $scope.hasAllRoles = function (user, roleNames) {

                if (!user || !user.id || !user.roles || user.roles.length <= 0 || !roleNames || roleNames.length <= 0) {
                    return false;
                }

                var _roles = user.roles;
                var inAllRole = true;

                angular.forEach(_roles, function (_role) {
                    if (_role.authority) {
                        angular.forEach(roleNames, function (roleName) {
                            if (roleName) {
                                inAllRole = inAllRole && (roleName.toLowerCase() == _role.authority.toLowerCase());
                            }
                        });
                    }
                });

                return false;
            };

            /**
             * Logout...
             */
            $scope.logout = function () {
                OAuth.revokeToken();
                $cookies.remove(constants.oauth2_token);
                $state.go('login');
            };
        }
    ]);

    /***
     Layout Partials.
     By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
     initialization can be disabled and Layout.init() should be called on page load complete as explained above.
     ***/

    /* Setup Layout Part - Header */
    Hrm.controller('HeaderController', ['$scope', '$state', function ($scope, $state) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader($state);
            Layout.initContent();
        });
    }]);

    /* Setup Layout Part - Sidebar/Page header */
    Hrm.controller('SidebarController', ['$scope', 'settings', function ($scope, settings) {
        $scope.$on('$includeContentLoaded', function () {
            // Layout.initSidebar(); // init sidebar
        });
    }]);

    /* Setup Layout Part - Quick Sidebar */
    Hrm.controller('QuickSidebarController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            setTimeout(function () {
                // QuickSidebar.init(); // init quick sidebar
            }, 2000)
        });
    }]);

    Hrm.controller('PageHeadController', ['$scope', function($scope) {
        $scope.$on('$includeContentLoaded', function() {
            // Demo.init(); // init theme panel
        });
    }]);

    /* Setup Layout Part - Theme Panel */
    Hrm.controller('ThemePanelController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            // ThemeSettings.init(); // init theme panel
        });
    }]);

    /* Setup Layout Part - Footer */
    Hrm.controller('FooterController', ['$scope', 'settings', function ($scope, settings) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter();
        });
    }]);

})();