(function () {
    'use strict';

    angular.module('BlurAdmin.pages.review')
        .factory('ReviewFactory', ReviewFactory)
        .service('dataService', dataService);

    /** @ngInject */
    function ReviewFactory($http, Config, $q) {
        return {
            getItem: getItem,
            editItem: editItem,
            deleteItem: deleteItem
        };

        function getItem(token) {

            var request = $http({
                method: 'POST',
                url: Config.getReviewList,
                data: {"remember_token": token}
            });

            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.updateReview,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function deleteItem(data) {
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.deleteReview,
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
