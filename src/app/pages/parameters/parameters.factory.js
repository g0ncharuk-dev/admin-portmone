(function () {
    'use strict';

    angular.module('BlurAdmin.pages.parameters')
        .factory('ParametersFactory', ParametersFactory)
        .service('dataService', dataService);

    /** @ngInject */
    function ParametersFactory($http, Config, $q) {

        return {
            getItem: getItem,
            editItem: editItem
        };

        function getItem(token) {

            var request = $http({
                method: 'POST',
                url: Config.getParameter,
                data: {"remember_token": token}
            });

            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.updateParameter,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function handleSuccess(response) {
            return (response.data);
        }

        function handleError(response) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject("An unknown error occurred."));
            }
            return ($q.reject(response.data.message));
        }
    }

    function dataService() {
        var _editID = null, _canAdd = null;
        this.editID = _editID;
        this.canAdd = _canAdd;
    }

})();
