/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state) {





   GetToken.get(function (result) {




       localStorage.setItem("commonInfo", JSON.stringify({"tokenCSRF": result.tokenCSRF}));




    });








  this.loginClk = function () {


      var commonInfo = JSON.parse(localStorage.getItem('commonInfo'));

      SendAuth.save({tokenCSRF: commonInfo.tokenCSRF, email: this.email, pass: this.pass}, function (result) {

        if (result.code === 1) {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Не удается войти.\n' +
                        'Пожалуйста, проверьте правильность написания email и пароля.')
                    .position('bottom left')
                    .hideDelay(3000)
            );


        } else {





            commonInfo.sessionToken = result.sessionToken;
            commonInfo.menuItems = result.menuItems;
            commonInfo.fio = result.fio;




            localStorage.setItem("commonInfo", JSON.stringify(commonInfo));


            $state.go("main");


        }


      });




  };

});

