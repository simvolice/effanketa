/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MainAppCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state, $rootScope) {





    var commonInfo = JSON.parse(localStorage.getItem('commonInfo'));

       this.myHTML = commonInfo.menuItems;

    $rootScope.fio = commonInfo.fio;



       setTimeout(function () {
           $('.collapsible').collapsible();
       }, 500);





});

