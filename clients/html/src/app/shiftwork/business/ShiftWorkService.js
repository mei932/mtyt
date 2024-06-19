/**
 * Author Giang 21/4/2018.
 */
(function () {
    'use strict';

    angular.module('Hrm.ShiftWork').service('ShiftWorkService', ShiftWorkService);

    ShiftWorkService.$inject = [
        '$http',
        '$q',
        '$filter',
        'settings',
        'Utilities'
    ];

    function ShiftWorkService($http, $q, $filter, settings, utils) {
        var self = this;
        var baseUrl = settings.api.baseUrl + settings.api.apiV1Url;

        self.getShiftWorks = getShiftWorks;
        self.saveShiftWork = saveShiftWork;
        self.getShiftWork = getShiftWork;
        self.deleteShiftWorks = deleteShiftWorks;
        self.getTableDefinition = getTableDefinition;
        var restUrl = 'shiftwork';
        function getShiftWorks(pageIndex, pageSize) {
            var url = baseUrl +'/'+ restUrl;
            url += '/'+pageIndex;
            url += '/' + ((pageSize > 0) ? pageSize : 25);

            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        function getListColumns() {
            var url = baseUrl +'/'+ restUrl;
            url += '/viewlist'
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }
        function saveShiftWork(priority, successCallback, errorCallback) {
            var url = baseUrl + restUrl;

            return utils.resolveAlt(url, 'POST', null, priority, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getShiftWork(id) {
            if (!id) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl+'/' + id;
            return utils.resolve(url, 'GET', angular.noop, angular.noop);
        }

        function deleteShiftWorks(priorities, successCallback, errorCallback) {
            if (!priorities || priorities.length <= 0) {
                return $q.when(null);
            }

            var url = baseUrl +'/'+  restUrl;
            return utils.resolveAlt(url, 'DELETE', null, priorities, {
                'Content-Type': 'application/json; charset=utf-8'
            }, successCallback, errorCallback);
        }

        function getTableDefinition() {
            var _tableOperation = function (value, row, index) {
                return '<a class="green-dark margin-right-20" href="#" data-ng-click="$parent.editShiftWork(' + "'" + row.id + "'" + ')"><i class="icon-pencil margin-right-5"></i>Sửa</a>';
            };

            var _cellNowrap = function (value, row, index, field) {
                return {
                    classes: '',
                    css: {'white-space': 'nowrap'}
                };
            };
            var retListColumns = [];
            var col ={};
            col ={
                    field: 'state',
                    checkbox: true
                };
            retListColumns.push(col);
            
            getListColumns().then(function (data) {
            	var col ={};
                	col =  {
                        sortable: true,
                        switchable: false,
                        //cellStyle: _cellNowrap
                    };
            		data.forEach(function(element) {
                    col =  {
                            sortable: true,
                            switchable: false,
                            //cellStyle: _cellNowrap
                        };            		
                    if(element.formatter!=null && element.formatter.trim()=='_tableOperation'){
                    	col.formatter = _tableOperation;
                    }
                    if(element._cellNowrap!=null && element._cellNowrap.trim()=='_cellNowrap'){
                    	col.cellStyle = cellStyle;
                    }                    
            		col.field = element.field;
            		col.title = element.title;
            		retListColumns.push(col);
            	});
            })
            return retListColumns;            
        }
    }

})();