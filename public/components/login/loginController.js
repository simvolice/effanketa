/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state, $rootScope) {




    if(localStorage.getItem('tokenCSRF') === null){

        GetToken.get(function (result) {




            localStorage.setItem("tokenCSRF", result.tokenCSRF);



        });


    } else if(localStorage.getItem('sessionToken') !== null){

        $state.go("main");

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








            localStorage.setItem("menuItems", result.menuItems);
            localStorage.setItem("sessionToken", result.sessionToken);
            localStorage.setItem("fio", result.fio);
            $rootScope.fio = localStorage.getItem('fio');

            $state.go("main");


        }


      });




  };

});

