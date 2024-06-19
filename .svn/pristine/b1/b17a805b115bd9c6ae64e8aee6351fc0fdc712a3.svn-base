(function () {
    'use strict';

    Hrm.Staff = angular.module('Hrm.Staff', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'ngJsTree',
        'Hrm.Common'
    ]);

    	Hrm.Staff.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.staff', {
                url: '/staff',
                templateUrl: 'staff/views/staff.html',
                data: {
                    icon: 'icon-people',
                    pageTitle: 'Nhân sự',
                    pageSubTitle: 'Thông tin nhân sự'
                },
                controller: 'StaffController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.Staff',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'staff/controllers/StaffController.js',
                                'staff/business/StaffService.js',
                                'positiontitle/business/PositionTitleService.js',
                                'department/business/DepartmentService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();