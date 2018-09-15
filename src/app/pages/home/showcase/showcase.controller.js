(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('ShowcasePageCtrl', ShowcasePageCtrl);

    /** @ngInject */
    function ShowcasePageCtrl($scope, $filter, $state, toastr, baProgressModal, CategoryFactory, ShowcaseFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.token = localStorage.getItem('token');
        baProgressModal.open();

        function findAll(id, items) {
            var i = 0, found, result;
            for (; i < items.length; i++) {
                if (items[i].id === id) {
                    result = items[i];
                } else if (_.isArray(items[i].children)) {
                    found = findAll(id, items[i].children);
                    if (found) {
                        result = found;
                    }
                }
            }
            return result;
        }

        ShowcaseFactory.getItem(vm.token)
            .then(function (res) {
                if (res) {
                    vm.showcaseList = res;
                }
            })
            .then(function () {
                CategoryFactory.getTree(vm.token).then(function (res) {
                    if (res) {
                        vm.categoryTree = res;
                        var sorted = _.sortBy(vm.showcaseList, "id");
                        vm.formParentCategory = _.map(sorted, function (item) {
                            return findAll(item.category_id, vm.categoryTree);
                        });
                        baProgressModal.close();
                    }
                });
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });


        function updateList() {
            ShowcaseFactory.getItem(vm.token)
                .then(function (res) {
                    if (res) {
                        vm.showcaseList = res;
                    }
                })
                .then(function () {
                    CategoryFactory.getTree(vm.token).then(function (res) {
                        if (res) {
                            vm.categoryTree = res;
                            var sorted = _.sortBy(vm.showcaseList, "id");
                            vm.formParentCategory = _.map(sorted, function (item) {
                                return findAll(item.category_id, vm.categoryTree);
                            });
                            baProgressModal.close();
                        }
                    });
                }, function () {
                    toastr.error('Неудача!');
                    baProgressModal.close();
                });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            _.map(vm.formParentCategory, function (item, index) {
                item ? fd.append("category[" + index + "]", JSON.stringify(
                    [ index + 1,  item.id]
            )) : null;
            });
            baProgressModal.open();

            ShowcaseFactory.editItem(fd).then(function (res) {
                if (res) {
                    vm.updateList();
                    toastr.info('Изменено');
                    baProgressModal.close();
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }
    }
})();
