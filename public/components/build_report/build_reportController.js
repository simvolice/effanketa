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



    $scope.changeCountry = function (country) {


        if (country === 0) {
            $scope.allperiod = $scope.allperiod.slice(4);
      } else {
            GetTypePeriod.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                $scope.allperiod = entry.resultFromDb;

            });


        }



    };




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





       if (data.typePeriod === "Годовой" && data.country !== "Все") {

           $mdDialog.show({
               controller: DialogControllerUpdReportYearNCU,
               locals:{data: data},
               templateUrl: 'components/build_report/dialog_template_new_report_year_ncu.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose:true,
               fullscreen: true // Only for -xs, -sm breakpoints.
           });


       } else if (data.country === "Все" && data.typePeriod.includes("Первое полугодие")) {

           $mdDialog.show({
               controller: DialogControllerUpdReportHalfYearRCU,
               locals:{data: data},
               templateUrl: 'components/build_report/dialog_template_new_report_half_rcu.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose:true,
               fullscreen: true // Only for -xs, -sm breakpoints.
           });





       } else if (data.country === "Все" && data.typePeriod === "Годовой") {


           $mdDialog.show({
               controller: DialogControllerUpdReportYearRCU,
               locals:{data: data},
               templateUrl: 'components/build_report/dialog_template_new_report_year_rcu.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose:true,
               fullscreen: true // Only for -xs, -sm breakpoints.
           });



       } else {


           $mdDialog.show({
               controller: DialogControllerUpdReport,
               locals:{data: data},
               templateUrl: 'components/build_report/dialog_template_new_report.html',
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose:true,
               fullscreen: true // Only for -xs, -sm breakpoints.
           });


       }








    };





$scope.showModalWnd = function (ev) {

   let nameCountry = $scope.getNameById($scope.country, $scope.allCountrys);
   let namePeriod = $scope.getNameById($scope.period, $scope.allperiod);


            if (namePeriod === "Годовой" && nameCountry !== "Все") {

                $mdDialog.show({
                    controller: DialogControllerNewReportYearNCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_year_ncu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });

            } else if (nameCountry === "Все" && namePeriod.includes("Первое полугодие")) {

                $mdDialog.show({
                    controller: DialogControllerNewReportHalfYearRCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_half_rcu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });





            } else if (nameCountry === "Все" && namePeriod === "Годовой") {


                $mdDialog.show({
                    controller: DialogControllerNewReportYearRCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_year_rcu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });


            } else {

                $mdDialog.show({
                    controller: DialogControllerNewReport,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });


            }









    };




function DialogControllerUpdReportYearRCU($scope, data, UpdReportYearRCU, GetReport, $http) {
    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,
        finstatus: {},

        arrAllFiles: data.arrAllFiles,



        introductionScopeReport: data.introductionScopeReport,
        projectPerformance: data.projectPerformance,
        resultsSummary: data.resultsSummary,
        overallNarrativeProgressRegionalClimateKnowledge: data.overallNarrativeProgressRegionalClimateKnowledge,
        resultsImpactSummaryRegionalClimateKnowledge: data.resultsImpactSummaryRegionalClimateKnowledge,
        overallNarrativeProgressClimateInvestments: data.overallNarrativeProgressClimateInvestments,
        resultsImpactSummaryClimateInvestments: data.resultsImpactSummaryClimateInvestments,
        overallNarrativeProgressRegionalNationalCoordination: data.overallNarrativeProgressRegionalNationalCoordination,
        risks: data.risks,
        lessonsLearned: data.lessonsLearned,
        recommendations: data.recommendations,
        NCUTajikistan: data.NCUTajikistan,
        NCUUzbekistan: data.NCUUzbekistan,
        rcu: data.rcu,

        categorizedByBudgetBisbursement: data.finstatus.categorizedByBudgetBisbursement,
        categorizedByCreditLine: data.finstatus.categorizedByCreditLine,
        categorizedByOperatingExpenses: data.finstatus.categorizedByOperatingExpenses,
        categorizedByServices: data.finstatus.categorizedByServices,








    };




    $scope.print = function () {



        $("#printableArea").print();


    };



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/updreportyearrcu',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }



    $scope.closeDialog = function () {


        $mdDialog.hide();



    };

}



