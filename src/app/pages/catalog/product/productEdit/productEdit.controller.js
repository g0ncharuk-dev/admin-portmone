/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('ProductEditCtrl', ProductEditCtrl);

    /** @ngInject */
    function ProductEditCtrl($scope, $filter, $state, ProductFactory, toastr, dataService, ImgConfig) {

        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        vm.editorOptions = {
            heightMin: 100,
            heightMax: 400,
            charCounterMax: 250,
            toolbarButtons: [
                "paragraphFormat", "|",
                "bold", "italic", "underline", "color", "|",
                'insertLink', "|",
                "align", "formatOL", "formatUL", "|"
                , 'subscript', 'superscript'
            ]
        };
        vm.editObj = dataService.editID;
        vm.editObj === null ? $state.go("main.catalog.product") : '';



        ProductFactory.getItemById(vm.token, vm.editObj).then(function (res) {
            if (res) {
                vm.productById = res.product;
                ProductFactory.getCategory(vm.token).then(function (res) {
                    if (res) {
                        _.forEach(res, function (val) {
                            if (val.id === vm.productById.category_id) {
                                vm.categoryTreeChildCheck = val;
                            }
                        });
                        // vm.productById.filters = { "razmer": "большой", "orientation": "горизонтальная" },

                        var attrsAll = _.map(vm.categoryTreeChildCheck.filter_all, function (obj) {
                            return _.assign(obj, _.find(vm.productById.attributes, {
                                filter_id: obj.id
                            }));
                        });
                        var attrTransform = {};
                        var attrTransformTemp = _.map(attrsAll, function (item) {
                            return _.transform(item, function (res, val, key) {
                                if (key === 'translit') {
                                    res[val] = item.value
                                }
                            });
                        });

                        _.forEach(attrTransformTemp, function (val, key) {
                            _.forEach(val, function (val, key) {
                                attrTransform[key] = val
                            });
                        });

                        vm.productFilters = attrTransform;

                        vm.fillForm();
                    }
                });
            }
        });

        function fillForm() {
            vm.formName = vm.productById.name;
            vm.formPrice = Number(vm.productById.price);
            vm.formPriceOld = Number(vm.productById.price_old);
            vm.formPriceOpt = Number(vm.productById.price_opt);
            vm.formCount = Number(vm.productById.count);
            vm.formDiscount = Number(vm.productById.discount);
            vm.formInStock = JSON.parse(vm.productById.in_stock);
            vm.formInRecommended = JSON.parse(vm.productById.in_recommended);
            vm.formParentCategory = vm.categoryTreeChildCheck
            vm.formFilters = vm.productFilters;
            vm.formMetaTitle = vm.productById.meta_title;
            vm.formTextDescription = vm.productById.description;
            vm.formMetaDescription = vm.productById.meta_description;
            vm.formMetaKeywords = vm.productById.meta_keywords;
            vm.formSeoText = vm.productById.seo_text;
            vm.productById.image !== null ?
                vm.formNewsImgTempUrl = _.map(function (val) {
                    return ImgConfig.url + val.replace(' ', '%20')
                }) :
                vm.formNewsImgTempUrl = null
        }
        function editItem() {
            var fd = new FormData();
            fd.append("token", vm.token);
            fd.append("id", vm.editObj);
            fd.append("name", vm.formName);
            fd.append("price", vm.formPrice);
            fd.append("price_old", vm.formPriceOld);
            fd.append("price_opt", vm.formPriceOpt);
            fd.append("count", vm.formCount);
            fd.append("discount", vm.formDiscount);
            fd.append("in_stock", vm.formInStock);
            fd.append("in_recommended", vm.formInRecommended);
            fd.append("category_id", vm.formParentCategory.id);
            fd.append("filters", JSON.stringify(vm.formFilters));
            fd.append("meta_title", vm.formMetaTitle);
            fd.append("meta_description", vm.formMetaDescription);
            fd.append("meta_keywords", vm.formMetaKeywords);
            fd.append("seo_text", vm.formSeoText);

            if (vm.formImg) {
                for (var i = 0; i < vm.formImg.length; i++) {
                    vm.formImg[i] ? fd.append('image[' + i + ']', vm.formImg[i]) : void (0);
                }
            } else {
                fd.append('image', '');
            }


            ProductFactory.editItem(fd).then(function (res) {
                if (res.body !== null) {
                    $state.go("main.catalog.product");
                    toastr.info('Измененно')
                }
            });
        }
        function goBack() {
            $state.go("main.catalog.product")
        }
    }

})();
