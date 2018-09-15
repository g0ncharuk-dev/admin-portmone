(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('SeoPageCtrl', SeoPageCtrl);

    /** @ngInject */
    function SeoPageCtrl($scope, $filter, $state, toastr, SeoFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        vm.editorOptions = {
            height:300,
            charCounterMax: 2500,
            toolbarButtons : [
                "paragraphFormat","|",
                "bold", "italic", "underline", "color","|",
                'insertLink',"|",
                "align", "formatOL", "formatUL" ,"|"
                ,'subscript', 'superscript'
            ]
        };
        //temp
        vm.itemList = {meta_title: "temp", meta_description: "temp", meta_keywords: "temp", seo_text: "temp"};
        vm.fillForm();

        //temp

        function fillForm() {
            vm.formMetaTitle = vm.itemList.meta_title;
            vm.formMetaDescription = vm.itemList.meta_description;
            vm.formMetaKeywords = vm.itemList.meta_keywords;
            vm.formSeoText = vm.itemList.seo_text;
        }

        SeoFactory.getItem(vm.token).then(function (res) {
            if (res.status === 'success') {
                vm.itemList = res.data;
                vm.fillForm();
            }
        });

        function updateList() {
            SeoFactory.getItem(vm.token).then(function (res) {
                if (res.status === 'success') {
                    vm.itemList = res.data;
                    vm.fillForm();
                }
            });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("meta_title", vm.formMetaTitle);
            fd.append("meta_description", vm.formMetaDescription);
            fd.append("meta_keywords", vm.formMetaKeywords);
            fd.append("seo_text", vm.formSeoText);


            SeoFactory.editItem(fd).then(function (res) {
                if (res.status === 'success') {
                    $state.go("main.catalog.category");
                    toastr.info('Изменено', {
                        "autoDismiss": false,
                        "positionClass": "toast-bottom-right",
                        "type": "info",
                        "timeOut": "3000",
                        "extendedTimeOut": "1000",
                        "allowHtml": false,
                        "closeButton": false,
                        "tapToDismiss": true,
                        "progressBar": false,
                        "newestOnTop": true,
                        "maxOpened": 0,
                        "preventDuplicates": false,
                        "preventOpenDuplicates": false
                    })
                }
            });
        }
    }
})();
