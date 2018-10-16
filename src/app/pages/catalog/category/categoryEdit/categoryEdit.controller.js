/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('CategoryEditCtrl', CategoryEditCtrl);

    /** @ngInject */
    function CategoryEditCtrl($scope, $filter, $state, toastr, baProgressModal, CategoryFactory,FiltersFactory, dataService, ImgConfig) {
        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;
        baProgressModal.open();

        vm.formFilterSelected = {};
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
        vm.editObj === null ? $state.go("main.catalog.category") : vm.fillForm();

        CategoryFactory.getTree(vm.token).then(function (res) {
            if (res) {
                vm.categoryTree = res;
                baProgressModal.close();
                vm.treeIgnoreId = vm.editObj ? vm.editObj.id : ''; 
            }
        });

        FiltersFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.filterItem = _.map(res, function (item) {
                    return {id: item.id, name:item.name}
                });
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        function fillForm() {
            vm.formName = vm.editObj.name;
            vm.formParentCategory = vm.editObj.parent;
            vm.filterItemSelected = vm.editObj.filter_all;
            vm.filterItemCheck = vm.editObj.filters_check;
            vm.formMetaTitle = vm.editObj.meta_title;
            vm.formMetaDescription = vm.editObj.meta_description;
            vm.formMetaKeywords = vm.editObj.meta_keywords;
            vm.formSeoText = vm.editObj.seo_text;
            vm.editObj.photo_url !== null ?
                vm.formImgTempUrl = ImgConfig.slider + vm.editObj.photo_url
                : vm.formImgTempUrl = null;
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("id", vm.editObj.id);
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
            vm.formImg ? fd.append("photo_url", vm.formImg[0]) : null;

            baProgressModal.open();
            CategoryFactory.editItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.catalog.category");
                    baProgressModal.close();
                    toastr.info('Измененно')
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
