/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MainAppCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state) {



       this.myHTML = $cookies.get("menuItems");


       setTimeout(function () {
           $('.collapsible').collapsible();
       }, 500);





});

