/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('BuildReportCtrl', function ($scope, $mdDialog, GetAllCoutrys, GetTypePeriod, $mdToast, GetYearName, GetReport, $rootScope, DelReport) {

    $rootScope.data = [];

//Блокируем Ctrl+P
    $(document).bind("keyup keydown", function(e){
        if(e.ctrlKey && e.keyCode === 80){
            return false;
        }
    });




    GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $rootScope.data = entry.resultFromDb;



    });


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allCountrys = entry.resultFromDb;
        $scope.country = entry.resultFromDb[0]._id;


        $scope.allCountrys.push({_id: 0, name: "Все"});



    });


    GetTypePeriod.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allperiod = entry.resultFromDb;
        $scope.period = entry.resultFromDb[0]._id;


    });



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[0]._id;


    });


    $scope.getNameById = function (id, arr) {
        for (let obj of arr) {

            if (obj._id === id){

                return obj.name;

            }
        }

    };




    $scope.delete = function (data, index) {
        DelReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data._id}, function(entry) {

            if (entry.code === 0) {



                $rootScope.data.splice(index, 1);

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

    $scope.updateEvent = function (data, ev, index) {


        $mdDialog.show({
            controller: DialogControllerUpdReport,
            locals:{data: data},
            templateUrl: 'components/build_report/dialog_template_new_report.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    };





    $scope.showModalWnd = function (ev) {



        $mdDialog.show({
            controller: DialogControllerNewReport,
            locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
            templateUrl: 'components/build_report/dialog_template_new_report.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    };


function DialogControllerUpdReport($scope, data, UpdReport) {



    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,




        overallNarrative: data.overallNarrative,
        participantsStated: data.participantsStated,
        comments: data.comments,

        grmSourceInformation: data.grmSourceInformation,
        projectRisksIssuesQuestion: data.projectRisksIssuesQuestion,
        projectRisksPotentialRisksQuestion: data.projectRisksPotentialRisksQuestion,




    };

    setTimeout(function () {
        $("#capacityBuilding").empty();
        $("#credits").empty();
        $("#grm").empty();
        $("#finstatus").empty();

        $("#capacityBuilding").append(data.capacityBuilding);
        $("#credits").append(data.credits);
        $("#grm").append(data.grm);
        $("#finstatus").append(data.finstatus);
    }, 1000);


    $scope.print = function () {



        $("#printableArea").print();


    };


    $scope.save = function () {



        $scope.data.capacityBuilding = document.getElementById('capacityBuilding').innerHTML;
        $scope.data.credits = document.getElementById('credits').innerHTML;
        $scope.data.grm = document.getElementById('grm').innerHTML;
        $scope.data.finstatus = document.getElementById('finstatus').innerHTML;

        UpdReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function(entry) {

            if (entry.code === 0) {


                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;



                });


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


function DialogControllerNewReport($scope, data, GetGrowPotencial, GetReportCredits, GetReportGrm, GetReportFinansialStatus, AddNewReport) {



$scope.data = {

    typePeriod: data.periodName,
    year: data.year,
    idcountry: data.country,
    country: data.nameCountry,



    overallNarrative: "",
    participantsStated: "",
    comments: "",

    grmSourceInformation: "",
    projectRisksIssuesQuestion: "",
    projectRisksPotentialRisksQuestion: "",






    categorizedByDatePeriodCountry: [],
    categorizedBySum: [],
    countSatisfaction: [],
    countSatisfactionWomen: [],
    creditsTable: [],

    categorizedByAllComplaints: "",
    categorizedByAccept: "",
    categorizedByComplete: "",
    categorizedByLowLevel: "",

    categorizedByType: [],

    categorizedByBudgetBisbursement: [],
    categorizedByCreditLine: [],
    categorizedByOperatingExpenses: [],
    categorizedByServices: []




};




    GetGrowPotencial.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {



        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByDatePeriodCountry = obj.categorizedByDatePeriodCountry;
            $scope.data.categorizedBySum = obj.categorizedBySum;
            $scope.data.countSatisfaction = obj.countSatisfaction;
            $scope.data.countSatisfactionWomen = obj.countSatisfactionWomen;


        }




    });



    GetReportCredits.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {



        $scope.data.creditsTable = entry.resultFromDb;


    });


    GetReportGrm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {



        for (let obj of entry.resultFromDb) {

            if (obj.categorizedByAllComplaints.length !== 0){


                $scope.data.categorizedByAllComplaints = obj.categorizedByAllComplaints[0].countAll;



            }

            if (obj.categorizedByAccept.length !== 0) {

                $scope.data.categorizedByAccept = obj.categorizedByAccept[0].countAll;

            }

            if (obj.categorizedByComplete.length !== 0) {


                $scope.data.categorizedByComplete = obj.categorizedByComplete[0].countAll;


            }


            if (obj.categorizedByLowLevel.length !== 0){

                $scope.data.categorizedByLowLevel = obj.categorizedByLowLevel[0].countAll;

            }

            $scope.data.categorizedByType = obj.categorizedByType;

        }



    });


    GetReportFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {

        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursement = obj.categorizedByBudgetBisbursement;
            $scope.data.categorizedByCreditLine = obj.categorizedByCreditLine;
            $scope.data.categorizedByOperatingExpenses = obj.categorizedByOperatingExpenses;
            $scope.data.categorizedByServices = obj.categorizedByServices;


        }
    });



    $scope.print = function () {



        $("#printableArea").print();


    };


    $scope.save = function () {



        $scope.data.capacityBuilding = document.getElementById('capacityBuilding').innerHTML;
        $scope.data.credits = document.getElementById('credits').innerHTML;
        $scope.data.grm = document.getElementById('grm').innerHTML;
        $scope.data.finstatus = document.getElementById('finstatus').innerHTML;

        AddNewReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function(entry) {

            if (entry.code === 0) {


                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;



                });


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

