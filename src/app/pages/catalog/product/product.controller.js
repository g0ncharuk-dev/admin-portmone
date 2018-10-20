(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('ProductPageCtrl', ProductPageCtrl);

    /** @ngInject */
    function ProductPageCtrl($scope, $filter, $state, toastr, baProgressModal, $uibModal, ProductFactory, dataService, ImgConfig) {
        var vm = this;

        vm.createPage = createPage;
        vm.editPage = editPage;
        vm.editList = editList;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;
        vm.showInStock = showInStock;
        vm.showInRecommended = showInRecommended;

        vm.imageLink = ImgConfig.products;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        baProgressModal.open();

        vm.tableSize = 20;
        vm.showInStockVal = [
            {text: 'да', val: 1},
            {text: 'нет', val: 0}
        ];
        vm.showInRecommendedVal = [
            {text: 'да', val: 1},
            {text: 'нет', val: 0}
        ];

        ProductFactory.getList(vm.token).then(function (res) {
            if (res) {
                vm.itemList = _.map(res, function (val) {
                    return _.transform(val, function (result, val, key) {
                        result[key] = val;
                        if (key === 'discount')
                            result[key] = Number(val)
                    })
                });
                vm._itemList = vm.itemList;
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        function updateList() {
            baProgressModal.open();
            ProductFactory.getList(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = _.map(res, function (val) {
                        return _.transform(val, function (result, val, key) {
                            result[key] = val;
                            if (key === 'discount')
                                result[key] = Number(val)
                        })
                    });
                    vm._itemList = vm.itemList;
                    baProgressModal.close();
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')

            });
        }

        function editList(data, id) {
            var fd = new FormData();
            fd.append("id", id);
            fd.append("remember_token", vm.token);
            fd.append("price", data.price);
            fd.append("price_old", data.price_old);
            fd.append("count", data.count);
            fd.append("in_stock", data.in_stock);
            fd.append("discount", data.discount);
            fd.append("in_recommended", data.in_recommended);

            baProgressModal.open();
            ProductFactory.editList(fd).then(function (res) {
                if (res) {
                    toastr.info('Изменено');
                    baProgressModal.close();
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')

            });
        }

        function createPage() {
            $state.go('main.catalog.productAdd')
        }

        function editPage(id) {
            dataService.editID = id;
            $state.go('main.catalog.productEdit')
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
            ProductFactory.deleteItem(fd).then(function (res) {
                if (res.data == null) {
                    vm.updateList();
                    toastr.error('Удалено');
                    baProgressModal.close();
                }
            });
        }

        function showInStock(item) {
            if (item.in_stock && vm.showInStockVal.length) {
                var selected = $filter('filter')(vm.showInStockVal, {val: item.in_stock});
                return selected.length ? selected[0].text : 'нет';
            } else return 'нет'
        }

        function showInRecommended(item) {
            if (item.in_recommended && vm.showInRecommendedVal.length) {
                var selected = $filter('filter')(vm.showInRecommendedVal, {val: item.in_recommended});
                return selected.length ? selected[0].text : 'нет';
            } else return 'нет'
        }
    }
})();
