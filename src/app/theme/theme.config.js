/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .config(config);

  /** @ngInject */
  function config($urlRouterProvider,$provide) {

      // $urlRouterProvider.deferIntercept();
      $urlRouterProvider.otherwise(function ($injector) {
          var $state = $injector.get("$state");
          $state.go('authorization');
      });

    $provide.decorator('$uiViewScroll', uiViewScrollDecorator);

  }

  /** @ngInject */
  function uiViewScrollDecorator($delegate, $anchorScroll, baUtil) {
    return function (uiViewElement) {
      if (baUtil.hasAttr(uiViewElement, "autoscroll-body-top")) {
        $anchorScroll();
      } else {
        $delegate(uiViewElement);
      }
    };
  }
})();
