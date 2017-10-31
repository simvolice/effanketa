/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomePageCtrl', function ($scope, $cookies, $sce, SendAuth, GetMainPage, $mdToast, $state, $rootScope) {

    GetMainPage.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


        if (result.code === 0) {


            $rootScope.myHTML = result.resultFromDb;


        } else {

            localStorage.removeItem('sessionToken');
            localStorage.removeItem('fio');

            $rootScope.err = "Вы не авторизованы, для повторной авторизации, нажмите на эту ";


        }



    });


    $rootScope.deliberatelyTrustDangerousSnippet = function() {
        return $sce.trustAsHtml($rootScope.myHTML);
    };


});

