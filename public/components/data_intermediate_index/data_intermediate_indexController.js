/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function (GenerateDocxReport, GetNewVal, InsertNewVal, $timeout, GetReportSumGenderEvent, $scope, $window, GetYearName, GetReportAllForms, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {



    $scope.data = {

        country: "матрица",
        typePeriod: "РЕЗУЛЬТАТОВ",
        year: "И ИХ МОНИТОРИНГА"

    };


    GetNewVal.get(function(entry) {




        if (entry.hasOwnProperty("resultFromDb")) {
            $scope.data.ipr112016 = entry.resultFromDb.ipr112016;
            $scope.data.ipr112017 = entry.resultFromDb.ipr112017;
            $scope.data.ipr112018 = entry.resultFromDb.ipr112018;
            $scope.data.ipr112019 = entry.resultFromDb.ipr112019;
            $scope.data.ipr112020 = entry.resultFromDb.ipr112020;
            $scope.data.ipr112021 = entry.resultFromDb.ipr112021;
            $scope.data.ipr122016 = entry.resultFromDb.ipr122016;
            $scope.data.ipr122017 = entry.resultFromDb.ipr122017;
            $scope.data.ipr122018 = entry.resultFromDb.ipr122018;
            $scope.data.ipr122019 = entry.resultFromDb.ipr122019;
            $scope.data.ipr122020 = entry.resultFromDb.ipr122020;
            $scope.data.ipr122021 = entry.resultFromDb.ipr122021;
        } else {
            $scope.data.ipr112016 = 0;
            $scope.data.ipr112017 = 0;
            $scope.data.ipr112018 = 0;
            $scope.data.ipr112019 = 0;
            $scope.data.ipr112020 = 0;
            $scope.data.ipr112021 = 0;
            $scope.data.ipr122016 = 0;
            $scope.data.ipr122017 = 0;
            $scope.data.ipr122018 = 0;
            $scope.data.ipr122019 = 0;
            $scope.data.ipr122020 = 0;
            $scope.data.ipr122021 = 0;

        }

    });



    $scope.createNewVal = function (event) {
        if(event.keyCode === 13) {

            InsertNewVal.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );

            });

        }
    };

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




    $scope.objResult = {};





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

    let summVal = 0;

    $scope.generateReport = function (yearname) {


        let arrAllData = [];


        GetReportAllForms.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


            const persentTable = {

                0: 0,
                1: 20,
                2: 40,
                3: 60,
                4: 80,
                5: 100


            };






            if (entry.resultFromDb[0].getAllGoodTestResult.length === 0) {
                $scope.data.allFormPercent = entry.resultFromDb[0].countCommonOk.length === 0 ? 0 : entry.resultFromDb[0].countCommonOk[0].avg.toFixed(0);


            } else {

                $scope.data.allFormPercent = persentTable[entry.resultFromDb[0].getAllGoodTestResult[0].all_countSatisfaction_yes];

            }


            summVal += parseInt($scope.data.allFormPercent);
            arrAllData.push({allFormPercent: parseInt($scope.data.allFormPercent)});


            if (yearname === 2021) {

                $scope.objResult["allFormPercent" + yearname] = summVal;

            } else {

                $scope.objResult["allFormPercent" + yearname] = parseInt($scope.data.allFormPercent);

            }



        });


        $scope.arrAllForms.push(arrAllData);



    };

    let summValcountProgramm = 0;

    $scope.generateReportCountProgramm = function (yearname) {


        let arrAllData = [];


          GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countProgramm = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_programm;


              summValcountProgramm += $scope.data.countProgramm;
                arrAllData.push({countProgramm: $scope.data.countProgramm});

              if (yearname === 2021) {

                  $scope.objResult["countProgramm" + yearname] = summValcountProgramm;

              } else {

                  $scope.objResult["countProgramm" + yearname] = $scope.data.countProgramm;

              }



          });




        $scope.arrAllCountProgramm.push(arrAllData);



    };

    let summValfinInvest = 0;
    $scope.generateReportCountRegeonalInvest = function (yearname) {


        let arrAllData = [];






         GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




                   $scope.data.finInvest = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_invest;


                   summValfinInvest += $scope.data.finInvest;

                   arrAllData.push({finInvest: $scope.data.finInvest});


             if (yearname === 2021) {

                 $scope.objResult["finInvest" + yearname] = summValfinInvest;

             } else {

                 $scope.objResult["finInvest" + yearname] = $scope.data.finInvest;

             }




           });




        $scope.arrAllCountRegeonalInvest.push(arrAllData);



    };



    let summValmobileResurs = 0;

    $scope.generateReportSumMobileAmount = function (yearname) {


        let arrAllData = [];








          GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


                $scope.data.mobileResurs = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_mobileresurs.$numberDecimal;


                 arrAllData.push({mobileResurs: Number.parseFloat($scope.data.mobileResurs)});

              summValmobileResurs += $scope.data.mobileResurs;

              if (yearname === 2021) {

                  $scope.objResult["mobileResurs" + yearname] = summValmobileResurs;

              } else {

                  $scope.objResult["mobileResurs" + yearname] = $scope.data.mobileResurs;

              }



         });




        $scope.arrAllSumMobileAmount.push(arrAllData);



    };





    let summValcountPlatform = 0;
    $scope.generateReportCountPlatform = function (yearname) {


        let arrAllData = [];




          GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countPlatform = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_platform;


                  arrAllData.push({countPlatform: $scope.data.countPlatform});

              summValcountPlatform += $scope.data.countPlatform;

              if (yearname === 2021) {

                  $scope.objResult["countPlatform" + yearname] = summValcountPlatform;

              } else {

                  $scope.objResult["countPlatform" + yearname] = $scope.data.countPlatform;

              }

          });



        $scope.arrAllCountPlatform.push(arrAllData);



    };


   let summValsumComponents = 0;
   let summValcountComponent1 = 0;
   let summValcountComponent2 = 0;
   let summValcountBenificiarProjectTj = 0;
   let summValcountBenificiarProjectUz = 0;
   let summValpercentSum = 0;
   let summValpercentC1 = 0;
   let summValpercentC2 = 0;
   let summValTjPercentWomen = 0;
   let summValUzPercentWomen = 0;

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




                summValsumComponents += $scope.sumComponents;
                summValcountComponent1 += $scope.data.countComponent1;
                summValcountComponent2 += $scope.data.countComponent2;
                summValcountBenificiarProjectTj += $scope.data.countBenificiarProjectTj;
                summValcountBenificiarProjectUz += $scope.data.countBenificiarProjectUz;
                summValpercentSum += $scope.data.percentSum;
                summValpercentC1 += $scope.data.percentC1;
                summValpercentC2 += $scope.data.percentC2;
                summValTjPercentWomen += $scope.data.TjPercentWomen;
                summValUzPercentWomen += $scope.data.UzPercentWomen;

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




                if (yearname === 2021) {


                    $scope.objResult["sumComponents" + yearname] = summValsumComponents;
                    $scope.objResult["countComponent1" + yearname] = summValcountComponent1;
                    $scope.objResult["countComponent2" + yearname] = summValcountComponent2;
                    $scope.objResult["countBenificiarProjectTj" + yearname] = summValcountBenificiarProjectTj;
                    $scope.objResult["countBenificiarProjectUz" + yearname] = summValcountBenificiarProjectUz;
                    $scope.objResult["percentSum" + yearname] = summValpercentSum;
                    $scope.objResult["percentC1" + yearname] = summValpercentC1;
                    $scope.objResult["percentC2" + yearname] = summValpercentC2;
                    $scope.objResult["TjPercentWomen" + yearname] = summValTjPercentWomen;
                    $scope.objResult["UzPercentWomen" + yearname] = summValUzPercentWomen;




                } else {

                    $scope.objResult["sumComponents" + yearname] = $scope.sumComponents;
                    $scope.objResult["countComponent1" + yearname] = $scope.data.countComponent1;
                    $scope.objResult["countComponent2" + yearname] = $scope.data.countComponent2;
                    $scope.objResult["countBenificiarProjectTj" + yearname] = $scope.data.countBenificiarProjectTj;
                    $scope.objResult["countBenificiarProjectUz" + yearname] = $scope.data.countBenificiarProjectUz;
                    $scope.objResult["percentSum" + yearname] = $scope.data.percentSum;
                    $scope.objResult["percentC1" + yearname] = $scope.data.percentC1;
                    $scope.objResult["percentC2" + yearname] = $scope.data.percentC2;
                    $scope.objResult["TjPercentWomen" + yearname] = $scope.data.TjPercentWomen;
                    $scope.objResult["UzPercentWomen" + yearname] = $scope.data.UzPercentWomen;

                }



            }




        });




        $scope.arrAllCountBenificiarProject.push(arrAllData);



    };




    let summValareaGAProject = 0;
    let summValareaGAProjectTj = 0;
    let summValareaGAProjectUz = 0;

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


                  summValareaGAProject += $scope.data.areaGAProject;
                  summValareaGAProjectTj += $scope.data.areaGAProjectTj;
                  summValareaGAProjectUz += $scope.data.areaGAProjectUz;

                  if (yearname === 2021) {

                      $scope.objResult["areaGAProject" + yearname] = summValareaGAProject;
                      $scope.objResult["areaGAProjectTj" + yearname] = summValareaGAProjectTj;
                      $scope.objResult["areaGAProjectUz" + yearname] = summValareaGAProjectUz;

                  } else {

                      $scope.objResult["areaGAProject" + yearname] = $scope.data.areaGAProject;
                      $scope.objResult["areaGAProjectTj" + yearname] = $scope.data.areaGAProjectTj;
                      $scope.objResult["areaGAProjectUz" + yearname] = $scope.data.areaGAProjectUz;

                  }



              }



          });



        $scope.arrAllSumGAProject.push(arrAllData);



    };



    let summValsumgenderevent = 0;

    $scope.generateReportSumGenderEvent = function (yearname) {


        let arrAllData = [];







          GetReportSumGenderEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {





                  $scope.data.sumgenderevent = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].countAll;


                  arrAllData.push({sumgenderevent: $scope.data.sumgenderevent});

              summValsumgenderevent += $scope.data.sumgenderevent;

              if (yearname === 2021) {

                  $scope.objResult["sumgenderevent" + yearname] = summValsumgenderevent;

              } else {

                  $scope.objResult["sumgenderevent" + yearname] = $scope.data.sumgenderevent;

              }




          });






        $scope.arrAllSumGenderEvent.push(arrAllData);



    };


    let summValcountGRM = 0;
    let summValcountGRM_TJ = 0;
    let summValcountGRM_UZ = 0;

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


                 summValcountGRM += $scope.data.countGRM;
                 summValcountGRM_TJ += $scope.data.countGRM_TJ;
                 summValcountGRM_UZ += $scope.data.countGRM_UZ;



                 if (yearname === 2021) {

                     $scope.objResult["countGRM" + yearname] = summValcountGRM;
                     $scope.objResult["countGRM_TJ" + yearname] = summValcountGRM_TJ;
                     $scope.objResult["countGRM_UZ" + yearname] = summValcountGRM_UZ;

                 } else {

                     $scope.objResult["countGRM" + yearname] = $scope.data.countGRM;
                     $scope.objResult["countGRM_TJ" + yearname] = $scope.data.countGRM_TJ;
                     $scope.objResult["countGRM_UZ" + yearname] = $scope.data.countGRM_UZ;

                 }


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




        $scope.data = {...$scope.data, ...$scope.objResult};

        GenerateDocxReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {

            if (entry.code === 0) {

                $window.open('/generatedocx?' + "country=" + $scope.data.country + "&typePeriod=" + $scope.data.typePeriod + "&year=" + $scope.data.year, '_blank');

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


});

