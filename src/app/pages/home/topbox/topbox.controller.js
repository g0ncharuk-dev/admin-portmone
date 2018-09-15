(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('TopboxPageCtrl', TopboxPageCtrl);

    /** @ngInject */
    function TopboxPageCtrl($scope, $filter, $state, toastr, baProgressModal, TopboxFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;

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

        baProgressModal.open();
        TopboxFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.topBoxText = res.html_content;
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        function updateList() {
            TopboxFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.topBoxText = res.html_content;
                    baProgressModal.close();
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')
    
            });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("html_content", vm.topBoxText);

            baProgressModal.open();
            TopboxFactory.editItem(fd).then(function (res) {
                if (res) {
                    baProgressModal.close();
                    toastr.info('Изменено')
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')
    
            });
        }
    }
})();
