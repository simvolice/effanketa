/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('AdminCtrl', function ($scope, $cookies, $http, $mdToast, GetAllUsers, GetAllRoles, GetAllCoutrys, Register, UpdRegister, DelUser, RecoverUser) {

    $scope.data = [];

    GetAllUsers.get({}, function(entry) {



        $scope.data=entry.resultFromDb;
    });






    $scope.saveBtn = function (data) {



        if (data.id === 0) {



            Register.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {


                    $scope.data[$scope.data.length - 1]._id = result.resultFromDb._id;
                    $scope.data[$scope.data.length - 1].id = result.resultFromDb.id;

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


        } else {



            UpdRegister.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {



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




        }








    };





    $scope.delete = function (id, index) {



            if (id === undefined){

                $scope.data.pop();


            }else {

                DelUser.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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


            }
    };






    $scope.recoverpass = function (id) {
        if (id !== undefined){


            RecoverUser.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



                if (result.code === 0) {





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


        }
    };



    $scope.addBtn = function () {

       let tempObj = {



            id: 0,
            email : "",
            role : "",
            fio : "",

            createAt : new Date(),
            country: ""



        };

        GetAllCoutrys.get({}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;


        });

        GetAllRoles.get({}, function(entry) {



            tempObj.allRoles = entry.resultFromDb;




        });








      $scope.data.push(tempObj);


    };














});