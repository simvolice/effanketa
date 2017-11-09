/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('GrmCtrl', function ($scope, $window, GetAllGrm, GetAllStatus, $mdToast, $mdDialog, UpdateGrm, GetAllCategGRM, GetAllCanalRequest, DeleteGrm, GetAllCoutrys, AddGrm) {



    $scope.data = [];

    GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {


            for (let itemResultFromDB of result.resultFromDb) {
                itemResultFromDB.dateInGo = new Date(itemResultFromDB.dateInGo);
                itemResultFromDB.lastDateAnswer = new Date(itemResultFromDB.lastDateAnswer);
                itemResultFromDB.dateNotifDeclarer = new Date(itemResultFromDB.dateNotifDeclarer);
            }



            $scope.data = result.resultFromDb;




        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });


    $scope.addBtn = function () {

        let tempObj = {



            id: 0,
            country: "",
            canalRequest: "",
            categComplaint: "",
            statusId: "",



            dateInGo: "",
            declarerFIO: "",
            raisedQuestion: "",
            responsibleConsideration: "",
            takeAction: "",
            lastDateAnswer: "",
            dateNotifDeclarer: "",
            timeToCheckComplaint: ""



        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });


        GetAllStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allStatus = entry.resultFromDb;
            tempObj.statusId = entry.resultFromDb[0]._id;


        });



        GetAllCanalRequest.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCanalRequestStatus = entry.resultFromDb;
            tempObj.canalRequest = entry.resultFromDb[0]._id;


        });



        GetAllCategGRM.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCategComplaint = entry.resultFromDb;
            tempObj.categComplaint = entry.resultFromDb[0]._id;


        });










        $scope.data.push(tempObj);


    };



    $scope.saveBtn = function (data) {



        if (data.id === 0) {



            AddGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



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



            UpdateGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



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

            DeleteGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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




    $scope.excel = function () {



        $scope.tableID = "grm";
        $scope.titleSheet = "Механизм рассмотрения жалоб и отзывов";

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet, '_blank');




    };








});

