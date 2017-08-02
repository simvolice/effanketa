/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', "fixed.table.header", 'ui.router', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies', 'ngSanitize', 'pascalprecht.translate' ]);






app.config(function ($locationProvider, $translateProvider) {


    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('ru');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

});





app.directive('ngFiles', ['$parse', function ($parse) {

  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };

  return {
    link: fn_link
  }
} ]);


app.controller('MainCtrl', function ($state, $cookies, $translate) {


  this.exitClk = function () {
    $cookies.remove('sessionToken');
    $cookies.remove('tokenCSRF');
    $cookies.remove('menuItems');
    $state.go('login');
  };


    this.changeLanguage = function (langKey) {
        $translate.use(langKey);
        setTimeout(function () {
            $('.collapsible').collapsible();
        }, 500);
    };





});


