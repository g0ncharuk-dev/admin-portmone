(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('SliderPageCtrl', SliderPageCtrl)
        .directive('selectpicker', selectpicker);

    /** @ngInject */
    function SliderPageCtrl($scope, $filter, $state, toastr, baProgressModal, $uibModal,
                            SliderFactory, dataService) {
        var vm = this;

        vm.createPage = createPage;
        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;

        baProgressModal.open();
        SliderFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = res;
                baProgressModal.close();
            }
        }, function () {
            toastr.error('Неудача!');
            baProgressModal.close();
        });

        function updateList() {
            baProgressModal.open();
            SliderFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm._itemList = res;
                    baProgressModal.close();
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }

        function createPage() {
            $state.go('main.home.sliderAdd')
        }

        function editPage(item) {
            dataService.editID = item;
            $state.go('main.home.sliderEdit')
        }

        function openDeleteModal(page, size, id) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size
            }).result.then(function () {
                vm.deleteItem(id);
            });
        }

        function deleteItem(id) {
            var fd = new FormData();
            fd.append("id", id);
            fd.append("remember_token", vm.token);

            baProgressModal.open();
            SliderFactory.deleteItem(fd).then(
                function (res) {
                    if (res) {
                        vm.updateList();
                        baProgressModal.close();
                        toastr.error('Удалено')
                    }
                },
                function () {
                    toastr.error('Неудача!');
                    baProgressModal.close();
                });
        }
    }

    function selectpicker() {
        return {
            restrict: 'A',
            require: '?ngOptions',
            priority: 1500, // make priority bigger than ngOptions and ngRepeat
            link: {
                pre: function (scope, elem, attrs) {
                    elem.append('<option data-hidden="true" disabled value="">' + (attrs.title || 'Select something') + '</option>')
                },
                post: function (scope, elem, attrs) {
                    function refresh() {
                        elem.selectpicker('refresh');
                    }

                    if (attrs.ngModel) {
                        scope.$watch(attrs.ngModel, refresh);
                    }

                    if (attrs.ngDisabled) {
                        scope.$watch(attrs.ngDisabled, refresh);
                    }

                    elem.selectpicker({dropupAuto: false, hideDisabled: true});
                }
            }
        };
    }
})();
