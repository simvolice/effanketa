/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('PassChangeCtrl', function ($scope, $state, SendPassChange, $mdToast) {



    this.changePassSend = function () {

        SendPassChange.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionTokenChangePass'), pass: this.pass}, function(result) {


            if (result.code === 0) {

                $state.go("login");

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Ваш пароль успешно, изменен, ввойдите в систему заново.')
                        .position('bottom left')
                        .hideDelay(3000)
                );

            } else {



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Произошла ошибка, измените, ввод.')
                        .position('bottom left')
                        .hideDelay(3000)
                );



            }



        });


    };
















});

