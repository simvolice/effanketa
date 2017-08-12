/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MainAppCtrl', function ($scope, $cookies, GetToken, GetMainPage, $mdToast, $state, $rootScope, $timeout) {







    GetMainPage.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


        if (result.code === 0) {


            $scope.myHTML = result.resultFromDb;



        } else {

            localStorage.removeItem('sessionToken');
            localStorage.removeItem('fio');

            $scope.err = "<h5 class='text-center'>Вы не авторизованы, пройдите пожалуйста на страницу <a href='/?#!/login'>входа</a></h5>";


        }



    });









    $timeout(function () {
           $('.collapsible').collapsible();
       }, 500);




});

