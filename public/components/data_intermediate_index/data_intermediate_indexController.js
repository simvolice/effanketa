/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function ($scope, $window, GetYearName, GetReportUsersSatisfied, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {

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


                $scope.data.countBenificiarProject = entry.resultFromDb[0].categByAll[0].all_benificiar;
                $scope.data.countBenificiarProjectTj = entry.resultFromDb[0].categByTj[0].all_benificiar;
                $scope.data.countBenificiarProjectUz = entry.resultFromDb[0].categByUz[0].all_benificiar;


            } else {

                $scope.data.countBenificiarProject = 0;
                $scope.data.countBenificiarProjectTj = 0;
                $scope.data.countBenificiarProjectUz = 0;

            }




        });



        GetReportSumGAProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {

                $scope.data.areaGAProject = entry.resultFromDb[0].categByAll[0].all_gaproject;
                $scope.data.areaGAProjectTj = entry.resultFromDb[0].categByTj[0].all_gaproject;
                $scope.data.areaGAProjectUz = entry.resultFromDb[0].categByUz[0].all_gaproject;


            } else {

                $scope.data.areaGAProject = 0;
                $scope.data.areaGAProjectTj = 0;
                $scope.data.areaGAProjectUz = 0;

            }



        });


        GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function(entry) {




            if (entry.resultFromDb.length !== 0) {

                $scope.data.countGRM = $scope.calculatePercentNumComplaintWithYes(entry.resultFromDb[0].categorizedByAllCompletegrm[0].all_completegrm, entry.resultFromDb[0].categorizedByWithYes[0].all_completegrmWithYes);
                $scope.data.countGRMTj = $scope.calculatePercentNumComplaintWithYes(entry.resultFromDb[0].categorizedByAllCompletegrmTj[0].all_completegrm, entry.resultFromDb[0].categorizedByWithYesTj[0].all_completegrmWithYes);
                $scope.data.countGRMUz = $scope.calculatePercentNumComplaintWithYes(entry.resultFromDb[0].categorizedByAllCompletegrmUz[0].all_completegrm, entry.resultFromDb[0].categorizedByWithYesUz[0].all_completegrmWithYes);


            } else {

                $scope.data.countGRM = 0;
                $scope.data.countGRMTj = 0;
                $scope.data.countGRMUz = 0;
            }



        });






    };




    $scope.print = function () {
        $window.print();
    };

    $scope.excel = function () {


        let sheetName = "Тестовый лист";
        let fileName = "report.xlsx";






        var allHtmlTable = document.getElementById('tableau');
        var workbook = XLSX.utils.table_to_book(allHtmlTable);


        workbook["SheetNames"][0] = sheetName;
        workbook.Sheets[sheetName] = workbook.Sheets["Sheet1"];
        delete workbook.Sheets["Sheet1"];


        console.log(workbook);


        var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};

        var wbout = XLSX.write(workbook, wopts);

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), fileName);





    };


});

