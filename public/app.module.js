/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', "fixed.table.header", 'ui.router', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies', 'ngSanitize', 'pascalprecht.translate' ]);






app.config(function ($locationProvider, $translateProvider, $mdDateLocaleProvider) {

    moment.locale("ru");
    var localeDate = moment.localeData();

     $mdDateLocaleProvider.months = localeDate.months();
     $mdDateLocaleProvider.shortMonths = localeDate.monthsShort();
     $mdDateLocaleProvider.days = localeDate.weekdays();
     $mdDateLocaleProvider.shortDays = localeDate.weekdaysMin();





     $mdDateLocaleProvider.formatDate = function(date) {
         var m = moment(date);
         return m.format('L');
     };



    $mdDateLocaleProvider.firstDayOfWeek = 1;






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


angular.module('app').factory("GetMainPage", function($resource) {
    return $resource("/getmainpage");
});

app.controller('MainCtrl', function ($scope, $state, $timeout, $translate, $rootScope, $mdSidenav, $sce, GetMainPage, $location) {



    this.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }



    $rootScope.fio = localStorage.getItem('fio');



    this.exitClk = function () {

        localStorage.removeItem('tokenCSRF');
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('fio');
        $rootScope.myHTML = null;
        $rootScope.fio = false;
        $state.go('login', {}, {reload: true});
    };


    this.changeLanguage = function (langKey) {
        $translate.use(langKey);

    };





});


