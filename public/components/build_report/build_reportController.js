/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('BuildReportCtrl', function ($translate, $window, $timeout, $scope, $mdDialog, GetAllCoutrys, GetTypePeriod, $mdToast, GetYearName, GetReport, $rootScope, DelReport) {

    $rootScope.data = [];




//Блокируем Ctrl+P
    $(document).bind("keyup keydown", function(e){
        if(e.ctrlKey && e.keyCode === 80){
            return false;
        }
    });



    $scope.changeCountry = function (country) {


        for (let itemCountry of $scope.allCountrys) {
            if (itemCountry._id === country){

                if (itemCountry.name === "РКГ, Региональный компонент 1") {


                    $scope.allperiod = $scope.allperiod.slice(4);
                    $scope.period = $scope.allperiod[0]._id;



                } else {



                    GetTypePeriod.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $scope.allperiod = entry.resultFromDb;
                        $scope.period = entry.resultFromDb[0]._id;

                    });




                }



            }
        }




    };




    GetReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $rootScope.data = entry.resultFromDb;



    });


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allCountrys = entry.resultFromDb;
        $scope.country = entry.resultFromDb[0]._id;





    });


    GetTypePeriod.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allperiod = entry.resultFromDb;




    });



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[entry.resultFromDb.length-1]._id;


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





        if (data.typePeriod.includes("Годовой") && data.country.includes("НКГ")) {

            $mdDialog.show({
                controller: DialogControllerUpdReportYearNCU,
                locals:{data: data},
                templateUrl: 'components/build_report/dialog_template_new_report_year_ncu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });

        } else if (data.typePeriod.includes("Полугодовой") && data.country.includes("НКГ")) {

            $mdDialog.show({
                controller: DialogControllerUpdReportQNCU,
                locals:{data: data},
                templateUrl: 'components/build_report/dialog_template_new_report_q_ncu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });





        } else if (data.typePeriod.includes("Квартальный") && data.country.includes("НКГ")) {

            $mdDialog.show({
                controller: DialogControllerUpdReportQNCU,
                locals:{data: data},
                templateUrl: 'components/build_report/dialog_template_new_report_q_ncu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });





        }else if (data.typePeriod.includes("Годовой") && data.country.includes("РКГ")) {


            $mdDialog.show({
                controller: DialogControllerUpdReportYearRCU,
                locals:{data: data},
                templateUrl: 'components/build_report/dialog_template_new_report_year_rcu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });


        } else if (data.typePeriod.includes("Полугодовой") && data.country.includes("РКГ")) {


            $mdDialog.show({
                controller: DialogControllerUpdReportHalfYearRCU,
                locals:{data: data},
                templateUrl: 'components/build_report/dialog_template_new_report_half_rcu.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });


        }












    };




    $timeout(function () {


        $scope.changeCountry($scope.country);


    }, 350);



$scope.showModalWnd = function (ev) {

   let nameCountry = $scope.getNameById($scope.country, $scope.allCountrys);
   let namePeriod = $scope.getNameById($scope.period, $scope.allperiod);


            if (namePeriod.includes("Годовой") && nameCountry.includes("НКГ")) {

                $mdDialog.show({
                    controller: DialogControllerNewReportYearNCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_year_ncu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });

            } else if (namePeriod.includes("Полугодовой") && nameCountry.includes("НКГ")) {

                $mdDialog.show({
                    controller: DialogControllerNewReportQ,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_q_ncu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });





            } else if (namePeriod.includes("Квартальный") && nameCountry.includes("НКГ")) {

                $mdDialog.show({
                    controller: DialogControllerNewReportQ,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_q_ncu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });





            }else if (namePeriod.includes("Годовой") && nameCountry.includes("РКГ")) {


                $mdDialog.show({
                    controller: DialogControllerNewReportYearRCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_year_rcu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });


            } else if (namePeriod.includes("Полугодовой") && nameCountry.includes("РКГ")) {


                $mdDialog.show({
                    controller: DialogControllerNewReportHalfYearRCU,
                    locals:{data: {allCountrys: $scope.allCountrys, country: $scope.country, nameCountry: $scope.getNameById($scope.country, $scope.allCountrys), period: $scope.period, periodName: $scope.getNameById($scope.period, $scope.allperiod), yearname: $scope.yearname, year: $scope.getNameById($scope.yearname, $scope.allyearname)}},
                    templateUrl: 'components/build_report/dialog_template_new_report_half_rcu.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });


            }









    };




function DialogControllerUpdReportYearRCU($state, $scope, data, UpdReportYearRCU, GetReport, $http) {



    $scope.goTo = function () {

        $mdDialog.hide();
        $state.go("data_intermediate_index");

    };


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

        categorizedByBudgetBisbursementPlanYearTadzhik: data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik,
        categorizedByBudgetBisbursementFactYearTadzhik: data.finstatus.categorizedByBudgetBisbursementFactYearTadzhik,
        categorizedByBalanceYearTadzhik: data.finstatus.categorizedByBalanceYearTadzhik,
        categorizedByBudgetBisbursementPlanYearUzbeck: data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck,
        categorizedByBudgetBisbursementFactYearUzbeck: data.finstatus.categorizedByBudgetBisbursementFactYearUzbeck,
        categorizedByBalanceYearUzbeck: data.finstatus.categorizedByBalanceYearUzbeck,
        rcuPlanYear: data.finstatus.rcuPlanYear,
        rcuFactYear: data.finstatus.rcuFactYear,
        rcuBalanceYear: data.finstatus.rcuBalanceYear






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


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik   = $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactYearTadzhik   = $scope.data.categorizedByBudgetBisbursementFactYearTadzhik;
        $scope.data.finstatus.categorizedByBalanceYearTadzhik   = $scope.data.categorizedByBalanceYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactYearUzbeck   = $scope.data.categorizedByBudgetBisbursementFactYearUzbeck;
        $scope.data.finstatus.categorizedByBalanceYearUzbeck   = $scope.data.categorizedByBalanceYearUzbeck;

        $scope.data.finstatus.rcuPlanYear   = $scope.data.rcuPlanYear;
        $scope.data.finstatus.rcuFactYear   = $scope.data.rcuFactYear;
        $scope.data.finstatus.rcuBalanceYear   = $scope.data.rcuBalanceYear;


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
    };



    $scope.toDocx = function () {



        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();



        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.country + ", " + data.typePeriod);
        $mdDialog.hide();


    };

    $scope.closeDialog = function () {


        $mdDialog.hide();



    };

}



function DialogControllerNewReportYearRCU($state, $scope, data, GetReportFinansialStatusForYearRCU, ReportYearRCUSave, $http, GetTadjickUzbekNCUYear) {


    $scope.goTo = function () {

        $mdDialog.hide();
        $state.go("data_intermediate_index");

    };

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
        finstatus: {},
        rcuPlanYear: 0,
        rcuFactYear: 0,
        rcuBalanceYear: 0
    };



    GetReportFinansialStatusForYearRCU.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {


        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik = obj.categorizedByBudgetBisbursementPlanYearTadzhik;
            $scope.data.categorizedByBudgetBisbursementFactYearTadzhik = obj.categorizedByBudgetBisbursementFactYearTadzhik;
            $scope.data.categorizedByBalanceYearTadzhik = obj.categorizedByBalanceYearTadzhik;
            $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck = obj.categorizedByBudgetBisbursementPlanYearUzbeck;
            $scope.data.categorizedByBudgetBisbursementFactYearUzbeck = obj.categorizedByBudgetBisbursementFactYearUzbeck;
            $scope.data.categorizedByBalanceYearUzbeck = obj.categorizedByBalanceYearUzbeck;


        }
    });


    GetTadjickUzbekNCUYear.get(function (result) {




        $scope.data.NCUTajikistan = result.resultFromDb[0].getTadzhikNCUYear[0].plannedBudget;
        $scope.data.NCUUzbekistan = result.resultFromDb[0].getUzbekNCUYear[0].plannedBudget;



        $scope.data.risks = result.resultFromDb[0].getTadzhikNCUYear[0].risks[0];
        $scope.data.lessonsLearned = result.resultFromDb[0].getTadzhikNCUYear[0].lessonsLearned[0];
        $scope.data.recommendations = result.resultFromDb[0].getTadzhikNCUYear[0].recommendations[0];
        $scope.data.projectPerformance = result.resultFromDb[0].getTadzhikNCUYear[0].projectPerformanceComments[0];


        $scope.data.risks += "\n" + result.resultFromDb[0].getUzbekNCUYear[0].risks[0];
        $scope.data.lessonsLearned +=  "\n" + result.resultFromDb[0].getUzbekNCUYear[0].lessonsLearned[0];
        $scope.data.recommendations += "\n" + result.resultFromDb[0].getUzbekNCUYear[0].recommendations[0];
        $scope.data.projectPerformance += "\n" + result.resultFromDb[0].getUzbekNCUYear[0].projectPerformanceComments[0];


    });




    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik   = $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactYearTadzhik   = $scope.data.categorizedByBudgetBisbursementFactYearTadzhik;
        $scope.data.finstatus.categorizedByBalanceYearTadzhik   = $scope.data.categorizedByBalanceYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactYearUzbeck   = $scope.data.categorizedByBudgetBisbursementFactYearUzbeck;
        $scope.data.finstatus.categorizedByBalanceYearUzbeck   = $scope.data.categorizedByBalanceYearUzbeck;

        $scope.data.finstatus.rcuPlanYear   = $scope.data.rcuPlanYear;
        $scope.data.finstatus.rcuFactYear   = $scope.data.rcuFactYear;
        $scope.data.finstatus.rcuBalanceYear   = $scope.data.rcuBalanceYear;


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


    $scope.toDocx = function () {



        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();


        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.nameCountry + ", " + data.periodName);

        $mdDialog.hide();

    };


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

        categorizedByBudgetBisbursementPlanYearTadzhik: data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik,
        categorizedByBalanceYearTadzhik: data.finstatus.categorizedByBalanceYearTadzhik,
        categorizedByBudgetBisbursementPlanHalfYearTadzhik: data.finstatus.categorizedByBudgetBisbursementPlanHalfYearTadzhik,
        categorizedByBudgetBisbursementFactHalfYearTadzhik: data.finstatus.categorizedByBudgetBisbursementFactHalfYearTadzhik,
        categorizedByBudgetBisbursementPlanYearUzbeck: data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck,
        categorizedByBalanceYearUzbeck: data.finstatus.categorizedByBalanceYearUzbeck,
        categorizedByBudgetBisbursementPlanHalfYearUzbeck: data.finstatus.categorizedByBudgetBisbursementPlanHalfYearUzbeck,
        categorizedByBudgetBisbursementFactHalfYearUzbeck: data.finstatus.categorizedByBudgetBisbursementFactHalfYearUzbeck,
        rcuPlanYear: data.finstatus.rcuPlanYear,
        rcuPlanHalfYear: data.finstatus.rcuPlanHalfYear,
        rcuFactHalfYear: data.finstatus.rcuFactHalfYear,
        rcuBalanceYear: data.finstatus.rcuBalanceYear







    };




    $scope.print = function () {



        $("#printableArea").print();


    };


    $scope.toDocx = function () {


        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();


        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.country + ", " + data.typePeriod);

        $mdDialog.hide();


    };




    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik  = $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik;
        $scope.data.finstatus.categorizedByBalanceYearTadzhik   = $scope.data.categorizedByBalanceYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanHalfYearTadzhik   = $scope.data.categorizedByBudgetBisbursementPlanHalfYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactHalfYearTadzhik   = $scope.data.categorizedByBudgetBisbursementFactHalfYearTadzhik;


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck;
        $scope.data.finstatus.categorizedByBalanceYearUzbeck   = $scope.data.categorizedByBalanceYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanHalfYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanHalfYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactHalfYearUzbeck   = $scope.data.categorizedByBudgetBisbursementFactHalfYearUzbeck;

        $scope.data.finstatus.rcuPlanYear   = $scope.data.rcuPlanYear;
        $scope.data.finstatus.rcuPlanHalfYear   = $scope.data.rcuPlanHalfYear;
        $scope.data.finstatus.rcuFactHalfYear   = $scope.data.rcuFactHalfYear;
        $scope.data.finstatus.rcuBalanceYear   = $scope.data.rcuBalanceYear;


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




function DialogControllerNewReportHalfYearRCU($scope, data, GetReportFinansialStatusForHalfYearRCU, ReportHalfYearRCUSave, GetReport, $http) {

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





    GetReportFinansialStatusForHalfYearRCU.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {





        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik = obj.categorizedByBudgetBisbursementPlanYearTadzhik;
            $scope.data.categorizedByBalanceYearTadzhik = obj.categorizedByBalanceYearTadzhik;
            $scope.data.categorizedByBudgetBisbursementPlanHalfYearTadzhik = obj.categorizedByBudgetBisbursementPlanHalfYearTadzhik;
            $scope.data.categorizedByBudgetBisbursementFactHalfYearTadzhik = obj.categorizedByBudgetBisbursementFactHalfYearTadzhik;
            $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck = obj.categorizedByBudgetBisbursementPlanYearUzbeck;
            $scope.data.categorizedByBalanceYearUzbeck = obj.categorizedByBalanceYearUzbeck;
            $scope.data.categorizedByBudgetBisbursementPlanHalfYearUzbeck = obj.categorizedByBudgetBisbursementPlanHalfYearUzbeck;
            $scope.data.categorizedByBudgetBisbursementFactHalfYearUzbeck = obj.categorizedByBudgetBisbursementFactHalfYearUzbeck;

        }



        try {
            $scope.data.NCUTajikistan = entry.resultFromDb[0].PlanForNextPeriodTadzhik[0].totalPlan;
       }catch (e) {
            $scope.data.NCUTajikistan = 0;

        }



      try {
          $scope.data.NCUUzbekistan = entry.resultFromDb[0].PlanForNextPeriodUzbek[0].totalPlan;

      }catch (e) {
          $scope.data.NCUUzbekistan = 0;
      }




    });



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearTadzhik  = $scope.data.categorizedByBudgetBisbursementPlanYearTadzhik;
        $scope.data.finstatus.categorizedByBalanceYearTadzhik   = $scope.data.categorizedByBalanceYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanHalfYearTadzhik   = $scope.data.categorizedByBudgetBisbursementPlanHalfYearTadzhik;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactHalfYearTadzhik   = $scope.data.categorizedByBudgetBisbursementFactHalfYearTadzhik;


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanYearUzbeck;
        $scope.data.finstatus.categorizedByBalanceYearUzbeck   = $scope.data.categorizedByBalanceYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementPlanHalfYearUzbeck   = $scope.data.categorizedByBudgetBisbursementPlanHalfYearUzbeck;
        $scope.data.finstatus.categorizedByBudgetBisbursementFactHalfYearUzbeck   = $scope.data.categorizedByBudgetBisbursementFactHalfYearUzbeck;

        $scope.data.finstatus.rcuPlanYear   = $scope.data.rcuPlanYear;
        $scope.data.finstatus.rcuPlanHalfYear   = $scope.data.rcuPlanHalfYear;
        $scope.data.finstatus.rcuFactHalfYear   = $scope.data.rcuFactHalfYear;
        $scope.data.finstatus.rcuBalanceYear   = $scope.data.rcuBalanceYear;


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












    $scope.toDocx = function () {


        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();



        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.nameCountry + ", " + data.periodName);


        $mdDialog.hide();

    };






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


        categorizedByBudgetBisbursementPlanYear: data.finstatus.categorizedByBudgetBisbursementPlanYear,
        categorizedByBalanceYear: data.finstatus.categorizedByBalanceYear,
        categorizedByFirstQuarter: data.finstatus.categorizedByFirstQuarter,
        categorizedBySecondQuarter: data.finstatus.categorizedBySecondQuarter,
        categorizedByThirdQuarter: data.finstatus.categorizedByThirdQuarter,
        categorizedByForthQuarter: data.finstatus.categorizedByForthQuarter

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



    $scope.toDocx = function () {


        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();


        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.country + ", " + data.typePeriod);


        $mdDialog.hide();

    };



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



    };







    GetReportFinansialStatusYearNCU.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function(entry) {




        for (let obj of entry.resultFromDb) {
            $scope.data.categorizedByBudgetBisbursementPlanYear = obj.categorizedByBudgetBisbursementPlanYear;
            $scope.data.categorizedByBalanceYear = obj.categorizedByBalanceYear;
            $scope.data.categorizedByFirstQuarter = obj.categorizedByFirstQuarter;


            $scope.data.categorizedBySecondQuarter = obj.categorizedBySecondQuarter;


            $scope.data.categorizedByThirdQuarter = obj.categorizedByThirdQuarter;


            $scope.data.categorizedByForthQuarter = obj.categorizedByForthQuarter;


        }
    });





    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        $scope.data.finstatus.categorizedByBudgetBisbursementPlanYear   = $scope.data.categorizedByBudgetBisbursementPlanYear;
        $scope.data.finstatus.categorizedByBalanceYear   = $scope.data.categorizedByBalanceYear;
        $scope.data.finstatus.categorizedByFirstQuarter   = $scope.data.categorizedByFirstQuarter;
        $scope.data.finstatus.categorizedBySecondQuarter   = $scope.data.categorizedBySecondQuarter;
        $scope.data.finstatus.categorizedByThirdQuarter   = $scope.data.categorizedByThirdQuarter;
        $scope.data.finstatus.categorizedByForthQuarter   = $scope.data.categorizedByForthQuarter;



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




    $scope.toDocx = function () {

        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();



        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.nameCountry + ", " + data.periodName);


        $mdDialog.hide();

    };



    $scope.print = function () {



        $("#printableArea").print();


    };

    $scope.closeDialog = function () {


        $mdDialog.hide();



    };


}


