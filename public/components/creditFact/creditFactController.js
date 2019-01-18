/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('CreditFactCtrl', function ($scope, $rootScope, $http, $mdToast, GetAllUsers, GetAllRoles, GetAllCoutrys, Register, UpdRegister, DelUser, GetCreditsFact, DelCreditsFact) {




    GetCreditsFact.get(function (result) {
        $scope.data = result.resultFromDb;

    });







    $scope.delete = function (id, index) {




        DelCreditsFact.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



                    if (result.code === 0) {



                        $scope.data.splice(index, 1);

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Операция закончилась УСПЕШНО.')
                                .position('bottom left')
                                .hideDelay(3000)
                        );


                    } else {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                                .position('bottom left')
                                .hideDelay(6000)
                        );


                    }




                });



};





});