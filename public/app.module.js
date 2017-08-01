/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', "fixed.table.header", 'ui.router', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies', 'ngSanitize' ]).config(function($mdDateLocaleProvider) {



  $mdDateLocaleProvider.months = ['Январь', 'Февраль', 'Март', "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  $mdDateLocaleProvider.shortMonths = ['Янв', 'Фев', 'Мрт', "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Нбр", "Дек"];
  $mdDateLocaleProvider.days = ['Понедельник', 'Вторник', 'Среда', "Четверг", "Пятница", "Суббота", "Воскресенье"];
  $mdDateLocaleProvider.shortDays = ['Пн', 'Вт', 'Ср', "Чт", "Пт", "Сб", "Вс"];

  // Can change week display to start on Monday.
  $mdDateLocaleProvider.firstDayOfWeek = 0;





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


app.controller('MainCtrl', function ($state, $cookies) {


  this.exitClk = function () {
    $cookies.remove('sessionToken');
    $cookies.remove('tokenCSRF');
    $state.go('login');
  };






});


