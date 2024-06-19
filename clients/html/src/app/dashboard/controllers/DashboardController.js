/**
 * Created by bizic on 28/8/2016.
 */
(function () {
    'use strict';

    angular.module('Hrm.Dashboard').controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        '$rootScope',
        '$scope',
        'Utilities',
        'settings',
        'toastr',
        'Upload'
    ];
    
    function DashboardController ($rootScope, $scope, utils, settings, toastr, Uploader) {
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            App.initAjax();
        });

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        var vm = this;

        vm.event = {};
        vm.eventAttachments = [];

        vm.saveEvent = function () {
            // Validate form
            if (!vm.event.title || vm.event.title.trim() == '') {
                toastr.error('Vui lòng nhập tiêu đề sự kiện', 'Lỗi');
                return;
            }

            if (!vm.eventAttachments || vm.eventAttachments.length <= 0) {
                toastr.error('Vui lòng chọn ít nhất một tệp tin đính kèm', 'Lỗi');
                return;
            }

            Uploader.upload({
                url: settings.api.baseUrl + settings.api.apiV1Url + 'test_upload',
                method: 'POST',
                data: {files: vm.eventAttachments, event: JSON.stringify(vm.event)}
                //data: {files: vm.eventAttachments, event: JSON.stringify(vm.event)}
            }).then(function (successResponse) {
                toastr.info('Data successfully submitted!', 'Info');
            }, function (errorResponse) {
                toastr.error('Error submitting data...', 'Error');
            }, function (evt) {
                console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '%');
            });
        };

        vm.removeAttachment = function (filename) {
            if (!filename || !vm.eventAttachments || vm.eventAttachments.length <= 0) {
                return;
            }

            var pos = -1;
            for (var i = 0; i < vm.eventAttachments.length; i ++) {
                if (vm.eventAttachments[i].name == filename) {
                    pos = i;
                    break;
                }
            }

            if (pos >= 0) {
                vm.eventAttachments.splice(pos, 1);
            }
        };
    }

})();
