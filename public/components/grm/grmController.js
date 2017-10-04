/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('GrmCtrl', function ($scope, $cookies, GetAllGrm, GetAllStatus, $mdToast, $mdDialog, $rootScope, $timeout, ChangeStatus, DeleteGrm) {


    $scope.grmStatus = [];
    $scope.data = [];



    GetAllStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.grmStatus = entry.resultFromDb;

        GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), statusId: $scope.grmStatus[0]._id}, function(entry) {


            $scope.statusAdm = entry.resultFromDb.statusAdm;

            $scope.data = entry.resultFromDb.Arr;


        });


    });








function getGrmForTable(statusTab) {


    for (let obj of $scope.grmStatus) {

        if (obj.name === statusTab) {


            GetAllGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), statusId: obj._id}, function(entry) {


                $scope.statusAdm = entry.resultFromDb.statusAdm;

                $scope.data = entry.resultFromDb.Arr;


            });


        }


    }



}



    $scope.tabClk = function (statusTab) {


        getGrmForTable(statusTab);


    };



$scope.selectChange = function (id, statusId, index) {


    ChangeStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: {id: id, statusId: statusId}}, function(result) {


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


$scope.delete = function (id, index) {
    DeleteGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


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



$scope.addBtn = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        locals:{statusAdm: $scope.statusAdm},
        templateUrl: 'components/grm/dialog_template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
};








function DialogController($scope, statusAdm, GetAllCoutrys, AddGrm, GetAllCanalRequest, InsertNewCanalRequest) {



    $scope.data = {


        dateInGo: "",
        sourceTake: "",
        declarerFIO: "",
        country: "",
        contacDeclarer: "",
        categComplaint: "",
        raisedQuestion: "",
        responsibleConsideration: "",
        reviewStatus: "",
        takeAction: "",
        lastDateAnswer: "",
        dateNotifDeclarer: "",
        timeToCheckComplaint: "",
        statusAdm: statusAdm,
        newCanalRequest: ""

    };



    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });


    GetAllCanalRequest.get(function(entry) {


        $scope.data.allCanalRequest = entry.resultFromDb;
        $scope.data.sourceTake = entry.resultFromDb[0]._id;


    });


    $scope.clearSearchTerm = function() {
        $scope.data.newCanalRequest = '';
    };



    $scope.createNewCanalRequest = function (event) {
      if(event.keyCode === 13) {

          InsertNewCanalRequest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCanalRequest}, function(entry) {


              $scope.data.allCanalRequest = entry.resultFromDb;


          });

      }
    };



    $scope.addComplaint = function () {


        AddGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



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



    };


    $scope.closeDialog = function () {



        $mdDialog.hide();

        getGrmForTable("Принято");

    };



}




$scope.saveBtn = function (data, ev) {
    $mdDialog.show({
        controller: DialogControllerUpdate,
        locals:{statusAdm: $scope.statusAdm, data: data},
        templateUrl: 'components/grm/dialog_template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
};




function DialogControllerUpdate($scope, data, statusAdm, GetAllCoutrys, UpdateGrm, GetAllCanalRequest, InsertNewCanalRequest) {




        $scope.data = {

            _id: data._id,
            dateInGo: new Date(data.dateInGo),
            sourceTake: data.sourceTake,
            declarerFIO: data.declarerFIO,
            country: data.country,
            contacDeclarer: data.contacDeclarer,
            categComplaint: data.categComplaint,
            raisedQuestion: data.raisedQuestion,
            responsibleConsideration: data.responsibleConsideration,
            reviewStatus: data.reviewStatus,
            takeAction: data.takeAction,
            lastDateAnswer: new Date(data.lastDateAnswer),
            dateNotifDeclarer: new Date(data.dateNotifDeclarer),
            timeToCheckComplaint: data.timeToCheckComplaint,
            statusAdm: statusAdm

        };



        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;


        });


    GetAllCanalRequest.get(function(entry) {


        $scope.data.allCanalRequest = entry.resultFromDb;


    });



    $scope.clearSearchTerm = function() {
        $scope.data.newCanalRequest = '';
    };



    $scope.createNewCanalRequest = function (event) {
        if(event.keyCode === 13) {

            InsertNewCanalRequest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.newCanalRequest}, function(entry) {


                $scope.data.allCanalRequest = entry.resultFromDb;


            });

        }
    };


        $scope.addComplaint = function () {


            UpdateGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



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



        };


        $scope.closeDialog = function () {



            $mdDialog.hide();

            getGrmForTable(data.nameStatus);

        };



    }





});

