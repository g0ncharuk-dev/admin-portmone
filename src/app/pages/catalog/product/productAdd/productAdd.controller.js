/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('ProductAddCtrl', ProductAddCtrl);


    /** @ngInject */
    function ProductAddCtrl($scope, $filter, $state, toastr, ProductFactory, dataService) {
        var vm = this;

        vm.createItem = createItem;
        vm.goBack = goBack;

        vm.canAdd = dataService.canAdd;
        vm.canAdd === null ? $state.go("main.catalog.product") : void(0);
        vm.token = localStorage.getItem('token');
        vm.editorOptions = {
            heightMin: 100,
            heightMax: 400,
            charCounterMax: 250,
            toolbarButtons : [
                "paragraphFormat","|",
                "bold", "italic", "underline", "color","|",
                'insertLink',"|",
                "align", "formatOL", "formatUL" ,"|"
                ,'subscript', 'superscript'
            ]
        };

        ProductFactory.getCategory(vm.token).then(function (res) {
            if (res) {
                vm.categoryTreeCild = _.map(res , function (val) {
                    return val
                });
            }
        });

        function createItem() {
            var fd = new FormData();
            fd.append("token", vm.token);
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
            fd.append("description", vm.formTextDescription);
            fd.append("meta_title", vm.formMetaTitle);
            fd.append("meta_description", vm.formMetaDescription);
            fd.append("meta_keywords", vm.formMetaKeywords);
            fd.append("seo_text", vm.formSeoText);
            for (var i = 0; i < vm.formImg.length; i++) {
                fd.append('image['+i+']', vm.formImg[i]);
            }

            ProductFactory.createItem(fd).then(function (res) {
                if (res.data !== null) {
                    $state.go("main.catalog.product");
                    toastr.success('Созданно')
                }
            });
        }

        function goBack() {
            $state.go("main.catalog.product")
        }
    }

})();
