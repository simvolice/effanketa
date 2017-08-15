/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('GrmCtrl', function ($scope, $cookies, GetAllGrm, GetAllStatus, $mdToast, $mdDialog, $rootScope, $timeout) {


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


                $scope.data = entry.resultFromDb;



            });


        } else {

          return false;

        }


    }



}



    $scope.tabClk = function (statusTab) {

        getGrmForTable(statusTab);


    };






$scope.addBtn = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        locals:{data: "testDataFromParentController"},
        templateUrl: 'components/grm/dialog_template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
};



function DialogController($scope, data, GetAllCoutrys, AddGrm) {

    $scope.data = {


        dateInGo: "",
        sourceTake: "",
        declarerFIO: "",
        country: "",
        phoneDeclarer: "",
        categComplaint: "",
        raisedQuestion: "",
        responsibleConsideration: "",
        reviewStatus: "",
        takeAction: "",
        lastDateAnswer: "",
        dateNotifDeclarer: "",
        timeToCheckComplaint: "",

    };



    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });


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
    };



}



});

