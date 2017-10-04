/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', "fixed.table.header", 'ui.router', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies', 'ngSanitize', 'pascalprecht.translate' ]);






app.config(function ($locationProvider, $translateProvider, $mdDateLocaleProvider) {


    $mdDateLocaleProvider.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    $mdDateLocaleProvider.shortMonths = ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нбр', 'Дек'];
    $mdDateLocaleProvider.days = ["Понедельник",
        "Вторник" ,
            "Среда" ,
            "Чеверг",
        "Пятница" ,
        "Суббота" ,
        "Воскресенье"];
    $mdDateLocaleProvider.shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    moment.locale("ru");
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        var m = moment(date);
        return m.isValid() ? m.format('L') : '';
    };







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




app.controller('MainCtrl', function ($state, $timeout, $translate, $rootScope) {






    $rootScope.fio = localStorage.getItem('fio');



    this.exitClk = function () {

        localStorage.removeItem('tokenCSRF');
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('fio');
        $rootScope.fio = false;
        $state.go('login', {}, {reload: true});
    };


    this.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $timeout(function () {
            $('.collapsible').collapsible();
        }, 500);
    };





});