function DialogControllerUpdReportQNCU($scope, data, UpdReport) {



    $scope.data = {



        id: data._id,
        typePeriod: data.typePeriod,
        year: data.year,

        country: data.country,

        comments: data.comments,


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


    $scope.toDocx = function () {


        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();



        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.country + ", " + data.typePeriod);


        $mdDialog.hide();


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


function DialogControllerNewReportQ($scope, data, GetGrowPotencial, GetReportCredits, GetReportGrm, GetReportFinansialStatus, AddNewReport, GetGrowPotencialNewVersion) {



    /*
    Процент одного числа от другого
     */
    $scope.calculatePercent = function (numAllComplaint, numComplaintWithYes) {

        let result = numComplaintWithYes * 100 / numAllComplaint;
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
            $scope.data.countCommonOk = obj.countCommonOk;
            $scope.data.countCommonOkWomen = obj.countCommonOkWomen;


            $scope.data.countSatisfaction = obj.countSatisfaction;
            $scope.data.countSatisfactionWomen = obj.countSatisfactionWomen;


        }


       try {

            const persentTable = {

                1: 20,
                2: 40,
                3: 60,
                4: 80,
                5: 100


            };



           $scope.data.countSatisfactionWomen = persentTable[$scope.data.countSatisfactionWomen[0].all_countSatisfaction_women_yes];
           $scope.data.countSatisfaction = persentTable[$scope.data.countSatisfaction[0].all_countSatisfaction_yes];




        }catch (e) {



           $scope.data.countSatisfaction = $scope.data.countCommonOk[0].avg;
           $scope.data.countSatisfactionWomen = $scope.data.countCommonOkWomen[0].avg;



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


                $scope.data.satisfiedComplaintsInPercentage = obj.categorizedBySatisfiedInPercent[0].percent;

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



    $scope.toDocx = function () {

        $(".for__label__doc").removeClass("hidden");
        $(".for__doc__word").remove();
        $(".for__icon__remove__in__doc").remove();





        var content = '<!DOCTYPE html>' + $("#printableArea").html();


        var converted = htmlDocx.asBlob(content);
        saveAs(converted, data.nameCountry + ", " + data.periodName);

        $mdDialog.hide();

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




$scope.excel = function () {

    $scope.tableID = "build_report";
    $scope.titleSheet = "Сформировать отчёт (квартальный, полугодовой, годовой)";

    $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet + "&lang=" + $translate.use() + "&sessionToken=" + localStorage.getItem('sessionToken'), '_blank');




}


});

