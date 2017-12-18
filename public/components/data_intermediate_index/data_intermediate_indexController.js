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
    countClimateNetworks: 0,
    genderFromClimate: 0,
    countBenificiarProject: 0,
    countBenificiarProjectWomen: 0,
    countBenificiarProjectInPersent: 0,
    areaGAProject: 0,
    countGRM: 0,
    countTrasactionOnProject: 0

};


    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[0]._id;


    });


    /*
    Считаем процент, на основе 5 бальной оценки в тесте.
     */
    $scope.calculatePercent = function (num) {

        let result = num*100/5;
        return result.toFixed(0);
    };



    /*
    Считаем процент, для бенефициаров, включая женщин, за базу взяли 1 000 000.
     */
    $scope.calculatePercentForcountBenificiarProject = function (num) {

        let result = num*100/1000000;
        return result.toFixed(3);
    };


    /*
    Процент одного числа от другого
     */
    $scope.calculatePercentNumComplaintWithYes = function (numAllComplaint, numComplaintWithYes) {

        let result = numComplaintWithYes * 100 / numAllComplaint;
        return result.toFixed(0);
    };


    $scope.generateReport = function () {

        //10 показателей


        GetReportUsersSatisfied.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {




                $scope.data.persentUsersSatisfied = $scope.calculatePercent(entry.resultFromDb[0].average);
                $scope.data.countFormIT = $scope.calculatePercent(entry.resultFromDb[0].average);


            } else {

                $scope.data.persentUsersSatisfied = 0;
                $scope.data.countFormIT = 0;

            }




        });

        GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {


                $scope.data.countProgramm = entry.resultFromDb[0].all_programm;


            } else {

                $scope.data.countProgramm = 0;

            }



        });



        GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {


                $scope.data.finInvest = entry.resultFromDb[0].all_invest;



            } else {

                $scope.data.finInvest = 0;


            }




        });



        GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {

                $scope.data.mobileResurs = entry.resultFromDb[0].all_mobileresurs;



            } else {

                $scope.data.mobileResurs = 0;

            }




        });



        GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {

            if (entry.resultFromDb.length !== 0) {


                $scope.data.countPlatform = entry.resultFromDb[0].all_platform;


            } else {

                $scope.data.countPlatform = 0;

            }




        });


        GetReportCountBenificiarProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {


                $scope.data.countBenificiarProject = entry.resultFromDb[0].all_benificiar;
                $scope.data.countBenificiarProjectInPersent = $scope.calculatePercentForcountBenificiarProject(entry.resultFromDb[0].all_benificiar);


            } else {

                $scope.data.countBenificiarProject = 0;

            }




        });



        GetReportSumGAProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {

                $scope.data.areaGAProject = entry.resultFromDb[0].all_gaproject;


            } else {

                $scope.data.areaGAProject = 0;

            }



        });


        GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {




            if (entry.resultFromDb.length !== 0) {

                $scope.data.countGRM = $scope.calculatePercentNumComplaintWithYes(entry.resultFromDb[0].categorizedByAllCompletegrm[0].all_completegrm, entry.resultFromDb[0].categorizedByWithYes[0].all_completegrmWithYes);


            } else {

                $scope.data.countGRM = 0;
            }



        });






    };



});

