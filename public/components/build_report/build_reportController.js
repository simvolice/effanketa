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

        categorizedByDatePeriodCountry: data.capacityBuilding,
        creditsTable: data.credits,

        categorizedByAllComplaints: data.grm.categorizedByAllComplaints,
        categorizedByAccept: data.grm.categorizedByAccept,
        categorizedByComplete: data.grm.categorizedByComplete,
        categorizedByLowLevel: data.grm.categorizedByLowLevel,
        categorizedByType: data.grm.categorizedByType,

        categorizedByBudgetBisbursement: data.finstatus.categorizedByBudgetBisbursement,
        categorizedByCreditLine: data.finstatus.categorizedByCreditLine,
        categorizedByOperatingExpenses: data.finstatus.categorizedByOperatingExpenses,
        categorizedByServices: data.finstatus.categorizedByServices,






        overallNarrative: data.overallNarrative,

        grmSourceInformation: data.grmSourceInformation,
        projectRisksIssuesQuestion: data.projectRisksIssuesQuestion,
        projectRisksPotentialRisksQuestion: data.projectRisksPotentialRisksQuestion,




    };




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


function DialogControllerNewReport($scope, data, GetGrowPotencial, GetReportCredits, GetReportGrm, GetReportFinansialStatus, AddNewReport, GetGrowPotencialNewVersion) {



$scope.data = {

    typePeriod: data.periodName,
    year: data.year,
    idcountry: data.country,
    country: data.nameCountry,
    grm: {},
    finstatus: {},


    overallNarrative: "",

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





    GetGrowPotencialNewVersion.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {





        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByDatePeriodCountry = obj.categorizedByDatePeriodCountry;


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



        $scope.data.capacityBuilding = $scope.data.categorizedByDatePeriodCountry;
        $scope.data.credits = $scope.data.creditsTable;

         $scope.data.grm.categorizedByAllComplaints = $scope.data.categorizedByAllComplaints;
         $scope.data.grm.categorizedByAccept = $scope.data.categorizedByAccept;
         $scope.data.grm.categorizedByComplete = $scope.data.categorizedByComplete;
         $scope.data.grm.categorizedByLowLevel = $scope.data.categorizedByLowLevel;
         $scope.data.grm.categorizedByType = $scope.data.categorizedByType;


         $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
         $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
         $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
         $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;




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

