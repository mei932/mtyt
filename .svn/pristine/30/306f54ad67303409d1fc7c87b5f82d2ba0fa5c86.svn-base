(function () {
    'use strict';

    Hrm.XacNhanNopPhi = angular.module('Hrm.XacNhanNopPhi', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'ngJsTree',
        'Hrm.Common'
    ]);

    	Hrm.XacNhanNopPhi.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.XacNhanNopPhi', {
                url: '/XacNhanNopPhi',
                templateUrl: 'XacNhanNopPhi/views/XacNhanNopPhi.html',
                data: {
                    icon: 'icon-people',
                    pageTitle: 'Danh sách hồ sơ',
                    pageSubTitle: 'Xác nhận nộp phí'
                },
                controller: 'XacNhanNopPhiController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.XacNhanNopPhi',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'XacNhanNopPhi/controllers/XacNhanNopPhiController.js',
                                'XacNhanNopPhi/business/XacNhanNopPhiService.js',
                            ]
                        });
                    }]
                }
            })

            // Event priority
            .state('application.HoSoChiTiet', {
                url: '/HoSoChiTiet/:hoSoId',
                templateUrl: 'XacNhanNopPhi/views/HoSoChiTiet.html',
                data: {
                    icon: 'icon-people',
                    pageTitle: 'Danh sách hồ sơ',
                    pageSubTitle: 'Chi tiết hồ sơ'
                },
                controller: 'HoSoChiTietController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.XacNhanNopPhi',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'XacNhanNopPhi/controllers/HoSoChiTietController.js',
                                'XacNhanNopPhi/business/XacNhanNopPhiService.js',
                            ]
                        });
                    }]
                }
            });
    }]);

})();