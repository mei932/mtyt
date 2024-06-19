
(function () {
    'use strict';

    angular.module('Hrm.ChoMeo').service('ChoMeoService', ChoMeoService);

    ChoMeoService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function ChoMeoService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getTableDefinition = getTableDefinition;
        self.getChoMeo= getAll;
        self.postChoMeo=postChoMeo; 
        self.deleteChoMeo= deleteChoMeo;
        
        function deleteChoMeo(ids, successCallback, errorCallback) {
            if (!ids ) {
                return $q.when(null);
            }

            var url = baseUrl +'chomeo/removeList'
            return utils.resolveAlt(url, 'DELETE', null, ids, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }
        function postChoMeo(priority, successCallback, errorCallback){
            var url=baseUrl+'chomeo/add'
            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getAll(){
            var url=baseUrl+'chomeo/getAll';
            return utils.resolve(url,'GET',angular.noop,angular.noop);
        }

        function getTableDefinition() {
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
                    field: 'numberOfFeet',
                    title: 'số chân',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'ages',
                    title: 'tuổi',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap
                }
                , {
                    field: 'weight',
                    title: 'cân nặng',
                    sortable: true,
                    switchable: false,
                    cellStyle: _cellNowrap,
                    
                }
                
            ]
        }
        
        
    }

})();