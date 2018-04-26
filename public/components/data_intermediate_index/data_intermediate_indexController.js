/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function (GetReportSumGenderEvent, $scope, $window, GetYearName, GetReportAllForms, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {



    $scope.data = {};



    $scope.arrAllArr = [];
    $scope.arrAllArrNew = [];

    $scope.arrYear = [2016, 2017, 2018, 2019, 2020, 2021];









    /*
  Поиск 100 процентов
   */
    $scope.calculatePercent = function (numberBase, value) {


        if (value === 0) {

            return 0;

        } else {


            let result = value * 100 / numberBase;
            return Number.parseInt(result.toFixed(0));

        }


    };


    $scope.generateReport = function (yearname) {


        let arrAllData = [];

        GetReportAllForms.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




            let numberBase = entry.resultFromDb[0].getAllCount.length === 0 ? 0 : entry.resultFromDb[0].getAllCount[0].countAll;
            let value = entry.resultFromDb[0].getAllGoodTestResult.length === 0 ? 0 : entry.resultFromDb[0].getAllGoodTestResult[0].countAll;

            $scope.data.allFormPercent = $scope.calculatePercent(numberBase, value);


            arrAllData.push({allFormPercent: $scope.data.allFormPercent});



        });

        GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                $scope.data.countProgramm = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_programm;


              arrAllData.push({countProgramm: $scope.data.countProgramm});





        });



        GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




                $scope.data.finInvest = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_invest;


               arrAllData.push({finInvest: $scope.data.finInvest});





        });



        GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


               $scope.data.mobileResurs = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_mobileresurs.$numberDecimal;


                arrAllData.push({mobileResurs: Number.parseFloat($scope.data.mobileResurs)});






        });



       GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                $scope.data.countPlatform = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_platform;


                arrAllData.push({countPlatform: $scope.data.countPlatform});





        });


         GetReportCountBenificiarProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



            if (entry.resultFromDb.length !== 0) {



                $scope.data.countComponent1 = entry.resultFromDb[1][0].allEventSumPeople.length === 0 ? 0 : entry.resultFromDb[1][0].allEventSumPeople[0].all_countPeopleEventCommon;

                $scope.data.countComponent2 = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_benificiar;

                $scope.data.countBenificiarProjectTj = entry.resultFromDb[0].categByTj.length === 0 ? 0 : entry.resultFromDb[0].categByTj[0].all_benificiar;
                $scope.data.countBenificiarProjectUz = entry.resultFromDb[0].categByUz.length === 0 ? 0 : entry.resultFromDb[0].categByUz[0].all_benificiar;





                $scope.sumComponents = $scope.data.countComponent1 + $scope.data.countComponent2;





                $scope.sumWomen = entry.resultFromDb[1][0].allEventSumWomen.length === 0 ? 0 : entry.resultFromDb[1][0].allEventSumWomen[0].all_countWomanEventCommon + entry.resultFromDb[0].categByAllWomen.length === 0 ? 0 : entry.resultFromDb[0].categByAllWomen[0].all_benificiar;


                $scope.data.percentSum = $scope.calculatePercent($scope.sumComponents, $scope.sumWomen);


                $scope.data.percentC1 = $scope.calculatePercent($scope.data.countComponent1, entry.resultFromDb[1][0].allEventSumWomen.length === 0 ? 0 : entry.resultFromDb[1][0].allEventSumWomen[0].all_countWomanEventCommon);

                $scope.data.percentC2 = $scope.calculatePercent($scope.data.countComponent2, entry.resultFromDb[0].categByAllWomen.length === 0 ? 0 : entry.resultFromDb[0].categByAllWomen[0].all_benificiar);

                $scope.data.TjPercentWomen = $scope.calculatePercent($scope.data.countBenificiarProjectTj, entry.resultFromDb[0].categByTjWomen.length === 0 ? 0 : entry.resultFromDb[0].categByTjWomen[0].all_benificiar);

                $scope.data.UzPercentWomen = $scope.calculatePercent($scope.data.countBenificiarProjectUz, entry.resultFromDb[0].categByUzWomen.length === 0 ? 0 : entry.resultFromDb[0].categByUzWomen[0].all_benificiar);



                arrAllData.push({sumComponents: $scope.sumComponents});
                arrAllData.push({countComponent1: $scope.data.countComponent1});
                arrAllData.push({countComponent2: $scope.data.countComponent2});
                arrAllData.push({countBenificiarProjectTj: $scope.data.countBenificiarProjectTj});
                arrAllData.push({countBenificiarProjectUz: $scope.data.countBenificiarProjectUz});


                arrAllData.push({percentSum: $scope.data.percentSum});
                arrAllData.push({percentC1: $scope.data.percentC1});
                arrAllData.push({percentC2: $scope.data.percentC2});
                arrAllData.push({TjPercentWomen: $scope.data.TjPercentWomen});
                arrAllData.push({UzPercentWomen: $scope.data.UzPercentWomen});






            }




        });



       GetReportSumGAProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


            if (entry.resultFromDb.length !== 0) {

                $scope.data.areaGAProject = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_gaproject;
                $scope.data.areaGAProjectTj = entry.resultFromDb[0].categByTj.length === 0 ? 0 : entry.resultFromDb[0].categByTj[0].all_gaproject;
                $scope.data.areaGAProjectUz = entry.resultFromDb[0].categByUz.length === 0 ? 0 : entry.resultFromDb[0].categByUz[0].all_gaproject;


                arrAllData.push({areaGAProject: $scope.data.areaGAProject});
                arrAllData.push({areaGAProjectTj: $scope.data.areaGAProjectTj});
                arrAllData.push({areaGAProjectUz: $scope.data.areaGAProjectUz});


            }



        });


        GetReportSumGenderEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {





                $scope.data.sumgenderevent = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].countAll;


                arrAllData.push({sumgenderevent: $scope.data.sumgenderevent});






        });






         GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




            if (entry.resultFromDb.length !== 0) {

                $scope.data.countGRM = $scope.calculatePercent(entry.resultFromDb[0].categorizedByAllCompletegrm.length === 0 ? 0 : entry.resultFromDb[0].categorizedByAllCompletegrm[0].all_completegrm, entry.resultFromDb[0].categorizedByWithTimeOfSatisfaction.length === 0 ? 0 : entry.resultFromDb[0].categorizedByWithTimeOfSatisfaction[0].all_completegrmWithTimeOfSatisfaction);
                arrAllData.push({countGRM: $scope.data.countGRM});


            }


        });





        $scope.arrAllArr.push(arrAllData);



    };

    for (const itemYear of $scope.arrYear) {

        $scope.generateReport(itemYear);



    }


    setTimeout(function () {
        $scope.arrAllArrNew = $scope.arrAllArr;
    }, 1500);







    $scope.generateNewReport = function () {


        $scope.arrAllArr = [];
        for (const itemYear of $scope.arrYear) {


            $scope.generateReport(itemYear);


        }


    };







    $scope.print = function () {
        $("#printmatrix").css("visibility", "visible");
        $("#printmatrix").print();
        $("#printmatrix").css("visibility", "collapse");
    };






    $scope.excel = function () {


        let sheetName = "Матрица результатов";
        let fileName = "Матрица результатов и их мониторинга.xlsx";






        var allHtmlTable = document.getElementById('printmatrix');
        var workbook = XLSX.utils.table_to_book(allHtmlTable);


        workbook["SheetNames"][0] = sheetName;
        workbook.Sheets[sheetName] = workbook.Sheets["Sheet1"];
        delete workbook.Sheets["Sheet1"];




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

