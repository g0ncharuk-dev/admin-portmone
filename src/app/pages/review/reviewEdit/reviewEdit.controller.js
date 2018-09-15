/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.review')
        .controller('ReviewEditCtrl', ReviewEditCtrl);

    /** @ngInject */
    function ReviewEditCtrl($scope, $filter, $state, toastr, ReviewFactory, dataService) {
        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        vm.editObj = dataService.editID;
        vm.editObj === null ? $state.go("main.review") : vm.fillForm();

        function fillForm() {
            vm.formName = vm.editObj.name;
            vm.formEmail = vm.editObj.email;
            vm.formPhone = vm.editObj.phone;
            vm.formText = vm.editObj.message;
            vm.formState = vm.editObj.state === "allowed";

            vm.formAnsName = vm.editObj.answer.name;
            vm.formDate = new Date(vm.editObj.date);
            vm.formAnsText = vm.editObj.answer.message;
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("id", vm.editObj.id);
            fd.append("state", vm.formState?"allowed":"canceled");
            fd.append("answer", vm.formName);
            fd.append("news_date", moment(vm.formDate).format('YYYY-MM-DD hh:mm'));
            ReviewFactory.editItem(fd).then(function (res) {
                if (res.status === 'success') {
                    $state.go("main.news");
                    toastr.info('Новость изменена', {
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

        function goBack() {
            $state.go("main.review")
        }

    }

})();
