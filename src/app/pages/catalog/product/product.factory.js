(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .factory('ProductFactory', ProductFactory)
        .service('dataService', dataService);

    /** @ngInject */
    function ProductFactory($http, Config, $q) {
        return {
            getList: getList,
            getCategory: getCategory,
            getItemById: getItemById,
            createItem: createItem,
            editItem: editItem,
            editList:editList,
            deleteItem: deleteItem
        };

        function getList(token) {
            var fd = new FormData();
            fd.append("remember_token", token);
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.getProductList,
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function getCategory(token) {
            var fd = new FormData();
            fd.append("remember_token", token);
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                url: Config.getProductCategory,
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function getItemById(token,id) {
            var fd = new FormData();
            fd.append("remember_token", token);
            fd.append("id", id);
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.getProductById + id + '/edit',
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function createItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.creteProduct,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function editList(data) {

            var request = $http({
                method: 'POST',
                headers: { 'Content-Type': undefined },
                url: Config.updateProductList,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {

            var request = $http({
                method: 'POST',
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                url: Config.updateProduct,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function deleteItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.deleteProduct,
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
