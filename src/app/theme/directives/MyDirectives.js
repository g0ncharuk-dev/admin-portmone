/**
 * Animated load block
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .directive('fadeIn', fadeIn)
        .directive('stRatio', stRatio)
        .directive('myFile', myFile)
        .directive('bindUnsafeHtml', bindUnsafeHtml)
        .directive('ngThumb', ngThumb)
        .directive('ngThumbPreview', ngThumbPreview);

    /** @ngInject */
    function fadeIn($timeout, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, elem) {
                var delay = 1000;

                if ($rootScope.$pageFinishedLoading) {
                    delay = 100;
                }

                $timeout(function () {
                    elem.removeClass('full-invisible');
                    elem.addClass('animated fadeIn');
                }, delay);
            }
        };
    }

    function stRatio() {
        return {
            link: function (scope, element, attr) {
                var ratio = +(attr.stRatio);

                element.css('width', ratio + '%');

            }
        };
    }

    function myFile() {
        return {
            // scope: {
            //     myFileView: '='
            // },
            link: function (scope, elem, attrs) {
                // var canvas_temp;
                //
                // function onLoadFile_temp() {
                //     elem.parent().parent().parent().find('canvas').remove();
                //     canvas_temp = angular.element(document.createElement('canvas'));
                //     elem.parent().parent().parent().find('#from-formImg').append(canvas_temp);
                //     var img = new Image();
                //     img.src = scope.myFileView;
                //     img.onload = onLoadImage_temp;
                // }
                //
                // function onLoadImage_temp() {
                //     var width = 220;
                //     var height = 220;
                //     canvas_temp.attr({width: width, height: height});
                //     canvas_temp[0].getContext('2d').drawImage(this, 0, 0, width, height);
                // }
                //
                // if (scope.myFileView) {
                //     onLoadFile_temp();
                // }
                elem.on("change", function (e) {
                    scope.$eval(attrs.myFile + "=$files", {$files: e.target.files});
                    scope.$apply();

                    // if (!helper.support) return;
                    // var params = scope.$parent.$eval(attrs.myFile);
                    //
                    // if (!helper.isFile(params[0])) return;
                    // if (!helper.isImage(params[0])) return;
                    //
                    // var canvas;
                    // var reader = new FileReader();
                    //     reader.onload = onLoadFile;
                    //     reader.readAsDataURL(params);
                    //
                    // function onLoadFile(event) {
                    //     elem.parent().parent().parent().find('canvas').remove();
                    //     canvas = angular.element(document.createElement('canvas'));
                    //     elem.parent().parent().parent().find('#from-formImg').append(canvas);
                    //     var img = new Image();
                    //     img.src = event.target.result;
                    //     img.onload = onLoadImage;
                    // }
                    //
                    // function onLoadImage() {
                    //     var width = 220;
                    //     var height = 220;
                    //     canvas.attr({width: width, height: height});
                    //     canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    // }
                })
            }
        }
    }

    function ngThumb($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }

    function ngThumbPreview() {
        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {

                var params = scope.$eval(attributes.ngThumbPreview);
                var canvas = element.find('canvas');

                function onLoadFile() {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = params.file;

                    console.log( params)
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }

                if (params.file) onLoadFile()
            }
        };
    }

    function bindUnsafeHtml($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'bindUnsafeHtml' expression for changes
                    return scope.$eval(attrs.bindUnsafeHtml);
                },
                function (value) {
                    // when the 'bindUnsafeHtml' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }
})();