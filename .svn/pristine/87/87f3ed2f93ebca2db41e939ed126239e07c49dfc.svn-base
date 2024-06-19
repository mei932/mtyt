(function () {
    'use strict';

    Hrm.LabourAgreementType = angular.module('Hrm.LabourAgreementType', [
        'ui.router',
        'oc.lazyLoad',
        'bsTable',
        'toastr',
        'ui.select',
        'Hrm.Common'
    ]);

    	Hrm.LabourAgreementType.config(['$stateProvider', function ($stateProvider) {

        $stateProvider

            // Event priority
            .state('application.labouragreementtype', {
                url: '/labouragreementtype',
                templateUrl: 'labouragreementtype/views/labouragreementtype.html',
                data: {pageTitle: 'Loại Hợp đồng lao động'},
                controller: 'LabourAgreementTypeController as vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'Hrm.LabourAgreementType',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'labouragreementtype/controllers/LabourAgreementTypeController.js',
                                'labouragreementtype/business/LabourAgreementTypeService.js'
                            ]
                        });
                    }]
                }
            });
    }]);

})();