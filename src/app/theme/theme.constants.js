/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';

    var IMAGES_ROOT = 'assets/img/';

    angular.module('BlurAdmin.theme')
        .constant('moment', moment)
        .constant('_', window._)
        .constant('ImgConfig', (function () {
            var IMAGES_ROOT = 'https://postmetro.net/public/photo/';
            return {
                slider: IMAGES_ROOT + 'slider/',
                products: IMAGES_ROOT + 'products/'
            }
        })())
        .constant('Config', (function () {
            var API_DOMAIN = 'http://postmetro.net/api/';
            return {
                login: API_DOMAIN + 'auth',

                //filter
                getFilterList: API_DOMAIN + 'filter/list',
                createFilter: API_DOMAIN + 'filter/store',
                updateFilter: API_DOMAIN + 'filter/update',
                deleteFilter: API_DOMAIN + 'filter/delete',

                //category
                getCategoryList: API_DOMAIN + 'category/list',
                getCategoryTree: API_DOMAIN + 'category/three',
                createCategory: API_DOMAIN + 'category/store',
                updateCategory: API_DOMAIN + 'category/update',
                deleteCategory: API_DOMAIN + 'category/delete',

                //product
                getProductList: API_DOMAIN + 'product/list',
                getProductById: API_DOMAIN + 'product/',
                getProductCategory: API_DOMAIN + 'product/category',
                updateProduct: API_DOMAIN + 'product/update',
                updateProductList: API_DOMAIN + 'product/list/update',
                creteProduct: API_DOMAIN + 'product/store',
                deleteProduct: API_DOMAIN + 'product/delete',

                //contact
                getTopBox: API_DOMAIN + 'topbox/read',
                updateTopBox: API_DOMAIN + 'topbox/update',

                //slider
                getSliderList: API_DOMAIN + 'slider/list',
                createSlider: API_DOMAIN + 'slider/store',
                updateSlider: API_DOMAIN + 'slider/update',
                deleteSlider: API_DOMAIN + 'slider/delete',

                //showcase
                getShowcase: API_DOMAIN + 'showcase/read',
                updateShowcase: API_DOMAIN + 'showcase/update',

                //seo
                getSeo: API_DOMAIN + 'seo/read',
                updateSeo: API_DOMAIN + 'seo/update',

                //contact
                getContact: API_DOMAIN + 'contact/read',
                updateContact: API_DOMAIN + 'contact/update',

                //news
                getNewsList: API_DOMAIN + 'news/read',
                updateNews: API_DOMAIN + 'news/update',
                //review
                getReviewList: API_DOMAIN + 'review/list',
                updateReview: API_DOMAIN + 'review/update',
                deleteReview: API_DOMAIN + 'review/delete',

                //review
                getOrderList: API_DOMAIN + 'order/list',
                updateOrder: API_DOMAIN + 'order/update',
                deleteOrder: API_DOMAIN + 'order/delete',

                //parameter
                getParameter: API_DOMAIN + 'parameters/list',
                updateParameter: API_DOMAIN + 'parameters/update',

                //banner
                getBanner: API_DOMAIN + 'banner/list',
                updateBanner: API_DOMAIN + 'banner/update'
            }
        })())
        .constant('layoutSizes', {
            resWidthCollapseSidebar: 1200,
            resWidthHideSidebar: 500
        })
        .constant('layoutPaths', {
            images: {
                root: IMAGES_ROOT,
                profile: IMAGES_ROOT + 'app/profile/',
                amMap: 'assets/img/theme/vendor/ammap//dist/ammap/images/',
                amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
            }
        })
        .constant('colorHelper', {
            tint: function (color, weight) {
                return mix('#ffffff', color, weight);
            },
            shade: function (color, weight) {
                return mix('#000000', color, weight);
            },
        });

    function shade(color, weight) {
        return mix('#000000', color, weight);
    }

    function tint(color, weight) {
        return mix('#ffffff', color, weight);
    }

    function mix(color1, color2, weight) {
        // convert a decimal value to hex
        function d2h(d) {
            return d.toString(16);
        }

        // convert a hex value to decimal
        function h2d(h) {
            return parseInt(h, 16);
        }

        var result = "#";
        for (var i = 1; i < 7; i += 2) {
            var color1Part = h2d(color1.substr(i, 2));
            var color2Part = h2d(color2.substr(i, 2));
            var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
            result += ('0' + resultPart).slice(-2);
        }
        return result;
    }
})();
