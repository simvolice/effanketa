/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function ($scope, GetYearName, GetReportUsersSatisfied, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {

$scope.data = {

    persentUsersSatisfied: 0,
    countProgramm: 0,
    finInvest: 0,
    mobileResurs: 0,
    countFormIT: 0,
    countCivilService: 0,
    countPlatform: 0,
    countBenificiarProject: 0,
    areaGAProject: 0,
    countGRM: 0

};


    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[0]._id;


    });



    $scope.generateReport = function () {


        GetReportUsersSatisfied.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.persentUsersSatisfied = entry.resultFromDb[0].average;
            $scope.data.countFormIT = entry.resultFromDb[0].average;


        });

        GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.countProgramm = entry.resultFromDb[0].all_programm;


        });



        GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.finInvest = entry.resultFromDb[0].all_invest;


        });



        GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.mobileResurs = entry.resultFromDb[0].all_mobileresurs;


        });



        GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.countPlatform = entry.resultFromDb[0].all_platform;


        });


        GetReportCountBenificiarProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.countBenificiarProject = entry.resultFromDb[0].all_benificiar;


        });



        GetReportSumGAProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.areaGAProject = entry.resultFromDb[0].all_gaproject;


        });


        GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            $scope.data.countGRM = entry.resultFromDb[0].all_completegrm;


        });






    };



});