function DialogControllerNewReportYearRCU($scope, data, GetReportFinansialStatus, ReportYearRCUSave, $http, GetTadjickUzbekNCUYear) {


    $scope.data = {

        typePeriod: data.periodName,
        year: data.year,
        idcountry: data.country,
        country: data.nameCountry,


        introductionScopeReport: "",
        projectPerformance: "",
        resultsSummary: "",
        overallNarrativeProgressRegionalClimateKnowledge: "",
        resultsImpactSummaryRegionalClimateKnowledge: "",
        overallNarrativeProgressClimateInvestments: "",
        resultsImpactSummaryClimateInvestments: "",
        overallNarrativeProgressRegionalNationalCoordination: "",
        risks: "",
        lessonsLearned: "",
        recommendations: "",
        NCUTajikistan: "",
        NCUUzbekistan: "",
        rcu: "",
        finstatus: {}
    };



    GetReportFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {

        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursement = obj.categorizedByBudgetBisbursement;
            $scope.data.categorizedByCreditLine = obj.categorizedByCreditLine;
            $scope.data.categorizedByOperatingExpenses = obj.categorizedByOperatingExpenses;
            $scope.data.categorizedByServices = obj.categorizedByServices;


        }
    });


    GetTadjickUzbekNCUYear.get(function (result) {
       $scope.data.NCUTajikistan = result.resultFromDb[0].getTadzhikNCUYear[0].plannedBudget;
       $scope.data.NCUUzbekistan = result.resultFromDb[0].getUzbekNCUYear[0].plannedBudget;
    });




    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/reportyearrcusave',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }




    $scope.print = function () {



        $("#printableArea").print();


    };

    $scope.closeDialog = function () {


        $mdDialog.hide();



    };








}



function DialogControllerUpdReportHalfYearRCU($scope, data, UpdReportHalfYearRCU, GetReport, $http) {




    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,
        finstatus: {},
        arrAllFiles: data.arrAllFiles,



        introductionScopeReport: data.introductionScopeReport,
        resultsSummary: data.resultsSummary,
        overallNarrativeProgress: data.overallNarrativeProgress,
        resultsImpactSummary: data.resultsImpactSummary,
        overallNarrativeProgressClimateInvestments: data.overallNarrativeProgressClimateInvestments,
        resultsImpactSummaryClimateInvestments: data.resultsImpactSummaryClimateInvestments,
        overallNarrativeProgressRegionalNationalCoordination: data.overallNarrativeProgressRegionalNationalCoordination,
        risks: data.risks,
        lessonsLearned: data.lessonsLearned,
        recommendations: data.recommendations,
        NCUTajikistan: data.NCUTajikistan,
        NCUUzbekistan: data.NCUUzbekistan,
        rcu: data.rcu,
        nextHalfYearNCUTajikistan: data.nextHalfYearNCUTajikistan,
        nextHalfYearNCUUzbekistan: data.nextHalfYearNCUUzbekistan,
        nextHalfYearrcu: data.nextHalfYearrcu,

        categorizedByBudgetBisbursement: data.finstatus.categorizedByBudgetBisbursement,
        categorizedByCreditLine: data.finstatus.categorizedByCreditLine,
        categorizedByOperatingExpenses: data.finstatus.categorizedByOperatingExpenses,
        categorizedByServices: data.finstatus.categorizedByServices,








    };




    $scope.print = function () {



        $("#printableArea").print();


    };






    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/updreporthalfyearrcu',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }















    $scope.closeDialog = function () {


        $mdDialog.hide();



    };

}




function DialogControllerNewReportHalfYearRCU($scope, data, GetReportFinansialStatus, ReportHalfYearRCUSave, GetReport, $http) {

    $scope.data = {


        typePeriod: data.periodName,
        year: data.year,
        idcountry: data.country,
        country: data.nameCountry,

        introductionScopeReport: "",
        resultsSummary: "",
        overallNarrativeProgress: "",
        resultsImpactSummary: "",
        overallNarrativeProgressClimateInvestments: "",
        resultsImpactSummaryClimateInvestments: "",
        overallNarrativeProgressRegionalNationalCoordination: "",
        risks: "",
        lessonsLearned: "",
        recommendations: "",
        NCUTajikistan: "",
        NCUUzbekistan: "",
        rcu: "",
        nextHalfYearNCUTajikistan: "",
        nextHalfYearNCUUzbekistan: "",
        nextHalfYearrcu: "",
        finstatus: {}

    };





    GetReportFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {

        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursement = obj.categorizedByBudgetBisbursement;
            $scope.data.categorizedByCreditLine = obj.categorizedByCreditLine;
            $scope.data.categorizedByOperatingExpenses = obj.categorizedByOperatingExpenses;
            $scope.data.categorizedByServices = obj.categorizedByServices;


        }
    });



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/reporthalfyearrcusave',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }



















    $scope.print = function () {



        $("#printableArea").print();


    };

    $scope.closeDialog = function () {


        $mdDialog.hide();



    };









}


