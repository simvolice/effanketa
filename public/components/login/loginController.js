/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, $cookies, GetToken, SendAuth, GetMainPage, $mdToast, $state, $rootScope) {

    $rootScope.err = false;

    GetToken.get(function (result) {


        localStorage.setItem("tokenCSRF", result.tokenCSRF);


    });



    if (localStorage.getItem('tokenCSRF') === null) {

        GetToken.get(function (result) {


            localStorage.setItem("tokenCSRF", result.tokenCSRF);


        });


    } else if (localStorage.getItem('sessionToken') !== null) {

        GetMainPage.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


            if (result.code === 0) {


                $state.go("main");



            } else {


                localStorage.removeItem('sessionToken');
                localStorage.removeItem('fio');
                $rootScope.fio = false;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Не удается войти.\n' +
                            'Пожалуйста, проверьте правильность написания email и пароля.')
                        .position('bottom left')
                        .hideDelay(3000)
                );



            }



        });



    }










  this.loginClk = function () {




      SendAuth.save({tokenCSRF: localStorage.getItem('tokenCSRF'), email: this.email, pass: this.pass}, function (result) {

        if (result.code === 1) {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Не удается войти.\n' +
                        'Пожалуйста, проверьте правильность написания email и пароля.')
                    .position('bottom left')
                    .hideDelay(3000)
            );


        } else {









            localStorage.setItem("sessionToken", result.sessionToken);
            localStorage.setItem("fio", result.fio);
            $rootScope.fio = localStorage.getItem('fio');

            $state.go("main");


        }


      });




  };

});

