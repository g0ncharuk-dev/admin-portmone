(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .factory('CategoryFactory', CategoryFactory)
        .service('dataService', dataService);

    /** @ngInject */
    function CategoryFactory($http, Config, $q) {

        return {
            getItem: getItem,
            getTree: getTree,
            createItem: createItem,
            editItem: editItem,
            deleteItem: deleteItem
        };

        function getTree(token) {
            var fd = new FormData();
            fd.append("remember_token", token);

            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.getCategoryTree,
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function getItem(token) {
            var fd = new FormData();
            fd.append("remember_token", token);

            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                // transformRequest: angular.identity,
                url: Config.getCategoryList,
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function createItem(data) {
            var request = $http({
                method: 'POST',
                headers: { 'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.createCategory,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.updateCategory,
                data: data
            });
            return (request.then(handleSuccess, handleError));
        }

        function deleteItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.deleteCategory,
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
