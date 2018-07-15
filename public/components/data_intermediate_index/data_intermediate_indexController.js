/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function ($timeout, GetReportSumGenderEvent, $scope, $window, GetYearName, GetReportAllForms, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {



    $scope.data = {};



    $scope.arrAllForms = [];
    $scope.arrAllCountProgramm = [];
    $scope.arrAllCountRegeonalInvest = [];
    $scope.arrAllSumMobileAmount = [];
    $scope.arrAllCountPlatform = [];
    $scope.arrAllCountBenificiarProject = [];
    $scope.arrAllSumGAProject = [];
    $scope.arrAllSumGenderEvent = [];
    $scope.arrAllCountCompleteGRM = [];

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


        $scope.arrAllForms.push(arrAllData);



    };

    $scope.generateReportCountProgramm = function (yearname) {


        let arrAllData = [];


          GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countProgramm = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_programm;



                arrAllData.push({countProgramm: $scope.data.countProgramm});





          });




        $scope.arrAllCountProgramm.push(arrAllData);



    };


    $scope.generateReportCountRegeonalInvest = function (yearname) {


        let arrAllData = [];






         GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




                   $scope.data.finInvest = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_invest;


                  arrAllData.push({finInvest: $scope.data.finInvest});





           });




        $scope.arrAllCountRegeonalInvest.push(arrAllData);



    };





    $scope.generateReportSumMobileAmount = function (yearname) {


        let arrAllData = [];








          GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


                $scope.data.mobileResurs = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_mobileresurs.$numberDecimal;


                 arrAllData.push({mobileResurs: Number.parseFloat($scope.data.mobileResurs)});






         });




        $scope.arrAllSumMobileAmount.push(arrAllData);



    };






    $scope.generateReportCountPlatform = function (yearname) {


        let arrAllData = [];




          GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countPlatform = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_platform;


                  arrAllData.push({countPlatform: $scope.data.countPlatform});





          });



        $scope.arrAllCountPlatform.push(arrAllData);



    };



    $scope.generateReportCountBenificiarProject = function (yearname) {


        let arrAllData = [];






         GetReportCountBenificiarProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



            if (entry.resultFromDb.length !== 0) {



                $scope.data.countComponent1 = entry.resultFromDb[1][0].allEventSumPeople.length === 0 ? 0 : entry.resultFromDb[1][0].allEventSumPeople[0].all_countPeopleEventCommon;

                $scope.data.countComponent2 = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_benificiar;

                $scope.data.countBenificiarProjectTj = entry.resultFromDb[0].categByTj.length === 0 ? 0 : entry.resultFromDb[0].categByTj[0].all_benificiar;
                $scope.data.countBenificiarProjectUz = entry.resultFromDb[0].categByUz.length === 0 ? 0 : entry.resultFromDb[0].categByUz[0].all_benificiar;





                $scope.sumComponents = $scope.data.countComponent1 + $scope.data.countComponent2;



                 let categByAllWomenAll_benificiar = entry.resultFromDb[0].categByAllWomen.length === 0 ? 0 : entry.resultFromDb[0].categByAllWomen[0].all_benificiar;


                $scope.sumWomen = entry.resultFromDb[1][0].allEventSumWomen.length === 0 ? 0 : entry.resultFromDb[1][0].allEventSumWomen[0].all_countWomanEventCommon + categByAllWomenAll_benificiar;


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




        $scope.arrAllCountBenificiarProject.push(arrAllData);



    };




    $scope.generateReportSumGAProject = function (yearname) {


        let arrAllData = [];





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



        $scope.arrAllSumGAProject.push(arrAllData);



    };





    $scope.generateReportSumGenderEvent = function (yearname) {


        let arrAllData = [];







          GetReportSumGenderEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {





                  $scope.data.sumgenderevent = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].countAll;


                  arrAllData.push({sumgenderevent: $scope.data.sumgenderevent});






          });






        $scope.arrAllSumGenderEvent.push(arrAllData);



    };




    $scope.generateReportCountCompleteGRM = function (yearname) {


        let arrAllData = [];




         GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




             if (entry.resultFromDb.length !== 0) {

                 $scope.data.countGRM = entry.resultFromDb[0].categorizedByAllCompletegrmAVG[0].percent;
                 $scope.data.countGRM_TJ = entry.resultFromDb[0].categorizedByAllCompletegrmAVG_TJ[0].percent;
                 $scope.data.countGRM_UZ = entry.resultFromDb[0].categorizedByAllCompletegrmAVG_UZ[0].percent;





                 arrAllData.push({

                     countGRM: $scope.data.countGRM,
                     countGRM_TJ: $scope.data.countGRM_TJ,
                     countGRM_UZ: $scope.data.countGRM_UZ,


                 });


             }


         });





        $scope.arrAllCountCompleteGRM.push(arrAllData);



    };




    for (const itemYear of $scope.arrYear) {


        $scope.generateReport(itemYear);
        $scope.generateReportCountProgramm(itemYear);
        $scope.generateReportCountRegeonalInvest(itemYear);
        $scope.generateReportSumMobileAmount(itemYear);
        $scope.generateReportCountPlatform(itemYear);
        $scope.generateReportCountBenificiarProject(itemYear);
        $scope.generateReportSumGAProject(itemYear);
        $scope.generateReportSumGenderEvent(itemYear);
        $scope.generateReportCountCompleteGRM(itemYear);


    }



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

