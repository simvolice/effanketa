/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('GrmCtrl', function ($translate, $scope, $rootScope, $window, GetAllGrm, GetAllStatus, $mdToast, $mdDialog, UpdateGrm, GetAllCategGRM, GetAllCanalRequest, DeleteGrm, GetAllCoutrys, AddGrm) {



    $rootScope.data = [];
    $rootScope.dataArrUpd = [];

    GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {





            $rootScope.data = result.resultFromDb;



            $rootScope.data.sort(function(a,b){return new Date(a.dateInGo).getTime() - new Date(b.dateInGo).getTime()});


            $rootScope.dataArrUpd = {

                allCanalRequestStatus: $rootScope.data[0].allCanalRequestStatus,
                allCountrys: $rootScope.data[0].allCountrys,
                allCategComplaint: $rootScope.data[0].allCategComplaint,
                allStatus: $rootScope.data[0].allStatus,


            };

            for (const dataItem of $rootScope.data) {
                delete dataItem.allCanalRequestStatus;
                delete dataItem.allCountrys;
                delete dataItem.allCategComplaint;
                delete dataItem.allStatus;
            }

        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });




    $scope.updBtn = function (data, ev) {
        $mdDialog.show({
            controller: DialogControllerUpd,
            locals:{data: data},
            templateUrl: 'components/grm/dialog_tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };

    $scope.addBtn = function (ev) {


        $mdDialog.show({
            controller: DialogController,
            locals:{data: "testDataFromParentController"},
            templateUrl: 'components/grm/dialog_tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


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

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet + "&lang=" + $translate.use() + "&sessionToken=" + localStorage.getItem('sessionToken'), '_blank');




    };





function DialogControllerUpd($scope, data, Getalllevelcomplaint, InsertNewCanalRequest, InsertNewCategGRM) {




    $scope.data = {



        id: data._id,
        allCanalRequestStatus: $rootScope.dataArrUpd.allCanalRequestStatus,
        allCategComplaint: $rootScope.dataArrUpd.allCategComplaint,





        allCountrys: $rootScope.dataArrUpd.allCountrys,
        allStatus: $rootScope.dataArrUpd.allStatus,



        canalName: data.canalName,
        canalRequest: data.canalRequest,
        categComplaint: data.categComplaint,
        categName: data.categName,
        colorForStatus: data.colorForStatus,
        country: data.country,
        dateStartInvestegment: new Date(data.dateStartInvestegment),
        dateInGo: new Date(data.dateInGo),
        dateNotifDeclarer: new Date(data.dateNotifDeclarer),
        declarerFIO: data.declarerFIO,
        lastDateAnswer: new Date(data.lastDateAnswer),
        levelComplaint: data.levelComplaintId,
        raisedQuestion: data.raisedQuestion,
        responsibleConsideration: data.responsibleConsideration,
        statusId: data.statusId,
        takeAction: data.takeAction,
        timeToCheckComplaint: data.timeToCheckComplaint,

        assessmentQualitySatisfactionComplaint: data.assessmentQualitySatisfactionComplaint,



    };


    Getalllevelcomplaint.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allLevelComplaint = entry.resultFromDb;





    });



    $scope.clearSearchTerm = function() {
        $scope.data.newCanalRequest = '';
        $scope.data.newCategGRM = '';
    };



    $scope.createNewCanalRequest = function (event) {
        if(event.keyCode === 13) {

            InsertNewCanalRequest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCanalRequest}, function(entry) {


                $scope.data.allCanalRequestStatus = entry.resultFromDb;


            });

        }
    };


    $scope.createNewCategGRM = function (event) {
        if(event.keyCode === 13) {

            InsertNewCategGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCategGRM}, function(entry) {


                $scope.data.allCategComplaint = entry.resultFromDb;


            });

        }
    };



    $scope.$watch("data.dateNotifDeclarer", function (newVal, oldVal) {


        $scope.timeDiff = Math.abs(newVal.getTime() - $scope.data.dateInGo.getTime());

        $scope.data.timeToCheckComplaint = Math.ceil($scope.timeDiff / (1000 * 3600 * 24));

    });



    $scope.selectLevel = function (data) {

        const sixTyDay = 5184000000;
        const therTyDay = 2592000000;


        for (let obj of $scope.data.allLevelComplaint) {
            if (obj._id === data) {
                if(obj.name === "Сложная"){

                    $scope.data.lastDateAnswer = new Date($scope.data.dateInGo.getTime() + sixTyDay);

                } else if (obj.name === "Простая") {

                    $scope.data.lastDateAnswer = new Date($scope.data.dateInGo.getTime() + therTyDay);


                }
            }

        }
    };


    $scope.addComplaint = function () {
        UpdateGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function (result) {



            if (result.code === 0) {


                GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                    if (result.code === 0) {





                        $rootScope.data = result.resultFromDb;

                        $rootScope.data.sort(function(a,b){return new Date(a.dateInGo).getTime() - new Date(b.dateInGo).getTime()});


                        for (const dataItem of $rootScope.data) {
                            delete dataItem.allCanalRequestStatus;
                            delete dataItem.allCountrys;
                            delete dataItem.allCategComplaint;
                            delete dataItem.allStatus;
                        }


                    } else {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                                .position('bottom left')
                                .hideDelay(6000)
                        );


                    }




                });


                $mdDialog.hide();




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

    $scope.closeDialog = function () {



        $mdDialog.hide();



    };

}


