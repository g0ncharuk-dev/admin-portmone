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
            vm.formState = vm.editObj.state;

            vm.formAnsName = vm.editObj.answer.name || 'Admin';
            vm.formDate = new Date(vm.editObj.date);
            vm.formAnsText = vm.editObj.answer.message;
        }

        function editItem() {
            var fd = new FormData();
            vm._answer = JSON.stringify({
                "name": vm.formAnsName,
                "date": vm.formDate,
                "message": vm.formAnsText
            });

            fd.append("remember_token", vm.token);
            fd.append("id", vm.editObj.id);
            fd.append("approved", vm.formState ? true : false);
            fd.append("answer", vm._answer);
            fd.append("answer_to_id", vm.editObj.answer_to_id);
            fd.append("date", moment(vm.formDate).format('YYYY-MM-DD hh:mm'));
            fd.append("email",vm.editObj.email);
            fd.append("message",vm.editObj.message);
            fd.append("name",vm.editObj.name);
            fd.append("phone",vm.editObj.phone);
            fd.append("state",vm.editObj.state);
            ReviewFactory.editItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.review");
                    toastr.info('Измененно')
                }
            });
        }

        function goBack() {
            $state.go("main.review")
        }

    }

})();
