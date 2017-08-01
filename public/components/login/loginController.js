/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state) {


    var dateForCookies = new Date();
    dateForCookies.setDate(dateForCookies.getDate() + 365);

    if ($cookies.get("sessionToken")) {

        $state.go('main');

    }



   GetToken.get(function (result) {



     $cookies.put("tokenCSRF", result.tokenCSRF, {expires: dateForCookies});




    });








  this.loginClk = function () {


      SendAuth.save({tokenCSRF: $cookies.get('tokenCSRF'), login: this.login, pass: this.pass}, function (result) {

        if (result.code === 1) {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Не удается войти.\n' +
                        'Пожалуйста, проверьте правильность написания логина и пароля.')
                    .position('bottom left')
                    .hideDelay(3000)
            );


        } else {




            $cookies.put("sessionToken", result.sessionToken, {expires: dateForCookies});

            $state.go('main');




        }


      });




  };

});

