(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .factory('SeoFactory', SeoFactory);


    /** @ngInject */
    function SeoFactory($http, Config, $q) {

        return {
            getItem: getItem,
            editItem: editItem
        };

        function getItem(token) {
            var fd = new FormData();
            fd.append("remember_token", token);
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.getSeo,
                data: fd
            });
            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {

            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
                url: Config.updateSeo,
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

})();
