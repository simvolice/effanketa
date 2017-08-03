/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MainAppCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state, $rootScope, $timeout) {





    if(localStorage.getItem('sessionToken') === null){





        this.err = "<h5 class='text-center'>Вы не авторизованы, пройдите пожалуйста на страницу <a href='/?#!/login'>входа</a></h5>";

    }





       this.myHTML = localStorage.getItem('menuItems');

    $rootScope.fio = localStorage.getItem('fio');



    $timeout(function () {
           $('.collapsible').collapsible();
       }, 500);




});