function DialogController($scope, InsertNewCategGRM, InsertNewCanalRequest, Getalllevelcomplaint) {

    $scope.data = {




        country: "",
        levelComplaint: "",
        canalRequest: "",
        categComplaint: "",
        statusId: "",



        dateInGo: new Date(),
        dateStartInvestegment: new Date(),
        declarerFIO: "",
        raisedQuestion: "",
        responsibleConsideration: "",
        takeAction: "",
        lastDateAnswer: new Date(),
        dateNotifDeclarer: new Date(),
        timeToCheckComplaint: ""



    };

    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });



    Getalllevelcomplaint.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allLevelComplaint = entry.resultFromDb;
        $scope.data.levelComplaint = entry.resultFromDb[0]._id;


        $scope.selectLevel($scope.data.levelComplaint);


    });


    GetAllStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allStatus = entry.resultFromDb;
        $scope.data.statusId = entry.resultFromDb[0]._id;


    });



    GetAllCanalRequest.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCanalRequestStatus = entry.resultFromDb;
        $scope.data.canalRequest = entry.resultFromDb[0]._id;


    });



    GetAllCategGRM.get({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCategComplaint = entry.resultFromDb;
        $scope.data.categComplaint = entry.resultFromDb[0]._id;


    });


    $scope.clearSearchTerm = function() {
        $scope.data.newCanalRequest = '';
        $scope.data.newCategGRM = '';
    };



    $scope.createNewCanalRequest = function (event) {
        if(event.keyCode === 13) {

            InsertNewCanalRequest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCanalRequest}, function(entry) {


                $scope.data.allCanalRequestStatus = entry.resultFromDb;


            });

        }
    };


    $scope.createNewCategGRM = function (event) {
        if(event.keyCode === 13) {

            InsertNewCategGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCategGRM}, function(entry) {


                $scope.data.allCategComplaint = entry.resultFromDb;


            });

        }
    };



    $scope.$watch("data.dateNotifDeclarer", function (newVal, oldVal) {


        $scope.timeDiff = Math.abs(newVal.getTime() - $scope.data.dateInGo.getTime());

        $scope.data.timeToCheckComplaint = Math.ceil($scope.timeDiff / (1000 * 3600 * 24));

    });



    $scope.selectLevel = function (data) {

        const sixTyDay = 5184000000;
        const therTyDay = 2592000000;


        for (let obj of $scope.data.allLevelComplaint) {
            if (obj._id === data) {
               if(obj.name === "Сложная"){

                   $scope.data.lastDateAnswer = new Date($scope.data.dateInGo.getTime() + sixTyDay);

               } else if (obj.name === "Простая") {

                   $scope.data.lastDateAnswer = new Date($scope.data.dateInGo.getTime() + therTyDay);


               }
            }

        }
    };



    $scope.addComplaint = function () {
        AddGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function (result) {



            if (result.code === 0) {


                GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                    if (result.code === 0) {





                        $rootScope.data = result.resultFromDb;
                        $rootScope.data.sort(function(a,b){return new Date(a.dateInGo).getTime() - new Date(b.dateInGo).getTime()});



                        for (const dataItem of $rootScope.data) {
                            delete dataItem.allCanalRequestStatus;
                            delete dataItem.allCountrys;
                            delete dataItem.allCategComplaint;
                            delete dataItem.allStatus;
                        }


                    } else {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                                .position('bottom left')
                                .hideDelay(6000)
                        );


                    }




                });


                $mdDialog.hide();




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





    $scope.closeDialog = function () {



        $mdDialog.hide();



    };



}



});

