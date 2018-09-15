/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('ProductEditCtrl', ProductEditCtrl);

    /** @ngInject */
    function ProductEditCtrl($scope, $filter, $state, ProductFactory,toastr, dataService, ImgConfig) {

        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

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
        vm.editObj = dataService.editID;
        console.log(vm.editObj)
        //temp
        vm.categoryTreeCild = [
            {
                "id": 3,
                "level": 2,
                "name": "Мужские",
                "filters": [
                    {id: 1, name: 'Размер', "val": "size"},
                    {id: 2, name: 'Материал', "val": "material"},
                    {id: 3, name: 'Цвет', "val": "color"},
                    {id: 4, name: 'Тип застежки', "val": "type_lock"}

                ]
            }, {
                "id": 4,
                "level": 2,
                "name": "Женские",
                "filters": [
                    {id: 1, name: 'Размер', "val": "size"},
                    {id: 5, name: 'Ориентация', "val": "orientation"}
                ]
            }
        ];
        vm.productById = {
            "id": "0",
            "name": "vname",
            "price": "123",
            "price_old": "123",
            "price_opt": "123",
            "count": "123",
            "discount": "12",
            "in_stock": "true",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "Debitis nihil nostrum quasi voluptatibus voluptatum. Ab atque aut cupiditate impedit ipsa, iste itaque, modi numquam odit placeat quae quibusdam tenetur voluptates.\n",
            "in_recommended": "false",
            "category_id": 4,
            "filters":
                {"size":"большой","orientation":"горизонтальная"},
            "meta_title": "meta_title",
            "meta_description": "meta_description",
            "meta_keywords": "meta_keywords",
            "seo_text": "seo_text",
            "image": []
        };
        //temp

        ProductFactory.getCategory(vm.token).then(function (res) {
            if (res){
                vm.categoryTreeCild = _.map(res , function (val) {
                    return val
                });
            }
        });

        ProductFactory.getItemById(vm.token,vm.editObj).then(function (res) {
            if (res){
                console.log( res.product)
                vm.productById = res.product; vm.fillForm();
            }
        });

        vm.editObj === null ? $state.go("main.catalog.product") : vm.fillForm();

        function fillForm() {
            vm.formName = vm.productById.name;
            vm.formPrice = Number(vm.productById.price);
            vm.formPriceOld = Number(vm.productById.price_old);
            vm.formPriceOpt = Number(vm.productById.price_opt);
            vm.formCount = Number( vm.productById.count);
            vm.formDiscount = Number(vm.productById.discount);
            vm.formInStock = JSON.parse(vm.productById.in_stock);
            vm.formInRecommended = JSON.parse(vm.productById.in_recommended);
            for (var i = 0; i < vm.categoryTreeCild.length; i++){
                if(vm.categoryTreeCild[i].id === vm.productById.category_id){
                    vm.formParentCategory =  vm.categoryTreeCild[i]
                }
            }
            vm.formFilters =vm.productById.filters;
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
            
            if(vm.formImg) {
                for (var i = 0; i < vm.formImg.length; i++) {
                    vm.formImg[i] ? fd.append('image[' + i + ']', vm.formImg[i]) : void(0);
                }
            } else {
                fd.append('image','');
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
