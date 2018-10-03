(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('NewsPageCtrl', NewsPageCtrl);

    /** @ngInject */
    function NewsPageCtrl($scope, $filter, $state, toastr, NewsFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        //temp
        vm.newsList = [{
            "id": "0",
            "title": "Information Portmonetka.com",
            "text": "Данный файл содержит техническую информацию проекта Portmonetka.com, данные для работы с API",
            "link": "http://example"
        }, {
            "id": "1",
            "title": "Information Portmonetka.com",
            "text": "Данный файл содержит техническую информацию проекта Portmonetka.com, данные для работы с API",
            "link": "http://example"
        }, {
            "id": "2",
            "title": "Information Portmonetka.com",
            "text": "Данный файл содержит техническую информацию проекта Portmonetka.com, данные для работы с API",
            "link": "http://example"
        }];

        vm.fillForm();

        //temp

        function fillForm() {
            vm.formTitle1 = vm.newsList[0].title;
            vm.formTitle2 = vm.newsList[1].title;
            vm.formTitle3 = vm.newsList[2].title;

            vm.formText1 = vm.newsList[0].text;
            vm.formText2 = vm.newsList[1].text;
            vm.formText3 = vm.newsList[2].text;

            vm.formLink1 = vm.newsList[0].link;
            vm.formLink2 = vm.newsList[1].link;
            vm.formLink3 = vm.newsList[2].link;

        }

        NewsFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.newsList = res;
                vm.fillForm();
            }
        }, function () {
            toastr.error('Неудача!');
            baProgressModal.close();
        });

        function updateList() {
            NewsFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.newsList = res;
                    vm.fillForm();
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }

        function editItem(id) {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("id", id);
            fd.append("title", id === 0 ? vm.formTitle1 : id === 1 ? vm.formTitle2 : vm.formTitle3);
            fd.append("text", id === 0 ? vm.formText1 : id === 1 ? vm.formText2 : vm.formText3);
            fd.append("link", id === 0 ? vm.formLink1 : id === 1 ? vm.formLink2 : vm.formLink3);


            NewsFactory.editItem(fd).then(function (res) {
                if (res) {
                    toastr.info('Изменено')
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }
    }
})();
