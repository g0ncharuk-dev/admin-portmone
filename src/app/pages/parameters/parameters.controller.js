(function () {
    'use strict';

    angular.module('BlurAdmin.pages.parameters')
        .controller('ParametersPageCtrl', ParametersPageCtrl);


    /** @ngInject */
    function ParametersPageCtrl($scope, $filter, $state, toastr,
                            ParametersFactory, dataService) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        //temp
        vm.itemList = {course: "25.7"};
        vm.fillForm();
        //temp

        function fillForm() {
            vm.formCourse = vm.itemList.course;
        }

        ParametersFactory.getItem(vm.token).then(function (res) {
            if (res.status === 'success') {
                vm.itemList = res.data;
                vm.fillForm();
            }
        });

        function updateList() {
            ParametersFactory.getItem(vm.token).then(function (res) {
                if (res.status === 'success') {
                    vm.itemList = res.data;
                    vm.fillForm();
                }
            });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("course", vm.formCourse);

            ParametersFactory.editItem(fd).then(function (res) {
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
