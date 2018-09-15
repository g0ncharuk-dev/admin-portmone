/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('SliderAddCtrl', SliderAddCtrl);

    /** @ngInject */
    function SliderAddCtrl($scope, $filter, $state, toastr, baProgressModal, SliderFactory, dataService) {
        var vm = this;

        vm.createItem = createItem;
        vm.goBack = goBack;

        vm.canAdd = dataService.canAdd;
        vm.canAdd === null ? $state.go("main.home.slider") : void(0);
        vm.token = localStorage.getItem('token');

        function createItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("title_first", vm.formTitle1);
            fd.append("title_second", vm.formTitle2);
            fd.append("link", vm.formLink);
            fd.append("image", vm.formImg[0]);

            baProgressModal.open();
            SliderFactory.createItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.home.slider");
                    baProgressModal.close();
                    toastr.success('Создано')
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }

        function goBack() {
            $state.go("main.home.slider")
        }
    }


})();
