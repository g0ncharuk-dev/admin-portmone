/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('CategoryAddCtrl', CategoryAddCtrl);

    /** @ngInject */
    function CategoryAddCtrl($scope, $state, $timeout, toastr, baProgressModal, CategoryFactory, FiltersFactory, dataService) {
        var vm = this;

        vm.createItem = createItem;
        vm.goBack = goBack;

        vm.canAdd = dataService.canAdd;
        vm.canAdd === null ? $state.go("main.catalog.category") : void(0);
        vm.token = localStorage.getItem('token');
        baProgressModal.open();
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

        //temp
        vm.categoryTree = [
            {
                "id": 1,
                "level": 0,
                "name": "Не выбрано",
                "children": [
                    {
                        "id": 2,
                        "level": 1,
                        "name": "Категории",
                        "children": [
                            {
                                "id": 3,
                                "level": 2,
                                "name": "Мужские",
                            },
                            {
                                "id": 4,
                                "level": 2,
                                "name": "Женские",
                            }
                        ]
                    }
                ]
            }
        ];
        vm.filterItem = [
            {id: 1, name: 'Размер'},
            {id: 2, name: 'Материал'},
            {id: 3, name: 'Цвет'},
            {id: 4, name: 'Тип застежки'},
            {id: 5, name: 'Ориентация'}
        ];
        //temp


        CategoryFactory.getTree(vm.token).then(function (res) {
            if (res) {
                vm.categoryTree = res;
                vm.formParentCategory = vm.categoryTree[0];
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        FiltersFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.filterItem = res;
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        function createItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("name", vm.formName);
            fd.append("level", vm.formParentCategory.level);
            fd.append("father_id", vm.formParentCategory.id);
            for (var i = 0; i < vm.filterItemSelected.length; i++) {
                fd.append('filter_all[' + i + ']', vm.filterItemSelected[i].id);
            }
            for (var i = 0; i < vm.filterItemCheck.length; i++) {
                fd.append('filters_check[' + i + ']', vm.filterItemCheck[i].id);
            }
            fd.append("meta_title", vm.formMetaTitle);
            vm.formMetaDescription ? fd.append("meta_description", vm.formMetaDescription) : null;
            vm.formMetaKeywords ? fd.append("meta_keywords", vm.formMetaKeywords) : null;
            vm.formSeoText ? fd.append("seo_text", vm.formSeoText) : null;
            fd.append("photo_url", vm.formImg[0]);

            baProgressModal.open();
            CategoryFactory.createItem(fd).then(
                function (res) {
                    if (res) {
                        $state.go("main.catalog.category");
                        baProgressModal.close();
                        toastr.success('Созданно')
                    }
                }, function () {
                    baProgressModal.close();
                    toastr.error('Неудачно!')

                });


        }

        function goBack() {
            $state.go("main.catalog.category")
        }
    }

})();