function DialogControllerUpdReportYearNCU($scope, data, UpdReportYearNCU, GetReport, $http) {
    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,
        finstatus: {},
        arrAllFiles: data.arrAllFiles,



        projectPerformance: data.projectPerformance,
        projectPerformanceComments: data.projectPerformanceComments,
        detailedProject: data.detailedProject,
        risks: data.risks,
        lessonsLearned: data.lessonsLearned,
        recommendations: data.recommendations,
        plannedBudget: data.plannedBudget,


        categorizedByBudgetBisbursement: data.finstatus.categorizedByBudgetBisbursement,
        categorizedByCreditLine: data.finstatus.categorizedByCreditLine,
        categorizedByOperatingExpenses: data.finstatus.categorizedByOperatingExpenses,
        categorizedByServices: data.finstatus.categorizedByServices,


    };




    $scope.print = function () {



        $("#printableArea").print();


    };


    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/updreportyearncu',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }







    $scope.closeDialog = function () {


        $mdDialog.hide();



    };


}


function DialogControllerNewReportYearNCU($scope, data, GetReportFinansialStatusYearNCU, ReportYearSave, GetReport, $http) {



    $scope.data = {

        typePeriod: data.periodName,
        year: data.year,
        idcountry: data.country,
        country: data.nameCountry,
        projectPerformance: "",
        projectPerformanceComments: "",
        detailedProject: "",
        risks: "",
        lessonsLearned: "",
        recommendations: "",
        plannedBudget: "",
        finstatus: {},

        categorizedByFourthQuarterTotalPlan: 0,
        categorizedByFourthQuarterTotalFact: 0




    };







    GetReportFinansialStatusYearNCU.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {




        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursementPlanYear = obj.categorizedByBudgetBisbursementPlanYear[0].totalPlan;
            $scope.data.categorizedByBudgetBisbursementPlanYearCopy = obj.categorizedByBudgetBisbursementPlanYear[0].totalPlan;




            $scope.data.categorizedByBalanceYear = obj.categorizedByBalanceYear[0].totalBalance;
            $scope.data.categorizedByBalanceYearCopy = obj.categorizedByBalanceYear[0].totalBalance;


            $scope.data.categorizedByFirstQuarterPlan = obj.categorizedByFirstQuarter[0].totalPlan;
            $scope.data.categorizedByFirstQuarterFact = obj.categorizedByFirstQuarter[0].totalFact;



            $scope.data.categorizedBySecondQuarterTotalPlan = obj.categorizedBySecondQuarter[0].totalPlan;
            $scope.data.categorizedBySecondQuarterTotalFact = obj.categorizedBySecondQuarter[0].totalFact;



            $scope.data.categorizedByThirdQuarterTotalPlan = obj.categorizedByThirdQuarter[0].totalPlan;
            $scope.data.categorizedByThirdQuarterTotalFact = obj.categorizedByThirdQuarter[0].totalFact;


        }
    });





    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;


        formdata.append('data', JSON.stringify($scope.data));


        var request = {
            method: 'POST',
            url: '/reportyearsave',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;




                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
                    $rootScope.data = entry.resultFromDb;



                });



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }








    $scope.print = function () {



        $("#printableArea").print();


    };

    $scope.closeDialog = function () {


        $mdDialog.hide();



    };


}


