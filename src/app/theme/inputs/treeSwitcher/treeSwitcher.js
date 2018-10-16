/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.inputs')
        .directive('treeSwitcher', treeSwitcher);


    function treeSwitcher($compile) {
        var template = "<div class='select' ng-click='openTree()'><p>{{selected.name}}</p></div>";
        template += "<div class='list' ng-show='isOpen'></div>";

        return {
            restrict: 'E',
            scope: {
                data: '=',
                ignore: '=',
                selected: '='
            },

            template: template,
            controller: function ($scope, $element) {
                var ctrl = $scope;
                ctrl.isOpen = false;
                ctrl.openTree = function () {
                    ctrl.isOpen = !ctrl.isOpen;
                };
                ctrl.childClick = function (obj) {
                    setSelected(ctrl, obj);
                    ctrl.isOpen = false;
                    ctrl.$apply();
                }
            },
            link: function (scope, element, attrs, ngModel) {
                var list = angular.element(element[0].querySelector('.list'));
                scope.$watchGroup(['data', 'selected','ignore'], function (newValues, oldValues, scope) {
                    list.html('');

                    if (!scope.selected) {
                        setSelected(scope, null);
                    }

                    var options = getOptions(scope, scope.data, 0);
                    list.append($compile(options)(scope));
                });

                angular.element(document).bind('click', function (event) {
                    if (element !== event.target && !element[0].contains(event.target)) {
                        scope.$apply(function () {
                            scope.isOpen = false;
                        })
                    }
                });
            }
        };

        function getOptions(scope, data, level) {

            var optionUL = angular.element("<ul></ul>");
            

            angular.forEach(data, function (obj) {
                if(scope.ignore !== obj.id) {
                    var optionLI = angular.element("<li></li>");
                } else {
                    var optionLI = angular.element("<li ng-if='false'></li>");
                }
                
                var optionA = angular.element("<p ng-class='{selected:selected.id==" + 
                obj.id + "}' class='level-" + level + "'>" + obj.level + ". " + obj.name + "</p>");

                optionLI.append(optionA);

                // Set selected option if selected id or object exist..
                if (scope.selected == obj) {
                    setSelected(scope, obj);
                }

                optionA.bind("click", function () {
                    scope.childClick(obj);
                });

                if (obj.children) {
                    optionLI.append(getOptions(scope, obj.children, level + 1));
                }
                optionUL.append(optionLI);
            });

            return optionUL;
        }

        function setSelected(scope, obj) {
            if (obj) {
                scope.selected = obj;
            } else {
                scope.selected = null;
            }
        }
    }


})();







