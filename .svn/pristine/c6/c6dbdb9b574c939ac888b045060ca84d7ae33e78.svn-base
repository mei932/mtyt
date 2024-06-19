/**
 * Author Giang 21/04/2018
 */
(function () {
    'use strict';

    angular.module('Hrm.TimeSheet').controller('TestAutoController', TestAutoController);

    TestAutoController.$inject = [
        '$rootScope',
        '$scope',
        '$http'
    ];
    function TestAutoController($rootScope, $scope,$http) {
      	 $scope.search1 = function(userInputString) {
           return $http.get('http://localhost:8082/hrm/public/staff?textSearch='+userInputString, {timeout: 400});
         };
    }

})();