function DialogControllerUpdReport($scope, data, UpdReport) {



    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,




        creditsTable: data.credits,

        grm: {},
        finstatus: {},
        capacityBuilding: {},


        plansNextPeriod: data.plansNextPeriod,
        plansNextHalfYearPeriod: data.plansNextHalfYearPeriod,




        categorizedByDatePeriodCountry :  data.capacityBuilding.categorizedByDatePeriodCountry,
        categorizedBySum :  data.capacityBuilding.categorizedBySum,
        countSatisfaction :  data.capacityBuilding.countSatisfaction,
        countSatisfactionWomen :  data.capacityBuilding.countSatisfactionWomen,



        categorizedByAllComplaints: data.grm.categorizedByAllComplaints,
        categorizedByInvestiginationStarted: data.grm.categorizedByInvestiginationStarted,
        categorizedByInvestiginationCompleted: data.grm.categorizedByInvestiginationCompleted,
        categorizedByLowLevel: data.grm.categorizedByLowLevel,
        categorizedByType: data.grm.categorizedByType,

        categorizedByBudgetBisbursement: data.finstatus.categorizedByBudgetBisbursement,
        categorizedByCreditLine: data.finstatus.categorizedByCreditLine,
        categorizedByOperatingExpenses: data.finstatus.categorizedByOperatingExpenses,
        categorizedByServices: data.finstatus.categorizedByServices,






        overallNarrative: data.overallNarrative,

        grmSourceInformation: data.grmSourceInformation,
        satisfiedComplaintsInPercentage:  data.satisfiedComplaintsInPercentage,
        projectRisksIssuesQuestion: data.projectRisksIssuesQuestion,
        projectRisksPotentialRisksQuestion: data.projectRisksPotentialRisksQuestion,




    };




    $scope.print = function () {



        $("#printableArea").print();


    };


    $scope.save = function () {



        $scope.data.capacityBuilding.categorizedByDatePeriodCountry =  $scope.data.categorizedByDatePeriodCountry;
        $scope.data.capacityBuilding.categorizedBySum =  $scope.data.categorizedBySum;
        $scope.data.capacityBuilding.countSatisfaction =  $scope.data.countSatisfaction;
        $scope.data.capacityBuilding.countSatisfactionWomen =  $scope.data.countSatisfactionWomen;



        $scope.data.credits = $scope.data.creditsTable;

        $scope.data.grm.categorizedByAllComplaints = $scope.data.categorizedByAllComplaints;
        $scope.data.grm.categorizedByInvestiginationStarted = $scope.data.categorizedByInvestiginationStarted;
        $scope.data.grm.categorizedByInvestiginationCompleted = $scope.data.categorizedByInvestiginationCompleted;
        $scope.data.grm.categorizedByLowLevel = $scope.data.categorizedByLowLevel;
        $scope.data.grm.categorizedByType = $scope.data.categorizedByType;


        $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
        $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
        $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
        $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;

        UpdReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function(entry) {

            if (entry.code === 0) {


                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
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

    $scope.calculatePercent = function (num) {

        let result = num*100/100;
        return result.toFixed(0);
    };

$scope.data = {

    typePeriod: data.periodName,
    year: data.year,
    idcountry: data.country,
    country: data.nameCountry,
    grm: {},
    finstatus: {},
    capacityBuilding: {},

    participantsStated: "",
    comments: "",


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

            if (obj.categorizedByInvestiginationStarted.length !== 0) {

                $scope.data.categorizedByInvestiginationStarted = obj.categorizedByInvestiginationStarted[0].countAll;

            }

            if (obj.categorizedByInvestiginationCompleted.length !== 0) {


                $scope.data.categorizedByInvestiginationCompleted = obj.categorizedByInvestiginationCompleted[0].countAll;


            }


            if (obj.categorizedByLowLevel.length !== 0){

                $scope.data.categorizedByLowLevel = obj.categorizedByLowLevel[0].countAll;

            }






            if (obj.categorizedByType.length !== 0) {

             $scope.data.categorizedByType = obj.categorizedByType;

            }




            if (obj.categorizedBySatisfiedInPercent.length !== 0) {

                $scope.data.satisfiedComplaintsInPercentage = $scope.calculatePercent(obj.categorizedBySatisfiedInPercent[0].countAll);

            }








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

      $scope.data.capacityBuilding.categorizedByDatePeriodCountry =  $scope.data.categorizedByDatePeriodCountry;
      $scope.data.capacityBuilding.categorizedBySum =  $scope.data.categorizedBySum;
      $scope.data.capacityBuilding.countSatisfaction =  $scope.data.countSatisfaction;
      $scope.data.capacityBuilding.countSatisfactionWomen =  $scope.data.countSatisfactionWomen;



        $scope.data.credits = $scope.data.creditsTable;

         $scope.data.grm.categorizedByAllComplaints = $scope.data.categorizedByAllComplaints;
         $scope.data.grm.categorizedByInvestiginationStarted = $scope.data.categorizedByInvestiginationStarted;
         $scope.data.grm.categorizedByInvestiginationCompleted = $scope.data.categorizedByInvestiginationCompleted;
         $scope.data.grm.categorizedByLowLevel = $scope.data.categorizedByLowLevel;
         $scope.data.grm.categorizedByType = $scope.data.categorizedByType;


         $scope.data.finstatus.categorizedByBudgetBisbursement   = $scope.data.categorizedByBudgetBisbursement;
         $scope.data.finstatus.categorizedByCreditLine   = $scope.data.categorizedByCreditLine;
         $scope.data.finstatus.categorizedByOperatingExpenses   = $scope.data.categorizedByOperatingExpenses;
         $scope.data.finstatus.categorizedByServices   = $scope.data.categorizedByServices;




        AddNewReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data:  $scope.data}, function(entry) {

            if (entry.code === 0) {


                GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {

                    $mdDialog.hide();
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

